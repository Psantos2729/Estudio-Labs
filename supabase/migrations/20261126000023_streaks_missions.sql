-- Rachas diarias y misiones del día (2026-11-26). Igual que el XP, nada se guarda: todo se calcula del
-- progreso que ya escribe el servidor, así no hay nada que el navegador pueda inflar.
--   Día de estudio: un día (hora de Guatemala) con al menos una lección leída, un ejercicio con todas
--                   las pruebas o un examen/repaso entregado.
--   Racha: días de estudio seguidos. Sigue viva si estudiaste hoy o ayer. Cada 7 días seguidos: +70 XP.
--   Misiones: 3 por día (2 fijas y 1 que rota). Cada misión cumplida ese día da su XP una sola vez.
--   Cosméticos nuevos: regla racha N → la mejor racha llegó a N días.
-- Después de esta migración hay que correr supabase/seed.sql (piezas nuevas del taller).

create or replace function public.gt_day(t timestamptz)
returns date
language sql
stable
as $$ select (t at time zone 'America/Guatemala')::date $$;

create or replace function public.study_days(p_user uuid)
returns setof date
language sql
stable
security definer
set search_path = public
as $$
  select distinct gt_day(t) from (
    select read_at as t from lesson_progress where user_id = p_user
    union all
    select created_at from practice_attempts where user_id = p_user and tests_passed = tests_total
    union all
    select submitted_at from exam_attempts where user_id = p_user and submitted_at is not null
  ) s;
$$;

-- Tramos de días seguidos (huecos e islas: en un tramo, día − número de fila es constante).
create or replace function public.streak_runs(p_user uuid)
returns table (first_day date, last_day date, days int)
language sql
stable
security definer
set search_path = public
as $$
  select min(d), max(d), count(*)::int
  from (select d, d - (row_number() over (order by d))::int as g from study_days(p_user) d) s
  group by g;
$$;

-- Las 3 misiones de un día y cuánto lleva. La tercera rota cada día entre reto, examen y cuatro.
create or replace function public.missions_of(p_user uuid, p_day date)
returns table (id text, label text, goal int, done int, xp int)
language sql
stable
security definer
set search_path = public
as $$
  with solved as (
    select distinct p.exercise_id, c.challenge from practice_attempts p join catalog_items c on c.id = p.exercise_id
    where p.user_id = p_user and p.tests_passed = p.tests_total and gt_day(p.created_at) = p_day
  ), n as (
    select (select count(*)::int from lesson_progress where user_id = p_user and gt_day(read_at) = p_day) as lessons,
           (select count(*)::int from solved) as solved,
           (select count(*)::int from solved where challenge) as challenges,
           (select count(*)::int from exam_attempts where user_id = p_user and passed and gt_day(submitted_at) = p_day) as exams
  )
  select m.id, m.label, m.goal, least(m.done, m.goal), m.xp
  from n, lateral (values
    (1, 'leer', 'Lee una lección', 1, n.lessons, 15),
    (2, 'resolver', 'Resuelve 2 ejercicios', 2, n.solved, 30),
    (3, 'reto', 'Resuelve un ejercicio reto', 1, n.challenges, 40),
    (3, 'examen', 'Aprueba un examen o un repaso', 1, n.exams, 50),
    (3, 'cuatro', 'Resuelve 4 ejercicios', 4, n.solved, 50)
  ) as m(pos, id, label, goal, done, xp)
  where m.pos < 3 or m.id = (array['reto', 'examen', 'cuatro'])[1 + (p_day - date '2026-01-05') % 3]
  order by m.pos;
$$;

revoke execute on function public.study_days, public.streak_runs, public.missions_of from public, anon, authenticated;

-- XP desde p_since: lo de la migración 016 + misiones cumplidas + 70 por cada 7 días de racha.
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
  )::int;
$$;

revoke execute on function public.xp_of from public, anon, authenticated;

-- Racha y misiones de hoy del usuario actual.
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
    'missions', (select jsonb_agg(to_jsonb(m)) from missions_of(auth.uid(), today) m));
end;
$$;

revoke execute on function public.my_quests from public, anon;
grant execute on function public.my_quests to authenticated;

-- Cosméticos por racha: misma función de la 022 + la regla racha.
alter table public.gear_items drop constraint gear_items_rule_check;
alter table public.gear_items add constraint gear_items_rule_check check (rule in (
  'nivel', 'ejercicios', 'repasos', 'modulos', 'islas', 'jefe',
  'lecciones', 'curso', 'xp', 'reintentos', 'perfectos', 'rapidos', 'noche', 'seguidas', 'primero',
  'fallos', 'retos', 'racha'));

create or replace function public.gear_unlocked(p_user uuid)
returns text[]
language sql
stable
security definer
set search_path = public
as $$
  with read as (
    select read_at from lesson_progress l join catalog_items c on c.id = l.lesson_id
    where l.user_id = p_user
  ), exams as (
    select * from exam_attempts where user_id = p_user and kind = 'exam'
  ), s as (
    select xp_of(p_user) as xp,
           (select count(distinct exercise_id) from practice_attempts
            where user_id = p_user and tests_passed = tests_total) as solved,
           (select count(*) from exam_attempts
            where user_id = p_user and kind = 'review' and passed) as reviews,
           array(select distinct module_id from exams where passed) as beaten,
           (select count(*) from read) as lessons,
           (select 100 * count(*) / greatest(1, (select count(*) from catalog_items where tests is null)) from read) as course,
           (select count(*) - count(distinct module_id) from exams) as retries,
           (select count(*) from exams where score = 100) as perfect,
           (select count(*) from exams where passed and submitted_at - started_at < (expires_at - started_at) / 2) as fast,
           (select count(*) from read where extract(hour from read_at at time zone 'America/Guatemala') not between 6 and 19) as night,
           (select coalesce(max((select count(*) from read b where b.read_at >= a.read_at and b.read_at < a.read_at + interval '1 hour')), 0)
            from read a) as streak,
           (select count(*) from exams where not coalesce(passed, expires_at > now())) as failed,
           (select count(distinct p.exercise_id) from practice_attempts p join catalog_items c on c.id = p.exercise_id
            where p.user_id = p_user and c.challenge and p.tests_passed = p.tests_total) as challenges,
           (select coalesce(max(days), 0) from streak_runs(p_user)) as best_run,
           (exists (select 1 from ranking_firsts where user_id = p_user) or is_first_place(p_user)) as first
  )
  select coalesce(array_agg(g.id order by g.position), '{}')
  from gear_items g, s
  where case g.rule
    when 'nivel' then s.xp / 500 + 1 >= g.need::int
    when 'ejercicios' then s.solved >= g.need::int
    when 'repasos' then s.reviews >= g.need::int
    when 'modulos' then cardinality(s.beaten) >= g.need::int
    when 'islas' then cardinality(array(select unnest(s.beaten) intersect select unnest(array['M03', 'M06', 'M09', 'M12'])))
                      >= g.need::int
    when 'jefe' then g.need = any(s.beaten)
    when 'lecciones' then s.lessons >= g.need::int
    when 'curso' then s.course >= g.need::int
    when 'xp' then s.xp >= g.need::int
    when 'reintentos' then s.retries >= g.need::int
    when 'perfectos' then s.perfect >= g.need::int
    when 'rapidos' then s.fast >= g.need::int
    when 'noche' then s.night >= g.need::int
    when 'seguidas' then s.streak >= g.need::int
    when 'primero' then s.first
    when 'fallos' then s.failed >= g.need::int
    when 'retos' then s.challenges >= g.need::int
    when 'racha' then s.best_run >= g.need::int
  end;
$$;

revoke execute on function public.gear_unlocked from public, anon, authenticated;
