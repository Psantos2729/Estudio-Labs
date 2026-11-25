-- Examen de dominio, parte 1 (fase 3, ADR-004 y ADR-006): banco oculto, intentos y start_exam.
-- El banco (enunciados, casos y respuestas) NO está en el repo: se carga con un .sql privado.
-- El navegador nunca lee el banco; solo recibe por start_exam las entradas y las preguntas,
-- jamás las salidas esperadas ni las respuestas. La calificación es submit_exam (migración 010).

create table public.exam_problems (
  id        text primary key check (id ~ '^M\d{2}-X\d{2}$'),
  module_id text not null references public.modules (id) on delete cascade,
  title     text not null,
  statement text not null
);

-- Un punto del examen: un caso oculto de un problema o una pregunta de razonamiento.
create table public.exam_items (
  id         bigint generated always as identity primary key,
  module_id  text not null references public.modules (id) on delete cascade,
  problem_id text references public.exam_problems (id) on delete cascade, -- solo casos
  stdin      text,          -- solo casos
  question   text,          -- solo preguntas
  options    text[],        -- solo preguntas
  answer     text not null, -- salida esperada o índice de la opción correcta: SECRETO
  check ((problem_id is not null and stdin is not null and question is null)
      or (problem_id is null and question is not null and cardinality(options) >= 2))
);

create index exam_items_module on public.exam_items (module_id);

alter table public.exam_problems enable row level security;
alter table public.exam_items enable row level security;
-- Sin políticas ni grants: ni el navegador ni un invitado pueden leer el banco.
revoke all on public.exam_problems, public.exam_items from public, anon, authenticated;

create table public.exam_attempts (
  id           bigint generated always as identity primary key,
  user_id      uuid not null references auth.users (id) on delete cascade,
  module_id    text not null references public.modules (id) on delete cascade,
  item_ids     bigint[] not null,
  started_at   timestamptz not null default now(),
  expires_at   timestamptz not null,
  submitted_at timestamptz,
  score        smallint check (score between 0 and 100),
  passed       boolean
);

create index exam_attempts_user_module on public.exam_attempts (user_id, module_id, started_at desc);

alter table public.exam_attempts enable row level security;
create policy "cada quien lee sus exámenes" on public.exam_attempts
  for select using (auth.uid() = user_id);
revoke insert, update, delete on public.exam_attempts from authenticated, anon;
grant select on public.exam_attempts to authenticated;

-- Arma lo que ve el estudiante: problemas con las entradas de sus casos y preguntas sin respuesta.
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
        'cases', (select jsonb_agg(jsonb_build_object('id', i.id, 'stdin', i.stdin) order by i.id)
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

-- Empieza (o retoma) el examen de un módulo: 2 problemas con 4 casos cada uno + 4 preguntas,
-- elegidos al azar del banco. 45 minutos. Si reprobaste, 1 hora de espera.
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
  where user_id = auth.uid() and module_id = p_module_id
    and submitted_at is null and expires_at > now();
  if found then
    return exam_payload(att); -- retomar tras recargar la página
  end if;

  -- Un intento vencido sin enviar cuenta como reprobado.
  select max(coalesce(submitted_at, expires_at)) + interval '1 hour' into wait_until
  from exam_attempts
  where user_id = auth.uid() and module_id = p_module_id and passed is not true;
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

revoke execute on function public.start_exam from public, anon;
grant execute on function public.start_exam to authenticated;
