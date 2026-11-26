-- Avance de cada medalla (2026-11-26). Las cuentas de gear_unlocked (022/023) pasan a gear_stats, que
-- devuelve un número por regla (más beaten y primero), y my_gear manda esas cuentas para dibujar barras.
-- gear_unlocked queda igual por fuera: una pieza se gana cuando su número llega a need.

create or replace function public.gear_stats(p_user uuid)
returns jsonb
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
           array(select distinct module_id from exams where passed) as beaten
  )
  select jsonb_build_object(
    'xp', s.xp,
    'nivel', s.xp / 500 + 1,
    'ejercicios', (select count(distinct exercise_id) from practice_attempts
                   where user_id = p_user and tests_passed = tests_total),
    'repasos', (select count(*) from exam_attempts where user_id = p_user and kind = 'review' and passed),
    'modulos', cardinality(s.beaten),
    'islas', cardinality(array(select unnest(s.beaten) intersect select unnest(array['M03', 'M06', 'M09', 'M12']))),
    'beaten', to_jsonb(s.beaten),
    'lecciones', (select count(*) from read),
    'curso', (select 100 * count(*) / greatest(1, (select count(*) from catalog_items where tests is null)) from read),
    'reintentos', (select count(*) - count(distinct module_id) from exams),
    'perfectos', (select count(*) from exams where score = 100),
    'rapidos', (select count(*) from exams where passed and submitted_at - started_at < (expires_at - started_at) / 2),
    'noche', (select count(*) from read
              where extract(hour from read_at at time zone 'America/Guatemala') not between 6 and 19),
    'seguidas', (select coalesce(max((select count(*) from read b
                                      where b.read_at >= a.read_at and b.read_at < a.read_at + interval '1 hour')), 0)
                 from read a),
    'fallos', (select count(*) from exams where not coalesce(passed, expires_at > now())),
    'retos', (select count(distinct p.exercise_id) from practice_attempts p join catalog_items c on c.id = p.exercise_id
              where p.user_id = p_user and c.challenge and p.tests_passed = p.tests_total),
    'racha', (select coalesce(max(days), 0) from streak_runs(p_user)),
    'primero', exists (select 1 from ranking_firsts where user_id = p_user) or is_first_place(p_user))
  from s;
$$;

revoke execute on function public.gear_stats from public, anon, authenticated;

create or replace function public.gear_unlocked(p_user uuid)
returns text[]
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(array_agg(g.id order by g.position), '{}')
  from gear_items g, gear_stats(p_user) st
  where case g.rule
    when 'jefe' then st -> 'beaten' ? g.need
    when 'primero' then (st ->> 'primero')::boolean
    else coalesce((st ->> g.rule)::int, 0) >= g.need::int
  end;
$$;

revoke execute on function public.gear_unlocked from public, anon, authenticated;

-- Lo ganado, lo puesto y las cuentas de cada regla. Si hoy va primero en el ranking, lo deja guardado.
drop function public.my_gear();
create function public.my_gear()
returns table (unlocked text[], gear jsonb, stats jsonb)
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null and is_first_place(auth.uid()) then
    insert into ranking_firsts (user_id) values (auth.uid()) on conflict do nothing;
  end if;
  return query
  select gear_unlocked(auth.uid()), p.avatar_gear, gear_stats(auth.uid()) - 'beaten'
  from profiles p where p.id = auth.uid();
end;
$$;

revoke execute on function public.my_gear from public, anon;
grant execute on function public.my_gear to authenticated;
