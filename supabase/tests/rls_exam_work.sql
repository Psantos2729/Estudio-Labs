-- Pruebas de guardar la entrega y revisarla (migración 014). Banco propio de M00 como en
-- rls_exam_submit.sql: la salida de cada caso es "out<entrada>" y la opción correcta es 1.
\set ON_ERROR_STOP on
insert into auth.users (id) values
  ('00000000-0000-0000-0000-00000000bb01'), ('00000000-0000-0000-0000-00000000bb02');

delete from public.exam_problems where module_id = 'M00';
delete from public.exam_items where module_id = 'M00';
insert into public.exam_problems (id, module_id, title, statement) values
  ('M00-X01', 'M00', 'Uno', 'a'), ('M00-X02', 'M00', 'Dos', 'b');
insert into public.exam_items (module_id, problem_id, stdin, answer)
select 'M00', p, n::text, 'esperado' || n || E'\n' from unnest(array['M00-X01', 'M00-X02']) p, generate_series(1, 4) n;
insert into public.exam_items (module_id, question, options, answer)
select 'M00', 'P' || n, array['a', 'b', 'c'], '1' from generate_series(1, 4) n;

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000bb01';
do $$
declare
  e jsonb := public.start_exam('M00');
  ans jsonb;
  rv jsonb;
  cs jsonb;
begin
  assert public.exam_review((e ->> 'attempt_id')::bigint) is null, 'sin entregar no hay revisión';
  -- Todos los casos bien salvo los de entrada 1; todas las preguntas con la opción 2 (mal).
  select jsonb_object_agg(c ->> 'id', case when c ->> 'stdin' = '1' then 'mal' else 'esperado' || (c ->> 'stdin') end)
  into ans from jsonb_array_elements(e -> 'problems') p, jsonb_array_elements(p -> 'cases') c;
  select ans || jsonb_object_agg(q ->> 'id', '2') into ans from jsonb_array_elements(e -> 'questions') q;

  begin
    perform public.submit_exam((e ->> 'attempt_id')::bigint, ans, jsonb_build_object('M00-X01', repeat('x', 200001)));
    raise exception 'FALLO: aceptó código gigante';
  exception when program_limit_exceeded then null;
  end;

  perform public.submit_exam((e ->> 'attempt_id')::bigint, ans,
    jsonb_build_object('M00-X01', 'print("uno")', 'M00-X02', 'print("dos")'));
  rv := public.exam_review((e ->> 'attempt_id')::bigint);

  assert rv ->> 'kind' = 'exam' and (rv ->> 'score')::int = 50, 'nota: ' || rv;
  assert (select count(*) from jsonb_array_elements(rv -> 'problems') p where p ->> 'code' like 'print(%') = 2, 'guarda el código';
  for cs in select x from jsonb_array_elements(rv -> 'problems') p, jsonb_array_elements(p -> 'cases') x loop
    assert (cs ->> 'good')::bool = (cs ->> 'stdin' <> '1'), 'marca cada caso: ' || cs;
    assert cs ? 'given' and cs ? 'stdin', 'trae entrada y salida propia';
  end loop;
  assert (select bool_and(q ->> 'picked' = '2' and not (q ->> 'good')::bool)
          from jsonb_array_elements(rv -> 'questions') q), 'marca cada pregunta';
  assert rv::text not like '%esperado1%', 'no revela salidas esperadas que fallaste';
  assert rv::text not like '%"answer"%', 'no revela respuestas';
end $$;

set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000bb02';
do $$ begin
  assert public.exam_review((select id from public.exam_attempts where work is not null limit 1)) is null,
    'nadie revisa el examen de otra persona';
end $$;

reset role;
select 'OK: pruebas de revisar exámenes pasaron' as resultado;
