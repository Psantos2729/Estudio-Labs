-- Más piezas para el taller: armaduras por material, espadas, escudo, máscara y cascos.
-- Nuevo espacio "brazo" para el escudo (la espada va en "mano"). Igual que la 017: lo ganado se calcula.
--   armaduras (casco + peto): cuero 1 · malla 3 · hierro 5 · oro 7 · diamante 10 · amatista 13 módulos dominados
--   nivel 3 lentes de crack · nivel 6 casco estelar · 3 repasos aprobados máscara
--   50 ejercicios gorro de Fernan · 100 ejercicios espada de diamante
--   2 jefes de isla escudo · 4 jefes de isla espada maestra

create or replace function public.gear_slot(p_item text)
returns text
language sql
immutable
as $$
  select case
    when p_item in ('hoja', 'marinero', 'audifonos', 'corona', 'estelar', 'fernan') or p_item like 'casco\_%' then 'cabeza'
    when p_item in ('visor', 'lentes', 'gafas', 'crack', 'mascara') then 'cara'
    when p_item in ('bufanda', 'capa') or p_item like 'peto\_%' then 'cuerpo'
    when p_item in ('rama', 'pergamino', 'llave', 'espada_diamante', 'espada_maestra') then 'mano'
    when p_item = 'escudo' then 'brazo'
  end;
$$;

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
           (select count(*) from exam_attempts
            where user_id = p_user and kind = 'review' and passed) as reviews,
           array(select distinct module_id from exam_attempts
                 where user_id = p_user and kind = 'exam' and passed) as beaten
  ), i as (
    select s.*, cardinality(array(select unnest(beaten) intersect select unnest(array['M03', 'M06', 'M09', 'M12'])))
             as islands
    from s
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
    case when lvl >= 3 then 'crack' end,
    case when lvl >= 4 then 'audifonos' end,
    case when lvl >= 6 then 'estelar' end,
    case when lvl >= 8 then 'corona' end,
    case when solved >= 25 then 'llave' end,
    case when solved >= 50 then 'fernan' end,
    case when solved >= 100 then 'espada_diamante' end,
    case when reviews >= 3 then 'mascara' end,
    case when islands >= 2 then 'escudo' end,
    case when islands >= 4 then 'espada_maestra' end
  ], null)
  || array(select p || m.name from (values ('casco_'), ('peto_')) x(p),
           (values ('cuero', 1), ('malla', 3), ('hierro', 5), ('oro', 7), ('diamante', 10), ('amatista', 13)) m(name, need)
           where cardinality(beaten) >= m.need order by m.need, p)
  from i;
$$;

revoke execute on function public.gear_unlocked from public, anon, authenticated;
