-- Estado de cada módulo por estudiante. Decide si se puede avanzar:
-- el navegador solo lo LEE. Lo escriben funciones security definer (start/submit_exam, fase 3).

create type public.mastery_status as enum
  ('locked', 'available', 'in_progress', 'mastered', 'reopened');

create table public.module_mastery (
  user_id        uuid not null references auth.users (id) on delete cascade,
  module_id      text not null references public.modules (id) on delete cascade,
  status         public.mastery_status not null default 'locked',
  best_score     smallint check (best_score between 0 and 100),
  mastered_at    timestamptz,
  next_review_at timestamptz,
  updated_at     timestamptz not null default now(),
  primary key (user_id, module_id)
);

alter table public.module_mastery enable row level security;

create policy "cada quien lee su progreso" on public.module_mastery
  for select using (auth.uid() = user_id);

-- Sin políticas de insert/update/delete: desde el navegador es imposible escribir.
revoke insert, update, delete on public.module_mastery from authenticated, anon;
