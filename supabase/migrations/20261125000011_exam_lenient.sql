-- Calificación más flexible (pedido de Paolo, 2026-11-25): un caso pasa si las líneas esperadas
-- aparecen seguidas en la salida. No cuentan las líneas en blanco, los espacios al final de cada
-- línea ni el texto extra antes o después. Igual que sameOutput() del navegador.

-- Líneas sin espacios al final y sin las vacías, envueltas en \n para comparar líneas completas.
create or replace function public.exam_lines(s text)
returns text
language sql
immutable
as $$
  select E'\n' || coalesce(string_agg(l, E'\n' order by n), '') || E'\n'
  from (select regexp_replace(l, E'\\s+$', '') as l, n
        from regexp_split_to_table(coalesce(s, ''), E'\n') with ordinality as t(l, n)) x
  where l <> '';
$$;

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

  update exam_attempts set submitted_at = now(), score = pct, passed = pct >= md.pass_score
  where id = att.id;

  update module_mastery
  set best_score = greatest(coalesce(best_score, 0), pct), updated_at = now(),
      status = case when pct >= md.pass_score then 'mastered'::mastery_status else status end,
      mastered_at = case when pct >= md.pass_score then now() else mastered_at end,
      next_review_at = case when pct >= md.pass_score
                            then now() + make_interval(days => md.review_days[1]) else next_review_at end
  where user_id = auth.uid() and module_id = att.module_id;

  if pct >= md.pass_score then
    -- Abre los módulos que tenían este como requisito, si ya dominó todos sus requisitos.
    update module_mastery mm set status = 'available', updated_at = now()
    from modules m
    where mm.user_id = auth.uid() and mm.module_id = m.id and mm.status = 'locked'
      and att.module_id = any (m.prerequisites)
      and not exists (select 1 from module_mastery r
                      where r.user_id = auth.uid() and r.module_id = any (m.prerequisites)
                        and r.status <> 'mastered');
  end if;

  return details || jsonb_build_object(
    'score', pct, 'passed', pct >= md.pass_score, 'pass_score', md.pass_score,
    'retry_at', case when pct < md.pass_score then now() + interval '1 hour' end);
end;
$$;

revoke execute on function public.submit_exam from public, anon;
grant execute on function public.submit_exam to authenticated;

drop function public.exam_norm(text);
