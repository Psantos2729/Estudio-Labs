-- Pruebas de la zona de práctica (migración 027): se abre con M04 y cada problema da el XP de su nivel.
\set ON_ERROR_STOP on
insert into auth.users (id) values ('00000000-0000-0000-0000-0000000027a1');

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-0000000027a1';
do $$ begin
  begin
    perform public.record_practice('P01', 'print(1)', '{}', 5, 5);
    raise exception 'FALLO: guardó un problema de práctica sin haber vencido la zona 1';
  exception when insufficient_privilege then null;
  end;
end $$;

reset role;
update public.module_mastery set status = 'available'
where user_id = '00000000-0000-0000-0000-0000000027a1' and module_id = 'M04';

set role authenticated;
do $$ begin
  assert public.record_practice('P01', 'x', '{}', 2, 5) > 0, 'guarda un intento fallido';
  assert public.record_practice('P01', 'print(1)', '{}', 5, 5) > 0, 'guarda el problema resuelto';
  assert public.record_practice('P01', 'print(1)', '{}', 5, 5) > 0, 'puede repetirlo';
  assert public.record_practice('P45', 'print(1)', '{}', 3, 3) > 0, 'guarda uno muy difícil';
  begin
    perform public.record_practice('P01', 'x', '{}', 1, 1);
    raise exception 'FALLO: aceptó un total de pruebas que no es el del problema';
  exception when invalid_parameter_value then null;
  end;
  begin
    perform public.record_practice('P99', 'x', '{}', 1, 1);
    raise exception 'FALLO: aceptó un problema que no existe';
  exception when invalid_parameter_value then null;
  end;
end $$;

reset role;
do $$
declare u uuid := '00000000-0000-0000-0000-0000000027a1';
begin
  assert (select sum(xp) from public.catalog_items where id in ('P01', 'P45')) = 30 + 60, 'XP por nivel en el catálogo';
  -- P01 (medio, 30) una sola vez aunque se resolvió dos veces + P45 (muy difícil, 60)
  -- + 30 de la misión «Resuelve 2 ejercicios» del día (migración 023).
  assert public.xp_of(u) = 30 + 60 + 30, 'XP con práctica: ' || public.xp_of(u);
end $$;

select 'OK: pruebas de la zona de práctica pasaron' as resultado;
