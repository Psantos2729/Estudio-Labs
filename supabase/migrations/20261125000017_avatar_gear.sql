-- Taller del robot: piezas para vestir al personaje.
-- Lo ganado NO se guarda: se calcula del progreso (como el XP de la 016). Solo se guarda lo que
-- cada quien lleva puesto, y únicamente por set_avatar_gear, que revisa que la pieza esté ganada.
--   jefe de isla (examen de dominio aprobado de M03, M06, M09, M12): 2 piezas de su isla
--   nivel 2 visor · nivel 4 audífonos · nivel 8 corona · 25 ejercicios resueltos llave

alter table public.profiles add column avatar_gear jsonb not null default '{}'::jsonb;

-- Catálogo: pieza → espacio del robot.
create or replace function public.gear_slot(p_item text)
returns text
language sql
immutable
as $$
  select case
    when p_item in ('hoja', 'marinero', 'audifonos', 'corona') then 'cabeza'
    when p_item in ('visor', 'lentes', 'gafas') then 'cara'
    when p_item in ('bufanda', 'capa') then 'cuerpo'
    when p_item in ('rama', 'pergamino', 'llave') then 'mano'
  end;
$$;

-- Piezas ganadas por un usuario.
create or replace function public.gear_unlocked(p_user uuid)
returns text[]
language sql
stable
security definer
set search_path = public
as $$
  with s as (
    select xp_of(p_user) / 500 + 1 as lvl,
           (select count(distinct exercise_id) from practice_attempts
            where user_id = p_user and tests_passed = tests_total) as solved,
           array(select distinct module_id from exam_attempts
                 where user_id = p_user and kind = 'exam' and passed) as beaten
  )
  select array_remove(array[
    case when 'M03' = any(beaten) then 'hoja' end,
    case when 'M03' = any(beaten) then 'rama' end,
    case when 'M06' = any(beaten) then 'marinero' end,
    case when 'M06' = any(beaten) then 'bufanda' end,
    case when 'M09' = any(beaten) then 'lentes' end,
    case when 'M09' = any(beaten) then 'pergamino' end,
    case when 'M12' = any(beaten) then 'gafas' end,
    case when 'M12' = any(beaten) then 'capa' end,
    case when lvl >= 2 then 'visor' end,
    case when lvl >= 4 then 'audifonos' end,
    case when lvl >= 8 then 'corona' end,
    case when solved >= 25 then 'llave' end
  ], null)
  from s;
$$;

revoke execute on function public.gear_unlocked from public, anon, authenticated;

-- Lo que el usuario actual tiene ganado y puesto.
create or replace function public.my_gear()
returns table (unlocked text[], gear jsonb)
language sql
stable
security definer
set search_path = public
as $$
  select gear_unlocked(auth.uid()), p.avatar_gear from profiles p where p.id = auth.uid();
$$;

revoke execute on function public.my_gear from public, anon;
grant execute on function public.my_gear to authenticated;

-- Viste al robot. p_gear: {"cabeza": "hoja", "mano": "llave", ...}; un espacio ausente queda vacío.
create or replace function public.set_avatar_gear(p_gear jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  k text;
  v text;
  owned text[];
begin
  if auth.uid() is null then
    raise exception 'Necesitas iniciar sesión' using errcode = '42501';
  end if;
  if jsonb_typeof(p_gear) <> 'object' then
    raise exception 'Formato inválido' using errcode = '22023';
  end if;
  owned := gear_unlocked(auth.uid());
  for k, v in select key, value from jsonb_each_text(p_gear) loop
    if gear_slot(v) is distinct from k then
      raise exception 'La pieza % no va en %', v, k using errcode = '22023';
    end if;
    if not v = any(owned) then
      raise exception 'Todavía no ganas la pieza %', v using errcode = '42501';
    end if;
  end loop;
  update profiles set avatar_gear = p_gear where id = auth.uid();
end;
$$;

revoke execute on function public.set_avatar_gear from public, anon;
grant execute on function public.set_avatar_gear to authenticated;

-- El ranking ahora devuelve lo que lleva puesto cada robot (cambia el tipo: hay que recrearla).
drop function public.leaderboard(text);
create function public.leaderboard(p_period text default 'all')
returns table (rank bigint, name text, color text, gear jsonb, xp integer, mastered integer, station text, is_me boolean)
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
           xp_of(p.id, case when p_period = 'week' then date_trunc('week', now()) else '-infinity' end) as xp,
           (select count(*)::int from module_mastery mm where mm.user_id = p.id and mm.status = 'mastered') as mastered,
           coalesce(
             (select mm.module_id from module_mastery mm
              where mm.user_id = p.id and mm.status not in ('locked', 'mastered') order by mm.module_id limit 1),
             (select max(mm.module_id) from module_mastery mm where mm.user_id = p.id and mm.status = 'mastered'),
             'M00') as station
    from profiles p
  ), ranked as (
    select s.*, rank() over (order by s.xp desc) as r, row_number() over (order by s.xp desc, s.id) as n
    from scored s
  )
  select r.r, r.name, r.color, r.gear, r.xp, r.mastered, r.station, r.id = auth.uid()
  from ranked r
  where (r.n <= 10 and r.xp > 0) or r.id = auth.uid()
  order by r.n;
end;
$$;

revoke execute on function public.leaderboard from public, anon;
grant execute on function public.leaderboard to authenticated;
