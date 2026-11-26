-- Pruebas de los cosméticos por logros (migración 021).
\set ON_ERROR_STOP on
insert into auth.users (id, raw_user_meta_data) values
  ('00000000-0000-0000-0000-00000000b101', '{"full_name": "Lu"}'),
  ('00000000-0000-0000-0000-00000000b102', '{"full_name": "Mo"}');

-- Lu: 3 lecciones en 40 min, una a las 23:00 de Guatemala (05:00 UTC); M00 con 100 en 10 de 45 min,
-- M01 reprobado y vuelto a presentar. Mo: nada todavía.
insert into public.lesson_progress (user_id, lesson_id, read_at) values
  ('00000000-0000-0000-0000-00000000b101', 'M00-L01', '2026-11-26 05:00+00'),
  ('00000000-0000-0000-0000-00000000b101', 'M00-L02', '2026-11-26 05:20+00'),
  ('00000000-0000-0000-0000-00000000b101', 'M00-L03', '2026-11-26 05:40+00');
insert into public.exam_attempts (user_id, module_id, item_ids, started_at, expires_at, submitted_at, score, passed, kind) values
  ('00000000-0000-0000-0000-00000000b101', 'M00', '{}', now() - interval '10 minutes', now() + interval '35 minutes', now(), 100, true, 'exam'),
  ('00000000-0000-0000-0000-00000000b101', 'M01', '{}', now() - interval '3 hours', now() - interval '135 minutes', now() - interval '140 minutes', 50, false, 'exam'),
  ('00000000-0000-0000-0000-00000000b101', 'M01', '{}', now() - interval '40 minutes', now() + interval '5 minutes', now(), 90, true, 'exam');

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000b101';
do $$
declare u text[];
begin
  u := (select unlocked from public.my_gear());
  assert u @> array['pokeball', 'examen_nacho', 'mini', 'escudo_grande', 'karambit', 'batman', 'regla_vladi', 'bebida', 'lentes_edwin'],
    'logros de Lu: ' || u::text;
  assert not u && array['masterball', 'snorlax', 'jordan', 'master_chief', 'capi', 'rubius_cabeza'], 'nada de más: ' || u::text;
  perform public.set_avatar_gear('{"mano": "karambit", "cara": "lentes_edwin"}');
end $$;

-- Mo pasa a Lu: Lu se queda con los lentes (primer lugar guardado), Mo los gana al abrir el taller.
reset role;
insert into public.lesson_progress (user_id, lesson_id, read_at)
select '00000000-0000-0000-0000-00000000b102', id, '2026-11-26 15:00+00'::timestamptz + row_number() over () * interval '1 day'
from public.catalog_items where tests is null;
set role authenticated;
do $$ begin
  assert (select unlocked from public.my_gear()) @> array['lentes_edwin'], 'Lu conserva los lentes de Edwin';
end $$;
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000b102';
do $$
declare u text[];
begin
  u := (select unlocked from public.my_gear());
  assert u @> array['masterball', 'snorlax', 'lentes_edwin', 'rubius_pantalon'], 'Mo leyó todo: ' || u::text;
  assert not u && array['batman', 'bebida', 'mini'], 'de día y una lección cada vez no cuenta: ' || u::text;
  begin
    insert into public.ranking_firsts (user_id) values ('00000000-0000-0000-0000-00000000b102');
    raise exception 'FALLO: el navegador escribió el primer lugar';
  exception when insufficient_privilege then null;
  end;
end $$;
reset request.jwt.claim.sub;
reset role;
select 'OK: pruebas de los cosméticos por logros pasaron' as resultado;
