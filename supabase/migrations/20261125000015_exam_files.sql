-- Archivos dados en los casos del examen (M08): cada caso puede traer archivos de texto que
-- ya están en la carpeta cuando corre el programa, como {"datos1.txt": "45 12 98\n..."}.
-- Como stdin, son entradas: el estudiante las recibe; la salida esperada sigue oculta.
alter table public.exam_items add column if not exists files jsonb
  check (files is null or jsonb_typeof(files) = 'object');

-- Igual que en la migración 009, con 'files' en cada caso.
create or replace function public.exam_payload(p_attempt public.exam_attempts)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'attempt_id', p_attempt.id,
    'module_id', p_attempt.module_id,
    'expires_at', p_attempt.expires_at,
    'problems', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', p.id, 'title', p.title, 'statement', p.statement,
        'cases', (select jsonb_agg(jsonb_build_object('id', i.id, 'stdin', i.stdin, 'files', i.files) order by i.id)
                  from exam_items i where i.problem_id = p.id and i.id = any (p_attempt.item_ids))
      ) order by p.id)
      from exam_problems p
      where p.id in (select problem_id from exam_items where id = any (p_attempt.item_ids))
    ), '[]'),
    'questions', coalesce((
      select jsonb_agg(jsonb_build_object('id', i.id, 'question', i.question, 'options', i.options)
                       order by i.id)
      from exam_items i where i.id = any (p_attempt.item_ids) and i.question is not null
    ), '[]')
  );
$$;

revoke execute on function public.exam_payload from public, anon, authenticated;

-- Igual que en la migración 014, con 'files' en cada caso.
create or replace function public.exam_review(p_attempt_id bigint)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'attempt_id', a.id, 'module_id', a.module_id, 'kind', a.kind,
    'started_at', a.started_at, 'score', a.score, 'passed', a.passed,
    'problems', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', p.id, 'title', p.title, 'statement', p.statement,
        'code', a.work -> 'code' ->> p.id,
        'cases', (select jsonb_agg(jsonb_build_object(
                    'id', i.id, 'stdin', i.stdin, 'files', i.files,
                    'given', a.work -> 'items' -> i.id::text ->> 'given',
                    'good', (a.work -> 'items' -> i.id::text ->> 'good')::boolean) order by i.id)
                  from exam_items i where i.problem_id = p.id and i.id = any (a.item_ids))
      ) order by p.id)
      from exam_problems p
      where p.id in (select problem_id from exam_items where id = any (a.item_ids))
    ), '[]'),
    'questions', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', i.id, 'question', i.question, 'options', i.options,
        'picked', (a.work -> 'items' -> i.id::text ->> 'given'),
        'good', (a.work -> 'items' -> i.id::text ->> 'good')::boolean) order by i.id)
      from exam_items i where i.id = any (a.item_ids) and i.question is not null
    ), '[]'))
  from exam_attempts a
  where a.id = p_attempt_id and a.user_id = auth.uid() and a.work is not null;
$$;

revoke execute on function public.exam_review from public, anon;
grant execute on function public.exam_review to authenticated;
