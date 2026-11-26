-- Cosméticos por logros (2026-11-26). Reglas nuevas para gear_items, todas calculadas en el servidor:
--   lecciones N  → N lecciones leídas            curso N    → N % de las lecciones del curso leídas
--   xp N         → N XP o más                    reintentos N → N exámenes de dominio vueltos a presentar
--   perfectos N  → N exámenes de dominio con 100  rapidos N  → N exámenes aprobados en menos de la mitad del tiempo
--   noche N      → N lecciones leídas entre 20:00 y 5:59 (hora de Guatemala)
--   seguidas N   → N lecciones leídas en menos de una hora
--   primero 1    → primer lugar del ranking de siempre. Se guarda en ranking_firsts al abrir el taller,
--                  así la pieza se queda aunque después te pasen.

alter table public.gear_items drop constraint gear_items_rule_check;
alter table public.gear_items add constraint gear_items_rule_check check (rule in (
  'nivel', 'ejercicios', 'repasos', 'modulos', 'islas', 'jefe',
  'lecciones', 'curso', 'xp', 'reintentos', 'perfectos', 'rapidos', 'noche', 'seguidas', 'primero'));

-- Quién ha llegado al primer lugar. Solo la escriben y leen funciones del servidor.
create table public.ranking_firsts (
  user_id uuid primary key references auth.users (id) on delete cascade,
  at      timestamptz not null default now()
);
alter table public.ranking_firsts enable row level security;

-- ¿Es hoy el primer lugar del ranking de siempre? (con XP; los empates cuentan como primer lugar)
create or replace function public.is_first_place(p_user uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select xp_of(p_user) > 0 and not exists (select 1 from profiles p where xp_of(p.id) > xp_of(p_user));
$$;

revoke execute on function public.is_first_place from public, anon, authenticated;

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
  end;
$$;

revoke execute on function public.gear_unlocked from public, anon, authenticated;

-- Lo que el usuario actual tiene ganado y puesto. Si hoy va primero en el ranking, lo deja guardado.
drop function public.my_gear();
create function public.my_gear()
returns table (unlocked text[], gear jsonb)
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null and is_first_place(auth.uid()) then
    insert into ranking_firsts (user_id) values (auth.uid()) on conflict do nothing;
  end if;
  return query select gear_unlocked(auth.uid()), p.avatar_gear from profiles p where p.id = auth.uid();
end;
$$;

revoke execute on function public.my_gear from public, anon;
grant execute on function public.my_gear to authenticated;
