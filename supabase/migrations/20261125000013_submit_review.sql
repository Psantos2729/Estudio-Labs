-- Repasos espaciados (fase 4, parte 2): submit_exam califica igual exámenes y repasos
-- (misma comparación flexible de la 011) y aplica el resultado según el tipo de intento.

create or replace function public.submit_exam(p_attempt_id bigint, p_answers jsonb)
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

  with graded as (
    select i.problem_id,
           case when i.question is not null then trim(p_answers ->> i.id::text) = i.answer
                else strpos(exam_lines(p_answers ->> i.id::text), exam_lines(i.answer)) > 0 end as good
    from exam_items i where i.id = any (att.item_ids)
  ), per_problem as (
    select problem_id, count(*) filter (where good) as passed, count(*) as total
    from graded group by problem_id
  )
  select (select count(*) filter (where good) from graded), (select count(*) from graded),
         jsonb_build_object(
           'problems', coalesce((select jsonb_agg(jsonb_build_object(
                          'id', problem_id, 'passed', passed, 'total', total) order by problem_id)
                        from per_problem where problem_id is not null), '[]'),
           'questions', coalesce((select jsonb_build_object('passed', passed, 'total', total)
                         from per_problem where problem_id is null), '{"passed": 0, "total": 0}'))
  into n_ok, n_total, details;

  select * into md from modules where id = att.module_id;
  pct := round(100.0 * n_ok / n_total);

  ok := pct >= md.pass_score;

  update exam_attempts set submitted_at = now(), score = pct, passed = ok where id = att.id;

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

