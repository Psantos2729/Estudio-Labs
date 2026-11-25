-- Pruebas de las piezas nuevas del taller (migración 018).
\set ON_ERROR_STOP on
insert into auth.users (id, raw_user_meta_data) values
  ('00000000-0000-0000-0000-00000000a801', '{"full_name": "Cata"}');
-- Cata dominó 6 módulos (incluye los jefes de isla M03 y M06) y aprobó 3 repasos.
insert into public.exam_attempts (user_id, module_id, item_ids, expires_at, submitted_at, score, passed, kind)
select '00000000-0000-0000-0000-00000000a801'::uuid, m, '{}'::bigint[], now(), now(), 90, true, 'exam'
from unnest(array['M00', 'M01', 'M02', 'M03', 'M04', 'M06']) m
union all
select '00000000-0000-0000-0000-00000000a801'::uuid, 'M00', '{}', now(), now(), 90, true, 'review'
from generate_series(1, 3);

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000a801';
do $$
declare u text[];
begin
  u := (select unlocked from public.my_gear());
  assert u @> array['casco_cuero', 'peto_cuero', 'casco_malla', 'peto_malla', 'casco_hierro', 'peto_hierro'],
    'armaduras hasta hierro con 6 módulos: ' || u::text;
  assert not u && array['casco_oro', 'peto_oro', 'espada_maestra', 'espada_diamante', 'fernan'], 'nada de más: ' || u::text;
  assert u @> array['escudo', 'mascara'], 'escudo por 2 jefes de isla y máscara por 3 repasos: ' || u::text;

  perform public.set_avatar_gear('{"cabeza": "casco_malla", "cuerpo": "peto_hierro", "brazo": "escudo", "cara": "mascara"}');
  assert (select gear->>'brazo' from public.my_gear()) = 'escudo', 'lleva el escudo en el brazo';

  begin
    perform public.set_avatar_gear('{"cuerpo": "peto_oro"}');
    raise exception 'FALLO: se puso una armadura no ganada';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.set_avatar_gear('{"mano": "escudo"}');
    raise exception 'FALLO: puso el escudo en la mano';
  exception when invalid_parameter_value then null;
  end;
end $$;
reset request.jwt.claim.sub;
reset role;
select 'OK: pruebas de las piezas nuevas pasaron' as resultado;
