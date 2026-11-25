-- Pruebas del banco oculto, exam_attempts y start_exam (migración 009).
\set ON_ERROR_STOP on
insert into auth.users (id) values ('00000000-0000-0000-0000-0000000000e1'), ('00000000-0000-0000-0000-0000000000e2');

-- Banco de prueba para M00: 3 problemas (uno con pocos casos) y 5 preguntas.
insert into public.exam_problems (id, module_id, title, statement) values
  ('M00-X01', 'M00', 'Uno', 'a'), ('M00-X02', 'M00', 'Dos', 'b'), ('M00-X03', 'M00', 'Corto', 'c');
insert into public.exam_items (module_id, problem_id, stdin, answer)
select 'M00', p, n::text, 'SECRETO' from unnest(array['M00-X01', 'M00-X02']) p, generate_series(1, 5) n
union all select 'M00', 'M00-X03', '1', 'SECRETO';
insert into public.exam_items (module_id, question, options, answer)
select 'M00', 'P' || n, array['a', 'b'], 'SECRETO' from generate_series(1, 5) n;

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-0000-0000-0000000000e1';

do $$
declare
  e jsonb := public.start_exam('M00');
begin
  assert jsonb_array_length(e -> 'problems') = 2, 'dos problemas';
  assert (select count(*) from jsonb_array_elements(e -> 'problems') p, jsonb_array_elements(p -> 'cases')) = 8,
         'ocho casos';
  assert not (e -> 'problems') @> '[{"id": "M00-X03"}]', 'no elige problemas con menos de 4 casos';
  assert jsonb_array_length(e -> 'questions') = 4, 'cuatro preguntas';
  assert e::text not like '%SECRETO%', 'no manda respuestas';
  assert (public.start_exam('M00') ->> 'attempt_id') = e ->> 'attempt_id', 'retoma el intento abierto';
  assert (select status from public.module_mastery where module_id = 'M00') = 'in_progress', 'queda en curso';
  assert (select count(*) from public.exam_attempts) = 1, 've su intento';

  begin
    perform public.start_exam('M01');
    raise exception 'FALLO: empezó el examen de un módulo bloqueado';
  exception when insufficient_privilege then null;
  end;
  begin
    perform count(*) from public.exam_items;
    raise exception 'FALLO: el navegador leyó el banco de casos';
  exception when insufficient_privilege then null;
  end;
  begin
    perform count(*) from public.exam_problems;
    raise exception 'FALLO: el navegador leyó los problemas del banco';
  exception when insufficient_privilege then null;
  end;
  begin
    update public.exam_attempts set passed = true;
    raise exception 'FALLO: el navegador pudo marcarse aprobado';
  exception when insufficient_privilege then null;
  end;
  begin
    insert into public.exam_attempts (user_id, module_id, item_ids, expires_at)
    values (auth.uid(), 'M00', '{}', now());
    raise exception 'FALLO: el navegador pudo crear un intento';
  exception when insufficient_privilege then null;
  end;
end $$;

-- Reprobó hace 10 minutos: debe esperar 1 hora.
reset role;
update public.exam_attempts set submitted_at = now() - interval '10 minutes', passed = false, score = 50;
set role authenticated;
do $$ begin
  begin
    perform public.start_exam('M00');
    raise exception 'FALLO: repitió el examen sin esperar';
  exception when raise_exception then null;
  end;
end $$;

-- Ya pasó la hora: puede repetir.
reset role;
update public.exam_attempts set submitted_at = now() - interval '61 minutes';
set role authenticated;
do $$ begin
  perform public.start_exam('M00');
  assert (select count(*) from public.exam_attempts) = 2, 'nuevo intento tras la espera';
end $$;

-- Módulo abierto pero sin banco: error claro.
reset role;
update public.module_mastery set status = 'available' where module_id = 'M01';
set role authenticated;
do $$ begin
  begin
    perform public.start_exam('M01');
    raise exception 'FALLO: empezó un examen sin banco';
  exception when no_data_found then null;
  end;
end $$;

set request.jwt.claim.sub = '00000000-0000-0000-0000-0000000000e2';
do $$ begin
  assert (select count(*) from public.exam_attempts) = 0, 'no ve exámenes ajenos';
end $$;

set role anon;
set request.jwt.claim.sub = '';
do $$ begin
  begin
    perform public.start_exam('M00');
    raise exception 'FALLO: un invitado empezó un examen';
  exception when insufficient_privilege then null;
  end;
end $$;

reset role;
select 'OK: pruebas del examen (inicio) pasaron' as resultado;
