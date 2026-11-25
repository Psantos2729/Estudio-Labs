-- Pruebas de los repasos espaciados (migraciones 012 y 013). Banco propio de M00 como en
-- rls_exam_submit.sql: la salida de cada caso es "out<entrada>" y la opción correcta es 1.
\set ON_ERROR_STOP on
insert into auth.users (id) values
  ('00000000-0000-0000-0000-00000000ae01'), ('00000000-0000-0000-0000-00000000ae02'),
  ('00000000-0000-0000-0000-00000000ae03');

delete from public.exam_problems where module_id = 'M00';
delete from public.exam_items where module_id = 'M00';
insert into public.exam_problems (id, module_id, title, statement) values
  ('M00-X01', 'M00', 'Uno', 'a'), ('M00-X02', 'M00', 'Dos', 'b');
insert into public.exam_items (module_id, problem_id, stdin, answer)
select 'M00', p, n::text, 'out' || n || E'\n' from unnest(array['M00-X01', 'M00-X02']) p, generate_series(1, 4) n;
insert into public.exam_items (module_id, question, options, answer)
select 'M00', 'P' || n, array['a', 'b'], '1' from generate_series(1, 4) n;

-- Respuestas: todo bien salvo `wrong` puntos (casos primero).
create function pg_temp.answers(e jsonb, wrong int) returns jsonb language sql as $$
  select jsonb_object_agg(id, case when rn <= wrong then 'mal' else val end)
  from (select id, val, row_number() over () as rn from (
          select c ->> 'id' as id, 'out' || (c ->> 'stdin') as val
          from jsonb_array_elements(e -> 'problems') p, jsonb_array_elements(p -> 'cases') c
          union all
          select q ->> 'id', '1' from jsonb_array_elements(e -> 'questions') q) t) r;
$$;
-- Domina M00 y deja vencido el repaso, como si hubieran pasado los días.
create function pg_temp.master_and_wait() returns void language plpgsql as $$
declare e jsonb := public.start_exam('M00');
begin
  perform public.submit_exam((e ->> 'attempt_id')::bigint, pg_temp.answers(e, 0));
end $$;
create function pg_temp.make_due() returns void language sql security definer as $$
  update public.module_mastery set next_review_at = now() - interval '1 minute'
  where module_id = 'M00' and user_id = auth.uid();
$$;
grant execute on function pg_temp.answers, pg_temp.master_and_wait, pg_temp.make_due to authenticated;

set role authenticated;

-- 1) Aprueba los 4 repasos: 3 → 7 → 21 → 60 días y luego queda consolidado.
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000ae01';
do $$
declare
  e jsonb; r jsonb; days int[] := '{7,21,60}';
begin
  perform pg_temp.master_and_wait();
  begin
    perform public.start_review('M00');
    raise exception 'FALLO: repasó antes de tiempo';
  exception when insufficient_privilege then null;
  end;
  for k in 1..4 loop
    perform pg_temp.make_due();
    e := public.start_review('M00');
    assert (select count(*) from jsonb_array_elements(e -> 'problems')) = 1, 'un problema';
    assert jsonb_array_length(e -> 'questions') = 3, 'tres preguntas';
    assert e = public.start_review('M00'), 'recargar retoma el mismo repaso';
    r := public.submit_exam((e ->> 'attempt_id')::bigint, pg_temp.answers(e, 1));
    assert (r ->> 'score')::int = 86 and (r ->> 'passed')::bool and r ->> 'kind' = 'review', 'aprueba: ' || r;
    assert (select review_stage from public.module_mastery where module_id = 'M00') = k, 'etapa ' || k;
    assert (select status from public.module_mastery where module_id = 'M00') = 'mastered', 'sigue dominado';
    if k < 4 then
      assert (select next_review_at::date from public.module_mastery where module_id = 'M00')
             = (now() + make_interval(days => days[k]))::date, 'siguiente repaso ' || k;
    end if;
  end loop;
  assert (select next_review_at from public.module_mastery where module_id = 'M00') is null, 'consolidado';
  assert (select best_score from public.module_mastery where module_id = 'M00') = 100, 'el repaso no toca la nota';
  assert (select count(*) from public.exam_attempts where kind = 'review') = 4, 'historial de repasos';
end $$;

-- 2) Reprueba: se reabre M00, M01 sigue abierto y el examen se puede dar enseguida.
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000ae02';
do $$
declare e jsonb; r jsonb;
begin
  perform pg_temp.master_and_wait();
  perform pg_temp.make_due();
  e := public.start_review('M00');
  r := public.submit_exam((e ->> 'attempt_id')::bigint, pg_temp.answers(e, 2));
  assert (r ->> 'score')::int = 71 and not (r ->> 'passed')::bool, 'reprueba: ' || r;
  assert r::text not like '%out%', 'no revela salidas esperadas';
  assert (select status from public.module_mastery where module_id = 'M00') = 'reopened', 'reabierto';
  assert (select next_review_at from public.module_mastery where module_id = 'M00') is null, 'sin repaso';
  assert (select status from public.module_mastery where module_id = 'M01') = 'available', 'M01 sigue abierto';
  begin
    perform public.start_review('M00');
    raise exception 'FALLO: repasó un módulo reabierto';
  exception when insufficient_privilege then null;
  end;
  perform pg_temp.master_and_wait(); -- sin la espera de 1 hora
  assert (select status from public.module_mastery where module_id = 'M00') = 'mastered', 'dominado otra vez';
  assert (select review_stage from public.module_mastery where module_id = 'M00') = 0, 'repasos desde cero';
  assert (select next_review_at::date from public.module_mastery where module_id = 'M00')
         = (now() + interval '3 days')::date, 'repaso a los 3 días otra vez';
end $$;

-- 3) Deja vencer el repaso: al volver, el módulo se reabre.
set request.jwt.claim.sub = '00000000-0000-0000-0000-00000000ae03';
do $$ begin
  perform pg_temp.master_and_wait();
  perform pg_temp.make_due();
  perform public.start_review('M00');
end $$;
reset role;
update public.exam_attempts set expires_at = now() - interval '2 minutes'
  where user_id = '00000000-0000-0000-0000-00000000ae03' and kind = 'review';
set role authenticated;
do $$ begin
  assert public.start_review('M00') ->> 'expired' = 'true', 'avisa que se venció';
  assert (select status from public.module_mastery where module_id = 'M00') = 'reopened', 'reabierto';
  assert (select passed from public.exam_attempts where kind = 'review') is false, 'cuenta como reprobado';
end $$;

set role anon;
set request.jwt.claim.sub = '';
do $$ begin
  begin
    perform public.start_review('M00');
    raise exception 'FALLO: un invitado hizo un repaso';
  exception when insufficient_privilege then null;
  end;
end $$;

reset role;
select 'OK: pruebas de repasos pasaron' as resultado;
