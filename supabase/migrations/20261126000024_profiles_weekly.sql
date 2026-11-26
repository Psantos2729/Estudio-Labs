-- Ranking semanal en hora de Guatemala y perfil público (2026-11-26).
-- 1) La semana del ranking empieza el lunes 00:00 de Guatemala (antes era el lunes en UTC, el domingo a las 18:00).
-- 2) El ranking devuelve un handle por fila para abrir el perfil público. No es el id: es un resumen
--    (md5) que no deja llegar al id ni al correo.
-- 3) public_profile(handle): robot, nivel, módulos, racha y logros de alguien. Solo para cuentas con sesión.

create or replace function public.profile_handle(p_user uuid)
returns text
language sql
immutable
as $$ select left(md5('pylab-perfil:' || p_user::text), 12) $$;

drop function public.leaderboard(text);
create function public.leaderboard(p_period text default 'all')
returns table (rank bigint, handle text, name text, color text, gear jsonb, xp integer, mastered integer, station text, is_me boolean)
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
           xp_of(p.id, case when p_period = 'week'
                            then date_trunc('week', now() at time zone 'America/Guatemala') at time zone 'America/Guatemala'
                            else '-infinity' end) as xp,
           (select count(*)::int from module_mastery mm where mm.user_id = p.id and mm.status = 'mastered') as mastered,
           station_of(p.id) as station
    from profiles p
  ), ranked as (
    select s.*, rank() over (order by s.xp desc) as r, row_number() over (order by s.xp desc, s.id) as n
    from scored s
  )
  select r.r, profile_handle(r.id), r.name, r.color, r.gear, r.xp, r.mastered, r.station, r.id = auth.uid()
  from ranked r
  where (r.n <= 10 and r.xp > 0) or r.id = auth.uid()
  order by r.n;
end;
$$;

-- Módulo donde va alguien: el primero abierto sin dominar, si no el último dominado (igual que en la 017).
create or replace function public.station_of(p_user uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select module_id from module_mastery
     where user_id = p_user and status not in ('locked', 'mastered') order by module_id limit 1),
    (select max(module_id) from module_mastery where user_id = p_user and status = 'mastered'),
    'M00');
$$;

revoke execute on function public.station_of from public, anon, authenticated;
revoke execute on function public.leaderboard from public, anon;
grant execute on function public.leaderboard to authenticated;

create or replace function public.public_profile(p_handle text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  u uuid;
  today date := gt_day(now());
begin
  if auth.uid() is null then
    raise exception 'Necesitas iniciar sesión para ver perfiles' using errcode = '42501';
  end if;
  select p.id into u from profiles p where profile_handle(p.id) = p_handle;
  if u is null then
    raise exception 'Ese perfil no existe' using errcode = 'P0002';
  end if;
  return (
    select jsonb_build_object(
      'name', coalesce(nullif(btrim(p.display_name), ''), 'Estudiante'),
      'color', p.avatar_color,
      'gear', p.avatar_gear,
      'xp', xp_of(u),
      'mastered', (select count(*) from module_mastery where user_id = u and status = 'mastered'),
      'station', station_of(u),
      'streak', coalesce((select days from streak_runs(u) where last_day >= today - 1), 0),
      'best', coalesce((select max(days) from streak_runs(u)), 0),
      'unlocked', to_jsonb(gear_unlocked(u)),
      'is_me', u = auth.uid())
    from profiles p where p.id = u);
end;
$$;

revoke execute on function public.public_profile from public, anon;
grant execute on function public.public_profile to authenticated;
