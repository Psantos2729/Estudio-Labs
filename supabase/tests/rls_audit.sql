-- Pruebas de los arreglos de la auditoría (migración 020): ids inventados y "imprimir todo".
\set ON_ERROR_STOP on
insert into auth.users (id) values ('00000000-0000-0000-0000-0000000a0d01');

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-0000000a0d01';
do $$
begin
  -- Lo real se guarda (M00-E01 tiene 2 pruebas públicas).
  perform public.record_practice('M00-E01', 'print(1)', '{}', 2, 2);
  perform public.mark_lesson_read('M00-L01');

  begin
    perform public.record_practice('M00-E99', 'x', '{}', 1, 1);
    raise exception 'FALLO: guardó un ejercicio que no existe';
  exception when invalid_parameter_value then null;
  end;
  begin
    perform public.record_practice('M00-E01', 'x', '{}', 1, 1);
    raise exception 'FALLO: aceptó un total de pruebas que no es el del ejercicio';
  exception when invalid_parameter_value then null;
  end;
  begin
    perform public.mark_lesson_read('M00-L99');
    raise exception 'FALLO: marcó una lección que no existe';
  exception when invalid_parameter_value then null;
  end;
  begin
    perform public.mark_lesson_read('M00-E01');
    raise exception 'FALLO: marcó un ejercicio como lección';
  exception when invalid_parameter_value then null;
  end;
  assert (select count(*) from public.practice_attempts where user_id = auth.uid()) = 1, 'solo el intento real';

  -- Calificación: líneas esperadas seguidas, con a lo más 10 líneas de más.
  assert public.exam_match(E'Resultado\n4321\n', '4321'), 'un título de más pasa';
  assert not public.exam_match((select string_agg(g::text, E'\n') from generate_series(0, 99999) g), '4321'),
    'imprimir del 0 al 99999 no pasa';
  assert not public.exam_match(E'1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12', '5'), '11 líneas de más no pasa';
  assert public.exam_match(E'1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11', '5'), '10 líneas de más pasa';
end $$;
reset role;

select 'OK: pruebas de la auditoría pasaron' as resultado;
