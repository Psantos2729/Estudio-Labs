-- Pruebas de los archivos dados en los casos del examen (migración 015).
\set ON_ERROR_STOP on
insert into auth.users (id) values ('00000000-0000-0000-0000-00000000cc01');

delete from public.exam_items where module_id = 'M00';
delete from public.exam_problems where module_id = 'M00';
insert into public.exam_problems (id, module_id, title, statement) values
  ('M00-X01', 'M00', 'Uno', 'a'), ('M00-X02', 'M00', 'Dos', 'b');
insert into public.exam_items (module_id, problem_id, stdin, files, answer)
select 'M00', p, '', jsonb_build_object('datos.txt', 'linea ' || n), 'SECRETO' || n || E'\n'
from unnest(array['M00-X01', 'M00-X02']) p, generate_series(1, 4) n;
insert into public.exam_items (module_id, question, options, answer)
select 'M00', 'P' || n, array['a', 'b'], '1' from generate_series(1, 4) n;

do $$ begin
  insert into public.exam_items (module_id, problem_id, stdin, files, answer) values ('M00', 'M00-X01', '', '"texto"', 'x');
  raise exception 'FALLO: aceptó files que no es un objeto';
exception when check_violation then null;
end $$;

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000cc01';
do $$
declare
  e jsonb := public.start_exam('M00');
  ans jsonb;
  rv jsonb;
begin
  assert (select bool_and(c -> 'files' ->> 'datos.txt' like 'linea %')
          from jsonb_array_elements(e -> 'problems') p, jsonb_array_elements(p -> 'cases') c), 'cada caso trae su archivo';
  assert e::text not like '%SECRETO%', 'no manda respuestas';
  select jsonb_object_agg(c ->> 'id', 'nada') into ans from jsonb_array_elements(e -> 'problems') p, jsonb_array_elements(p -> 'cases') c;
  perform public.submit_exam((e ->> 'attempt_id')::bigint, ans, '{}'::jsonb);
  rv := public.exam_review((e ->> 'attempt_id')::bigint);
  assert (select bool_and(c -> 'files' ? 'datos.txt')
          from jsonb_array_elements(rv -> 'problems') p, jsonb_array_elements(p -> 'cases') c), 'la revisión muestra los archivos';
  assert rv::text not like '%SECRETO%', 'la revisión no revela salidas esperadas';
end $$;

reset role;
select 'OK: pruebas de archivos en el examen pasaron' as resultado;
