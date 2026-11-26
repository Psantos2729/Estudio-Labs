-- Misiones semanales y nivel real en el ranking semanal (2026-11-26).
--   Semana: de lunes a domingo, hora de Guatemala. 3 misiones fijas; cada una da su XP una vez por semana:
--     Estudia 5 días (+80) · Resuelve 10 ejercicios distintos (+100) · Aprueba 2 exámenes o repasos (+120).
--   Igual que lo demás, se calcula del progreso: no se guarda nada.
--   El ranking devuelve también total_xp, para que el nivel de la pestaña semanal sea el de siempre.

create or replace function public.weekly_missions_of(p_user uuid, p_week date)
returns table (id text, label text, goal int, done int, xp int)
language sql
stable
security definer
set search_path = public
as $$
  with n as (
    select (select count(*)::int from study_days(p_user) d where d between p_week and p_week + 6) as days,
           (select count(distinct exercise_id)::int from practice_attempts
            where user_id = p_user and tests_passed = tests_total and gt_day(created_at) between p_week and p_week + 6) as solved,
           (select count(*)::int from exam_attempts
            where user_id = p_user and passed and gt_day(submitted_at) between p_week and p_week + 6) as exams
  )
  select m.id, m.label, m.goal, least(m.done, m.goal), m.xp
  from n, lateral (values
    (1, 'dias', 'Estudia 5 días esta semana', 5, n.days, 80),
    (2, 'diez', 'Resuelve 10 ejercicios', 10, n.solved, 100),
    (3, 'aprueba', 'Aprueba 2 exámenes o repasos', 2, n.exams, 120)
  ) as m(pos, id, label, goal, done, xp)
  order by m.pos;
$$;

revoke execute on function public.weekly_missions_of from public, anon, authenticated;

-- XP desde p_since: lo de la 023 + misiones semanales cumplidas (cuentan en la semana en que se cumplen).
create or replace function public.xp_of(p_user uuid, p_since timestamptz default '-infinity')
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select (
      10 * (select count(*) from lesson_progress where user_id = p_user and read_at >= p_since)
    + 25 * (select count(*) from (
              select min(created_at) as t from practice_attempts
              where user_id = p_user and tests_passed = tests_total group by exercise_id) s
            where t >= p_since)
    + 200 * (select count(*) from (
              select min(submitted_at) as t from exam_attempts
              where user_id = p_user and kind = 'exam' and passed group by module_id) s
            where t >= p_since)
    + 100 * (select count(*) from exam_attempts
             where user_id = p_user and kind = 'review' and passed and submitted_at >= p_since)
    + (select coalesce(sum(m.xp), 0) from study_days(p_user) d, missions_of(p_user, d) m
       where m.done >= m.goal and d >= gt_day(p_since))
    + 70 * (select count(*) from streak_runs(p_user) r, generate_series(1, r.days / 7) k
            where r.first_day + 7 * k - 1 >= gt_day(p_since))
    + (select coalesce(sum(m.xp), 0)
       from (select distinct date_trunc('week', d)::date as w from study_days(p_user) d) wk,
            weekly_missions_of(p_user, wk.w) m
       where m.done >= m.goal and wk.w >= gt_day(p_since))
  )::int;
$$;

revoke execute on function public.xp_of from public, anon, authenticated;

-- Racha, misiones de hoy y de esta semana.
create or replace function public.my_quests()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  today date := gt_day(now());
begin
  if auth.uid() is null then
    raise exception 'Necesitas iniciar sesión para ver tus misiones' using errcode = '42501';
  end if;
  return jsonb_build_object(
    'streak', coalesce((select days from streak_runs(auth.uid()) where last_day >= today - 1), 0),
    'best', coalesce((select max(days) from streak_runs(auth.uid())), 0),
    'today', exists (select 1 from study_days(auth.uid()) d where d = today),
    'missions', (select jsonb_agg(to_jsonb(m)) from missions_of(auth.uid(), today) m),
    'weekly', (select jsonb_agg(to_jsonb(m)) from weekly_missions_of(auth.uid(), date_trunc('week', today)::date) m));
end;
$$;

revoke execute on function public.my_quests from public, anon;
grant execute on function public.my_quests to authenticated;

drop function public.leaderboard(text);
create function public.leaderboard(p_period text default 'all')
returns table (rank bigint, handle text, name text, color text, gear jsonb, xp integer, total_xp integer,
               mastered integer, station text, is_me boolean)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Necesitas iniciar sesión para ver el ranking' using errcode = '42501';
  end if;
  if p_period not in ('week', 'all') then
    raise exception 'Periodo inválido: %', p_period using errcode = '22023';
  end if;
  return query
  with scored as (
    select p.id,
           coalesce(nullif(btrim(p.display_name), ''), 'Estudiante') as name,
           p.avatar_color as color,
           p.avatar_gear as gear,
           xp_of(p.id) as total,
           (select count(*)::int from module_mastery mm where mm.user_id = p.id and mm.status = 'mastered') as mastered,
           station_of(p.id) as station
    from profiles p
  ), periodic as (
    -- shortcut: en la semana calcula el XP dos veces por cuenta; con miles de cuentas, guardarlo en una tabla.
    select s.*, case when p_period = 'week'
                     then xp_of(s.id, date_trunc('week', now() at time zone 'America/Guatemala') at time zone 'America/Guatemala')
                     else s.total end as xp
    from scored s
  ), ranked as (
    select s.*, rank() over (order by s.xp desc) as r, row_number() over (order by s.xp desc, s.id) as n
    from periodic s
  )
  select r.r, profile_handle(r.id), r.name, r.color, r.gear, r.xp, r.total, r.mastered, r.station, r.id = auth.uid()
  from ranked r
  where (r.n <= 10 and r.xp > 0) or r.id = auth.uid()
  order by r.n;
end;
$$;

revoke execute on function public.leaderboard from public, anon;
grant execute on function public.leaderboard to authenticated;
