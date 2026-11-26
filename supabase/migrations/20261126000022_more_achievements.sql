-- Más cosméticos por logros (2026-11-26) y el espacio "mascota" (solo contenido, sin cambios aquí).
--   fallos N → N exámenes de dominio reprobados (un intento vencido sin enviar también cuenta)
--   retos N  → N ejercicios reto (challenge: true en content/) resueltos con todas las pruebas
-- Después de esta migración hay que correr supabase/seed.sql: llena catalog_items.challenge.

alter table public.catalog_items add column challenge boolean not null default false;

alter table public.gear_items drop constraint gear_items_rule_check;
alter table public.gear_items add constraint gear_items_rule_check check (rule in (
  'nivel', 'ejercicios', 'repasos', 'modulos', 'islas', 'jefe',
  'lecciones', 'curso', 'xp', 'reintentos', 'perfectos', 'rapidos', 'noche', 'seguidas', 'primero',
  'fallos', 'retos'));

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
  end;
$$;

revoke execute on function public.gear_unlocked from public, anon, authenticated;
