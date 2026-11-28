-- Zona de práctica general (/practica): problemas sueltos P01, P02… de nivel medio a muy difícil.
-- Se guardan como cualquier práctica (practice_attempts por record_practice) y se abren al vencer
-- al jefe del sector 1 (examen de M03), o sea cuando M04 ya no está bloqueado.
-- XP la primera vez que pasan todas sus pruebas: catalog_items.xp (25 en ejercicios de módulo,
-- según el nivel en los problemas). Después de esta migración hay que correr supabase/seed.sql.

alter table public.practice_attempts
  drop constraint practice_attempts_exercise_id_check,
  add constraint practice_attempts_exercise_id_check check (exercise_id ~ '^(M\d{2}-E\d{2}|P\d{2})$');

alter table public.catalog_items
  drop constraint catalog_items_id_check,
  drop constraint catalog_items_check,
  add constraint catalog_items_id_check check (id ~ '^(M\d{2}-[EL]\d{2}|P\d{2})$'),
  add constraint catalog_items_check check ((id ~ '-L') = (tests is null)),
  add column xp smallint not null default 25 check (xp between 0 and 200);

create or replace function public.record_practice(
  p_exercise_id text, p_code text, p_notes jsonb, p_tests_passed int, p_tests_total int
) returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id bigint;
begin
  if auth.uid() is null then
    raise exception 'Necesitas iniciar sesión para guardar tu práctica' using errcode = '42501';
  end if;
  -- Un problema de la zona de práctica se abre junto con M04; un ejercicio, con su módulo.
  if not exists (
    select 1 from module_mastery
    where user_id = auth.uid() and status <> 'locked'
      and module_id = case when p_exercise_id ~ '^P' then 'M04' else left(p_exercise_id, 3) end
  ) then
    raise exception 'El módulo de % está bloqueado', p_exercise_id using errcode = '42501';
  end if;
  if not exists (select 1 from catalog_items where id = p_exercise_id and tests = p_tests_total) then
    raise exception 'El ejercicio % no existe o no tiene % pruebas', p_exercise_id, p_tests_total
      using errcode = '22023';
  end if;
  insert into practice_attempts (user_id, exercise_id, code, notes, tests_passed, tests_total)
  values (auth.uid(), p_exercise_id, p_code, coalesce(p_notes, '{}'), p_tests_passed, p_tests_total)
  returning id into new_id;
  return new_id;
end;
$$;

-- XP: igual que la 025, pero cada ejercicio o problema resuelto vale su catalog_items.xp.
create or replace function public.xp_of(p_user uuid, p_since timestamptz default '-infinity')
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select (
      10 * (select count(*) from lesson_progress where user_id = p_user and read_at >= p_since)
    + (select coalesce(sum(coalesce(c.xp, 25)), 0) from (
              select exercise_id, min(created_at) as t from practice_attempts
              where user_id = p_user and tests_passed = tests_total group by exercise_id) s
            left join catalog_items c on c.id = s.exercise_id
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
