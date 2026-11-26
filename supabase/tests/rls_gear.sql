-- Pruebas del taller del robot (migración 017).
\set ON_ERROR_STOP on
insert into auth.users (id, raw_user_meta_data) values
  ('00000000-0000-0000-0000-00000000a701', '{"full_name": "Beto"}');
-- Beto venció al jefe de la isla 1 (examen de dominio de M03).
insert into public.exam_attempts (user_id, module_id, item_ids, expires_at, submitted_at, score, passed)
values ('00000000-0000-0000-0000-00000000a701', 'M03', '{}', now(), now(), 90, true);

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000a701';
do $$
declare r record;
begin
  select * into r from public.my_gear();
  assert r.unlocked @> array['hoja', 'rama', 'casco_cuero', 'peto_cuero'] and not r.unlocked && array['visor', 'corona', 'llave'], 'gana las piezas del bosque y la armadura de cuero (nivel 1): ' || r.unlocked::text;
  assert r.gear = '{}'::jsonb, 'empieza sin nada puesto';

  perform public.set_avatar_gear('{"cabeza": "hoja", "mano": "rama"}');
  assert (select gear from public.my_gear()) = '{"cabeza": "hoja", "mano": "rama"}', 'se viste';
  assert (select gear->>'cabeza' from public.leaderboard('all') where is_me) = 'hoja', 'el ranking muestra lo puesto';

  begin
    perform public.set_avatar_gear('{"cabeza": "corona"}');
    raise exception 'FALLO: se puso una pieza no ganada';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.set_avatar_gear('{"cara": "hoja"}');
    raise exception 'FALLO: puso una pieza en el espacio equivocado';
  exception when invalid_parameter_value then null;
  end;
  begin
    perform public.set_avatar_gear('{"cola": "hoja"}');
    raise exception 'FALLO: aceptó un espacio que no existe';
  exception when invalid_parameter_value then null;
  end;
  begin
    update public.profiles set avatar_gear = '{"cabeza": "corona"}' where id = auth.uid();
    raise exception 'FALLO: el navegador escribió avatar_gear directo';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.gear_unlocked(auth.uid());
    raise exception 'FALLO: el navegador llamó gear_unlocked';
  exception when insufficient_privilege then null;
  end;

  perform public.set_avatar_gear('{}');
  assert (select gear from public.my_gear()) = '{}'::jsonb, 'se quita todo';
end $$;

reset request.jwt.claim.sub;
set role anon;
do $$ begin
  perform public.set_avatar_gear('{}');
  raise exception 'FALLO: un invitado vistió un robot';
exception when insufficient_privilege then null;
end $$;
reset role;
select 'OK: pruebas del taller del robot pasaron' as resultado;
