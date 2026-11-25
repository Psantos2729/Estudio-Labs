-- Repasos espaciados (fase 4, parte 1). Al dominar un módulo se programan repasos a los
-- modules.review_days días (3, 7, 21 y 60). Un repaso es un examen corto del mismo banco oculto.
-- Aprobarlo programa el siguiente; reprobarlo (o dejar que se acabe el tiempo) reabre el módulo
-- y hay que volver a dar su examen completo. Los módulos siguientes NO se cierran (Paolo).
-- La calificación sigue en submit_exam (migración 013).

-- Repasos aprobados desde el último examen aprobado (0 a 4). Con 4 el módulo queda consolidado.
alter table public.module_mastery add column review_stage smallint not null default 0;

alter table public.exam_attempts
  add column kind text not null default 'exam' check (kind in ('exam', 'review'));

-- Igual que en la 009, pero la espera de 1 hora y el retomar solo miran exámenes, no repasos.
create or replace function public.start_exam(p_module_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  att exam_attempts;
  st  mastery_status;
  ids bigint[];
  wait_until timestamptz;
begin
  if auth.uid() is null then
    raise exception 'Necesitas iniciar sesión para presentar el examen' using errcode = '42501';
  end if;

  select status into st from module_mastery where user_id = auth.uid() and module_id = p_module_id;
  if st is null or st in ('locked', 'mastered') then
    raise exception 'El examen de % no está disponible para ti', p_module_id using errcode = '42501';
  end if;

  select * into att from exam_attempts
  where user_id = auth.uid() and module_id = p_module_id and kind = 'exam'
    and submitted_at is null and expires_at > now();
  if found then
    return exam_payload(att); -- retomar tras recargar la página
  end if;

  -- Un intento vencido sin enviar cuenta como reprobado.
  select max(coalesce(submitted_at, expires_at)) + interval '1 hour' into wait_until
  from exam_attempts
  where user_id = auth.uid() and module_id = p_module_id and kind = 'exam' and passed is not true;
  if wait_until > now() then
    raise exception 'Podrás repetir el examen a las %', to_char(wait_until, 'HH24:MI "UTC"')
      using errcode = 'P0001', hint = wait_until::text;
  end if;

  with problems as (
    select p.id from exam_problems p
    where p.module_id = p_module_id
      and (select count(*) from exam_items i where i.problem_id = p.id) >= 4
    order by random() limit 2
  ), picked as (
    select c.id from problems p
    cross join lateral (select i.id from exam_items i where i.problem_id = p.id
                        order by random() limit 4) c
    union all
    (select i.id from exam_items i
     where i.module_id = p_module_id and i.question is not null order by random() limit 4)
  )
  select array_agg(id) into ids from picked;

  if coalesce(cardinality(ids), 0) <> 12 then
    raise exception 'El examen de % todavía no tiene banco de preguntas', p_module_id
      using errcode = 'P0002';
  end if;

  insert into exam_attempts (user_id, module_id, item_ids, expires_at)
  values (auth.uid(), p_module_id, ids, now() + interval '45 minutes')
  returning * into att;

  update module_mastery set status = 'in_progress', updated_at = now()
  where user_id = auth.uid() and module_id = p_module_id and status = 'available';

  return exam_payload(att);
end;
$$;

-- Empieza (o retoma) el repaso que toca: 1 problema con 4 casos + 3 preguntas (7 puntos, así un
-- error todavía da 86 %). 20 minutos, sin pistas. Si el anterior se venció sin entregar, reabre
-- el módulo y devuelve {"expired": true}.
create or replace function public.start_review(p_module_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  mm  module_mastery;
  att exam_attempts;
  ids bigint[];
begin
  if auth.uid() is null then
    raise exception 'Necesitas iniciar sesión para hacer el repaso' using errcode = '42501';
  end if;

  select * into mm from module_mastery
  where user_id = auth.uid() and module_id = p_module_id for update;
  if not found or mm.status <> 'mastered' or mm.next_review_at is null or mm.next_review_at > now() then
    raise exception 'El repaso de % todavía no toca', p_module_id using errcode = '42501';
  end if;

  select * into att from exam_attempts
  where user_id = auth.uid() and module_id = p_module_id and kind = 'review'
    and submitted_at is null and passed is null;
  if found and att.expires_at > now() then
    return exam_payload(att); -- retomar tras recargar la página
  elsif found then
    update exam_attempts set score = 0, passed = false where id = att.id;
    update module_mastery set status = 'reopened', review_stage = 0, next_review_at = null,
                              updated_at = now()
    where user_id = auth.uid() and module_id = p_module_id;
    return jsonb_build_object('expired', true, 'module_id', p_module_id);
  end if;

  with problem as (
    select p.id from exam_problems p
    where p.module_id = p_module_id
      and (select count(*) from exam_items i where i.problem_id = p.id) >= 4
    order by random() limit 1
  ), picked as (
    select c.id from problem p
    cross join lateral (select i.id from exam_items i where i.problem_id = p.id
                        order by random() limit 4) c
    union all
    (select i.id from exam_items i
     where i.module_id = p_module_id and i.question is not null order by random() limit 3)
  )
  select array_agg(id) into ids from picked;

  if coalesce(cardinality(ids), 0) <> 7 then
    raise exception 'El repaso de % todavía no tiene banco de preguntas', p_module_id
      using errcode = 'P0002';
  end if;

  insert into exam_attempts (user_id, module_id, item_ids, expires_at, kind)
  values (auth.uid(), p_module_id, ids, now() + interval '20 minutes', 'review')
  returning * into att;

  return exam_payload(att);
end;
$$;

revoke execute on function public.start_review from public, anon;
grant execute on function public.start_review to authenticated;
