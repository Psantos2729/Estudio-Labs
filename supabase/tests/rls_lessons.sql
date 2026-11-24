-- Pruebas de lesson_progress y mark_lesson_read (fase 2).
\set ON_ERROR_STOP on
insert into auth.users (id) values ('00000000-0000-0000-0000-0000000000d1'), ('00000000-0000-0000-0000-0000000000d2');

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-0000000000d1';

do $$ begin
  perform public.mark_lesson_read('M00-L01');
  perform public.mark_lesson_read('M00-L01'); -- repetir no falla ni duplica
  assert (select count(*) from public.lesson_progress) = 1, 'una lección leída';

  begin
    perform public.mark_lesson_read('M01-L01');
    raise exception 'FALLO: marcó una lección de un módulo bloqueado';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.mark_lesson_read('cualquier cosa');
    raise exception 'FALLO: aceptó un id de lección inválido';
  exception when insufficient_privilege or check_violation then null;
  end;
  begin
    insert into public.lesson_progress (user_id, lesson_id) values (auth.uid(), 'M00-L02');
    raise exception 'FALLO: el navegador pudo insertar directo';
  exception when insufficient_privilege then null;
  end;
end $$;

set request.jwt.claim.sub = '00000000-0000-0000-0000-0000000000d2';
do $$ begin
  assert (select count(*) from public.lesson_progress) = 0, 'no ve lecciones ajenas';
end $$;

set role anon;
set request.jwt.claim.sub = '';
do $$ begin
  begin
    perform public.mark_lesson_read('M00-L01');
    raise exception 'FALLO: un invitado pudo marcar';
  exception when insufficient_privilege then null;
  end;
end $$;

reset role;
select 'OK: pruebas de lecciones pasaron' as resultado;
