-- Lecciones leídas (fase 2). Sirve para que "Continuar" sepa en qué lección vas.
-- El navegador solo LEE; marca una lección como leída únicamente con mark_lesson_read().

create table public.lesson_progress (
  user_id   uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null check (lesson_id ~ '^M\d{2}-L\d{2}$'),
  read_at   timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

create policy "cada quien lee sus lecciones" on public.lesson_progress
  for select using (auth.uid() = user_id);

revoke insert, update, delete on public.lesson_progress from authenticated, anon;

-- Marca la lección como leída para el usuario actual, solo si su módulo está abierto. Repetirlo no hace nada.
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
  insert into lesson_progress (user_id, lesson_id) values (auth.uid(), p_lesson_id)
  on conflict do nothing;
end;
$$;

revoke execute on function public.mark_lesson_read from public, anon;
grant execute on function public.mark_lesson_read to authenticated;
