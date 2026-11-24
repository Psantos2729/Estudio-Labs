-- Pruebas de practice_attempts y record_practice (fase 2). Corre después de rls_phase1.sql.
\set ON_ERROR_STOP on
insert into auth.users (id) values ('00000000-0000-0000-0000-0000000000c1'), ('00000000-0000-0000-0000-0000000000c2');

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-0000000000c1';

do $$ begin
  assert public.record_practice('M00-E01', 'print(1)', '{"pseudo":"Mostrar 1"}', 1, 2) > 0, 'guarda en M00';
  assert (select count(*) from public.practice_attempts) = 1, 've su intento';

  begin
    perform public.record_practice('M01-E01', 'x', '{}', 0, 1);
    raise exception 'FALLO: guardó práctica de un módulo bloqueado';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.record_practice('M00-E01', 'x', '{}', 3, 2);
    raise exception 'FALLO: aceptó más pruebas pasadas que totales';
  exception when check_violation then null;
  end;
  begin
    insert into public.practice_attempts (user_id, exercise_id, code, tests_passed, tests_total)
    values (auth.uid(), 'M00-E01', 'x', 1, 1);
    raise exception 'FALLO: el navegador pudo insertar directo';
  exception when insufficient_privilege then null;
  end;
  begin
    update public.practice_attempts set tests_passed = 2;
    raise exception 'FALLO: el navegador pudo editar un intento';
  exception when insufficient_privilege then null;
  end;
end $$;

set request.jwt.claim.sub = '00000000-0000-0000-0000-0000000000c2';
do $$ begin
  assert (select count(*) from public.practice_attempts) = 0, 'no ve intentos ajenos';
end $$;

set role anon;
set request.jwt.claim.sub = '';
do $$ begin
  begin
    perform public.record_practice('M00-E01', 'x', '{}', 0, 1);
    raise exception 'FALLO: un invitado pudo guardar';
  exception when insufficient_privilege then null;
  end;
end $$;

reset role;
select 'OK: pruebas de práctica pasaron' as resultado;
