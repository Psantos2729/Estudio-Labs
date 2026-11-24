-- Permisos de lectura explícitos. Los proyectos nuevos de Supabase ya no dan acceso automático
-- a las tablas nuevas, y sin esto la página no podía leer el progreso (todo salía bloqueado).
-- Solo SELECT: escribir sigue siendo exclusivo de las funciones del servidor, y RLS filtra filas.

grant select on public.modules to anon, authenticated;
grant select on public.profiles, public.module_mastery, public.practice_attempts, public.lesson_progress
  to authenticated;
