-- Intentos de práctica (fase 2). Es práctica, no certificación (ADR-004): el navegador corre
-- las pruebas públicas y reporta cuántas pasó. El dominio lo decide el examen en el servidor (fase 3).
-- El navegador solo LEE sus intentos; escribe únicamente por record_practice().

create table public.practice_attempts (
  id           bigint generated always as identity primary key,
  user_id      uuid not null references auth.users (id) on delete cascade,
  exercise_id  text not null check (exercise_id ~ '^M\d{2}-E\d{2}$'),
  code         text not null check (length(code) <= 20000),
  notes        jsonb not null default '{}' check (length(notes::text) <= 20000), -- análisis y pseudocódigo
  tests_passed smallint not null,
  tests_total  smallint not null,
  created_at   timestamptz not null default now(),
  check (tests_total between 1 and 100 and tests_passed between 0 and tests_total)
);

create index practice_attempts_user_exercise on public.practice_attempts (user_id, exercise_id, created_at desc);

alter table public.practice_attempts enable row level security;

create policy "cada quien lee sus intentos" on public.practice_attempts
  for select using (auth.uid() = user_id);

revoke insert, update, delete on public.practice_attempts from authenticated, anon;

-- Guarda un intento del usuario actual, solo si el módulo del ejercicio ya está abierto para él.
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
  insert into practice_attempts (user_id, exercise_id, code, notes, tests_passed, tests_total)
  values (auth.uid(), p_exercise_id, p_code, coalesce(p_notes, '{}'), p_tests_passed, p_tests_total)
  returning id into new_id;
  return new_id;
end;
$$;

revoke execute on function public.record_practice from public, anon;
grant execute on function public.record_practice to authenticated;
