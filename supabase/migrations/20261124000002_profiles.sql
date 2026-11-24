-- Perfil de cada estudiante (1 a 1 con auth.users).
-- El dueño lo lee y puede cambiar su nombre; XP y racha solo los cambia el servidor.

create table public.profiles (
  id             uuid primary key references auth.users (id) on delete cascade,
  display_name   text not null default '' check (char_length(display_name) <= 60),
  role           text not null default 'student' check (role in ('student', 'admin')),
  xp             integer not null default 0,
  streak_days    integer not null default 0,
  last_active_on date,
  created_at     timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "cada quien lee su perfil" on public.profiles
  for select using (auth.uid() = id);

create policy "cada quien cambia su nombre" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Solo display_name es editable por el usuario; el resto lo protege este grant.
revoke update on public.profiles from authenticated, anon;
grant update (display_name) on public.profiles to authenticated;
