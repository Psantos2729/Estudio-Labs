-- Pruebas de submit_exam (migración 010). Usa su propio banco de M00 con respuestas conocidas.
\set ON_ERROR_STOP on
insert into auth.users (id) values
  ('00000000-0000-0000-0000-00000000a0d1'), ('00000000-0000-0000-0000-00000000a0d2'),
  ('00000000-0000-0000-0000-00000000a0d3');

delete from public.exam_problems where module_id = 'M00';
delete from public.exam_items where module_id = 'M00';
insert into public.exam_problems (id, module_id, title, statement) values
  ('M00-X01', 'M00', 'Uno', 'a'), ('M00-X02', 'M00', 'Dos', 'b');
-- La salida esperada de cada caso es "out<entrada>"; la opción correcta de cada pregunta es 1.
insert into public.exam_items (module_id, problem_id, stdin, answer)
select 'M00', p, n::text, 'out' || n || E'\n' from unnest(array['M00-X01', 'M00-X02']) p, generate_series(1, 4) n;
insert into public.exam_items (module_id, question, options, answer)
select 'M00', 'P' || n, array['a', 'b'], '1' from generate_series(1, 4) n;

-- Respuestas para un examen: todo bien salvo `wrong` puntos (casos primero). Las buenas traen
-- un título y líneas en blanco de más, que no deben contar.
create function pg_temp.answers(e jsonb, wrong int) returns jsonb language sql as $$
  select jsonb_object_agg(id, case when rn <= wrong then replace(val, 'out', 'out0') || 'x' else val end)
  from (select id, val, row_number() over () as rn from (
          select c ->> 'id' as id, E'Dato:\n\n' || 'out' || (c ->> 'stdin') || E'  \r\n\n' as val
          from jsonb_array_elements(e -> 'problems') p, jsonb_array_elements(p -> 'cases') c
          union all
          select q ->> 'id', ' 1 ' from jsonb_array_elements(e -> 'questions') q) t) r;
$$;
grant execute on function pg_temp.answers to authenticated;

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000a0d1';
do $$
declare
  e jsonb := public.start_exam('M00');
  r jsonb := public.submit_exam((e ->> 'attempt_id')::bigint, pg_temp.answers(e, 1));
begin
  assert (r ->> 'score')::int = 92 and (r ->> 'passed')::bool, 'aprueba con 11 de 12: ' || r;
  assert r -> 'retry_at' = 'null', 'sin espera al aprobar';
  assert (select sum((p ->> 'total')::int) from jsonb_array_elements(r -> 'problems') p) = 8, 'cuenta casos';
  assert r -> 'questions' = '{"passed": 4, "total": 4}', 'cuenta preguntas';
  assert r::text not like '%out%', 'no revela salidas esperadas';
  assert (select status from public.module_mastery where module_id = 'M00') = 'mastered', 'M00 dominado';
  assert (select best_score from public.module_mastery where module_id = 'M00') = 92, 'guarda la nota';
  assert (select next_review_at::date from public.module_mastery where module_id = 'M00')
         = (now() + interval '3 days')::date, 'repaso a los 3 días';
  assert (select status from public.module_mastery where module_id = 'M01') = 'available', 'abre M01';
  assert (select status from public.module_mastery where module_id = 'M02') = 'locked', 'M02 sigue cerrado';
  assert (select passed from public.exam_attempts) is true, 'intento aprobado';

  begin
    perform public.submit_exam((e ->> 'attempt_id')::bigint, '{}');
    raise exception 'FALLO: entregó dos veces';
  exception when object_not_in_prerequisite_state then null;
  end;
  begin
    perform public.start_exam('M00');
    raise exception 'FALLO: repitió un examen ya dominado';
  exception when insufficient_privilege then null;
  end;
end $$;

set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000a0d2';
do $$
declare
  e jsonb := public.start_exam('M00');
  r jsonb;
begin
  begin
    perform public.submit_exam((select id from public.exam_attempts where user_id <> auth.uid() limit 1), '{}');
    raise exception 'FALLO: entregó el examen de otra persona';
  exception when insufficient_privilege then null;
  end;
  r := public.submit_exam((e ->> 'attempt_id')::bigint, pg_temp.answers(e, 2));
  assert (r ->> 'score')::int = 83 and not (r ->> 'passed')::bool, 'reprueba con 10 de 12: ' || r;
  assert r ->> 'retry_at' is not null, 'dice cuándo repetir';
  assert (select status from public.module_mastery where module_id = 'M00') = 'in_progress', 'sigue en curso';
  assert (select status from public.module_mastery where module_id = 'M01') = 'locked', 'M01 sigue cerrado';
end $$;

set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000a0d3';
select public.start_exam('M00') is not null as empezo \gset
reset role;
update public.exam_attempts set expires_at = now() - interval '2 minutes'
  where user_id = '00000000-0000-0000-0000-00000000a0d3';
set role authenticated;
do $$ begin
  begin
    perform public.submit_exam((select id from public.exam_attempts), pg_temp.answers('{}', 0));
    raise exception 'FALLO: entregó fuera de tiempo';
  exception when object_not_in_prerequisite_state then null;
  end;
end $$;

set role anon;
set request.jwt.claim.sub = '';
do $$ begin
  begin
    perform public.submit_exam(1, '{}');
    raise exception 'FALLO: un invitado entregó un examen';
  exception when insufficient_privilege then null;
  end;
end $$;

reset role;
select 'OK: pruebas de calificación del examen pasaron' as resultado;
