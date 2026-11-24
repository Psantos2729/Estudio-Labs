-- Catálogo: módulos y ejercicios. Se llena desde content/ con `npm run seed` (ADR-005).
-- Lectura pública; nadie escribe desde el navegador.

create table public.modules (
  id            text primary key check (id ~ '^M[0-9]{2}$'),
  position      smallint not null unique,
  slug          text not null unique,
  title         text not null,
  summary       text not null,
  prerequisites text[] not null default '{}',
  pass_score    smallint not null default 85 check (pass_score between 1 and 100),
  review_days   smallint[] not null default '{3,7,21,60}'
);

create type public.exercise_kind as enum
  ('concept', 'guided', 'real_task', 'lab', 'boss', 'exam', 'review');

create table public.exercises (
  id         text primary key,                 -- 'M06-lab35'
  module_id  text not null references public.modules (id) on delete cascade,
  kind       public.exercise_kind not null,
  position   smallint not null,
  difficulty smallint not null check (difficulty between 1 and 5),
  source     text,                             -- 'PDF C5 #35' o 'Parentesis.py'
  xp_reward  integer not null default 0,
  required   boolean not null default true,
  unique (module_id, position)
);

alter table public.modules enable row level security;
alter table public.exercises enable row level security;

create policy "catálogo visible para todos" on public.modules
  for select using (true);
create policy "catálogo visible para todos" on public.exercises
  for select using (true);
