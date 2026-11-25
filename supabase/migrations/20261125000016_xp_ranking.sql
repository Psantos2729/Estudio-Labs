-- Gamificación (Ruta de expedición): XP, color del personaje y ranking.
-- El XP NO se guarda: se calcula del progreso que ya escribe el servidor, así nadie puede
-- inflarlo y repetir algo no suma de nuevo. Solo cuenta la primera vez de cada logro:
--   lección leída 10 · ejercicio con todas las pruebas 25 · examen de dominio aprobado 200
--   · repaso aprobado 100.
-- El ranking muestra el nombre de la cuenta (display_name, que trae el nombre de Google);
-- nunca correos ni ids.

-- Color del robot. El dueño lo cambia igual que su nombre.
alter table public.profiles
  add column avatar_color text not null default '#19d3ff' check (avatar_color ~ '^#[0-9a-f]{6}$');
grant update (display_name, avatar_color) on public.profiles to authenticated;

-- XP de un usuario ganado desde p_since (para el ranking semanal) o desde siempre.
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
  )::int;
$$;

revoke execute on function public.xp_of from public, anon, authenticated;

-- Top 10 del periodo ('week' o 'all') y, aunque no esté en el top, la fila del usuario actual.
-- station: módulo donde va cada quien (primero abierto sin dominar), para dibujarlo en el mapa.
-- shortcut: calcula el XP de todos en cada llamada; si hay miles de cuentas, guardarlo en una tabla.
create or replace function public.leaderboard(p_period text default 'all')
returns table (rank bigint, name text, color text, xp integer, mastered integer, station text, is_me boolean)
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
  select r.r, r.name, r.color, r.xp, r.mastered, r.station, r.id = auth.uid()
  from ranked r
  where (r.n <= 10 and r.xp > 0) or r.id = auth.uid()
  order by r.n;
end;
$$;

revoke execute on function public.leaderboard from public, anon;
grant execute on function public.leaderboard to authenticated;
