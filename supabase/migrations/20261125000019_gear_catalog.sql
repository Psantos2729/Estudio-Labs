-- Catálogo de cosméticos en una tabla, para agregar piezas sin escribir migraciones.
-- Las filas salen de content/cosmeticos.json vía `npm run seed` (supabase/seed.sql).
-- Reglas: nivel, ejercicios, repasos, modulos (dominados), islas (jefes de isla vencidos) → número;
--         jefe → id del módulo cuyo examen hay que aprobar.

create table public.gear_items (
  id       text primary key,
  slot     text not null,
  rule     text not null check (rule in ('nivel', 'ejercicios', 'repasos', 'modulos', 'islas', 'jefe')),
  need     text not null check (case when rule = 'jefe' then need ~ '^M\d\d$' else need ~ '^[1-9]\d*$' end),
  position integer not null
);

-- Solo la leen funciones del servidor; el navegador usa content/cosmeticos.json.
alter table public.gear_items enable row level security;

create or replace function public.gear_slot(p_item text)
returns text
language sql
stable
set search_path = public
as $$
  select slot from gear_items where id = p_item;
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
  )
  select coalesce(array_agg(g.id order by g.position), '{}')
  from gear_items g, s
  where case g.rule
    when 'nivel' then s.lvl >= g.need::int
    when 'ejercicios' then s.solved >= g.need::int
    when 'repasos' then s.reviews >= g.need::int
    when 'modulos' then cardinality(s.beaten) >= g.need::int
    when 'islas' then cardinality(array(select unnest(s.beaten) intersect select unnest(array['M03', 'M06', 'M09', 'M12'])))
                      >= g.need::int
    when 'jefe' then g.need = any(s.beaten)
  end;
$$;

revoke execute on function public.gear_unlocked from public, anon, authenticated;
