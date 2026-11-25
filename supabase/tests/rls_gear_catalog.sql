-- Pruebas del catálogo de cosméticos en tabla (migración 019).
\set ON_ERROR_STOP on
insert into auth.users (id, raw_user_meta_data) values
  ('00000000-0000-0000-0000-00000000a901', '{"full_name": "Dani"}');
-- Una pieza nueva solo necesita su fila (la pone el seed desde content/cosmeticos.json).
insert into public.gear_items (id, slot, rule, need, position) values ('gorra_prueba', 'cabeza', 'nivel', '1', 999);

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000a901';
do $$
begin
  assert (select unlocked from public.my_gear()) = array['gorra_prueba'], 'la pieza nueva se gana sin migración';
  perform public.set_avatar_gear('{"cabeza": "gorra_prueba"}');
  begin
    perform public.set_avatar_gear('{"mano": "gorra_prueba"}');
    raise exception 'FALLO: aceptó la pieza en otro espacio';
  exception when invalid_parameter_value then null;
  end;
  begin
    insert into public.gear_items values ('trampa', 'cabeza', 'nivel', '1', 1000);
    raise exception 'FALLO: el navegador escribió en el catálogo';
  exception when insufficient_privilege then null;
  end;
end $$;
reset request.jwt.claim.sub;
reset role;

do $$ begin
  insert into public.gear_items values ('mala', 'cabeza', 'nivel', 'diez', 1001);
  raise exception 'FALLO: aceptó una meta que no es número';
exception when check_violation then null;
end $$;
delete from public.gear_items where id = 'gorra_prueba';
select 'OK: pruebas del catálogo de cosméticos pasaron' as resultado;
