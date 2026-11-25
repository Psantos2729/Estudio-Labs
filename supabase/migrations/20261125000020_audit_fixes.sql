-- Arreglos de la auditoría (2026-11-25).
-- 1) record_practice y mark_lesson_read aceptaban cualquier id con formato válido (M00-E99, M00-L77…):
--    una cuenta nueva llegaba a 3500 XP y al primer lugar del ranking. Ahora solo aceptan lecciones y
--    ejercicios que existen en content/ (catalog_items, lo llena `npm run seed`), y en la práctica el
--    total de pruebas debe ser el del ejercicio.
-- 2) La tabla exercises nunca se llenó ni se leyó: la reemplaza catalog_items.
-- 3) Calificación del examen: además de que las líneas esperadas aparezcan seguidas, la salida puede
--    traer a lo más 10 líneas de más. Así imprimir del 0 al 99999 ya no aprueba cualquier número.
-- Después de esta migración hay que correr supabase/seed.sql: sin él no se puede guardar práctica.

drop table public.exercises;
drop type public.exercise_kind;

-- Lecciones (tests null) y ejercicios (tests = cuántas pruebas públicas tiene).
create table public.catalog_items (
  id    text primary key check (id ~ '^M\d{2}-[EL]\d{2}$'),
  tests smallint check ((id ~ '-E') = (tests is not null))
);
-- Solo la leen funciones del servidor; el navegador usa content/.
alter table public.catalog_items enable row level security;

create or replace function public.record_practice(
  p_exercise_id text, p_code text, p_notes jsonb, p_tests_passed int, p_tests_total int
) returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id bigint;
begin
  if auth.uid() is null then
    raise exception 'Necesitas iniciar sesión para guardar tu práctica' using errcode = '42501';
  end if;
  if not exists (
    select 1 from module_mastery
    where user_id = auth.uid() and module_id = left(p_exercise_id, 3) and status <> 'locked'
  ) then
    raise exception 'El módulo de % está bloqueado', p_exercise_id using errcode = '42501';
  end if;
  if not exists (select 1 from catalog_items where id = p_exercise_id and tests = p_tests_total) then
    raise exception 'El ejercicio % no existe o no tiene % pruebas', p_exercise_id, p_tests_total
      using errcode = '22023';
  end if;
  insert into practice_attempts (user_id, exercise_id, code, notes, tests_passed, tests_total)
  values (auth.uid(), p_exercise_id, p_code, coalesce(p_notes, '{}'), p_tests_passed, p_tests_total)
  returning id into new_id;
  return new_id;
end;
$$;

create or replace function public.mark_lesson_read(p_lesson_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Necesitas iniciar sesión para guardar tu avance' using errcode = '42501';
  end if;
  if not exists (
    select 1 from module_mastery
    where user_id = auth.uid() and module_id = left(p_lesson_id, 3) and status <> 'locked'
  ) then
    raise exception 'El módulo de % está bloqueado', p_lesson_id using errcode = '42501';
  end if;
  if not exists (select 1 from catalog_items where id = p_lesson_id and tests is null) then
    raise exception 'La lección % no existe', p_lesson_id using errcode = '22023';
  end if;
  insert into lesson_progress (user_id, lesson_id) values (auth.uid(), p_lesson_id)
  on conflict do nothing;
end;
$$;

-- Un caso pasa si las líneas esperadas aparecen seguidas y sobran a lo más 10 líneas (sin contar vacías).
create or replace function public.exam_match(p_given text, p_expected text)
returns boolean
language sql
immutable
as $$
  select strpos(g, e) > 0
     and length(g) - length(replace(g, E'\n', '')) <= length(e) - length(replace(e, E'\n', '')) + 10
  from (select exam_lines(p_given) as g, exam_lines(p_expected) as e) x;
$$;

-- Igual que en la migración 014, calificando con exam_match.
create or replace function public.submit_exam(p_attempt_id bigint, p_answers jsonb, p_code jsonb default '{}')
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  att     exam_attempts;
  md     modules;
  n_ok    int;
  n_total int;
  pct     smallint;
  details jsonb;
  ok      boolean;
  next_at timestamptz;
  items   jsonb;
begin
  select * into att from exam_attempts where id = p_attempt_id and user_id = auth.uid() for update;
  if not found then
    raise exception 'Ese examen no existe o no es tuyo' using errcode = '42501';
  end if;
  if att.submitted_at is not null then
    raise exception 'Ese examen ya se entregó' using errcode = '55000';
  end if;
  -- 1 minuto de gracia para el viaje por la red.
  if now() > att.expires_at + interval '1 minute' then
    raise exception 'Se acabó el tiempo del examen' using errcode = '55000';
  end if;
  if octet_length(coalesce(p_code, '{}')::text) > 200000 then
    raise exception 'El código entregado es demasiado largo' using errcode = '54000';
  end if;

  with graded as (
    select i.id, i.problem_id, left(p_answers ->> i.id::text, 2000) as given,
           case when i.question is not null then trim(p_answers ->> i.id::text) = i.answer
                else exam_match(p_answers ->> i.id::text, i.answer) end as good
    from exam_items i where i.id = any (att.item_ids)
  ), per_problem as (
    select problem_id, count(*) filter (where good) as passed, count(*) as total
    from graded group by problem_id
  )
  select (select count(*) filter (where good) from graded), (select count(*) from graded),
         (select jsonb_object_agg(id, jsonb_build_object('given', given, 'good', good)) from graded),
         jsonb_build_object(
           'problems', coalesce((select jsonb_agg(jsonb_build_object(
                          'id', problem_id, 'passed', passed, 'total', total) order by problem_id)
                        from per_problem where problem_id is not null), '[]'),
           'questions', coalesce((select jsonb_build_object('passed', passed, 'total', total)
                         from per_problem where problem_id is null), '{"passed": 0, "total": 0}'))
  into n_ok, n_total, items, details;

  select * into md from modules where id = att.module_id;
  pct := round(100.0 * n_ok / n_total);

  ok := pct >= md.pass_score;

  update exam_attempts
  set submitted_at = now(), score = pct, passed = ok,
      work = jsonb_build_object('code', coalesce(p_code, '{}'), 'items', items)
  where id = att.id;

  if att.kind = 'review' then
    -- Aprobar programa el siguiente repaso (ninguno tras el último); reprobar reabre el módulo.
    update module_mastery
    set review_stage = case when ok then review_stage + 1 else 0 end,
        status = case when ok then status else 'reopened'::mastery_status end,
        next_review_at = case when ok and review_stage + 2 <= cardinality(md.review_days)
                              then now() + make_interval(days => md.review_days[review_stage + 2]) end,
        updated_at = now()
    where user_id = auth.uid() and module_id = att.module_id and status = 'mastered'
    returning next_review_at into next_at;

    return details || jsonb_build_object(
      'kind', 'review', 'score', pct, 'passed', ok, 'pass_score', md.pass_score,
      'next_review_at', next_at, 'retry_at', null);
  end if;

  update module_mastery
  set best_score = greatest(coalesce(best_score, 0), pct), updated_at = now(),
      status = case when ok then 'mastered'::mastery_status else status end,
      mastered_at = case when ok then now() else mastered_at end,
      review_stage = case when ok then 0 else review_stage end,
      next_review_at = case when ok
                            then now() + make_interval(days => md.review_days[1]) else next_review_at end
  where user_id = auth.uid() and module_id = att.module_id;

  if ok then
    -- Abre los módulos que tenían este como requisito, si ya dominó todos sus requisitos.
    -- Un requisito reabierto por un repaso cuenta: ya lo había dominado.
    update module_mastery mm set status = 'available', updated_at = now()
    from modules m
    where mm.user_id = auth.uid() and mm.module_id = m.id and mm.status = 'locked'
      and att.module_id = any (m.prerequisites)
      and not exists (select 1 from module_mastery r
                      where r.user_id = auth.uid() and r.module_id = any (m.prerequisites)
                        and r.status not in ('mastered', 'reopened'));
  end if;

  return details || jsonb_build_object(
    'kind', 'exam', 'score', pct, 'passed', ok, 'pass_score', md.pass_score,
    'retry_at', case when not ok then now() + interval '1 hour' end);
end;
$$;

revoke execute on function public.submit_exam from public, anon;
grant execute on function public.submit_exam to authenticated;
