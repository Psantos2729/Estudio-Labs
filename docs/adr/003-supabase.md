# ADR-003: Supabase como base de datos y autenticación

Estado: aceptada (2026-11-24)

## Contexto

Hace falta guardar progreso, intentos e historial por usuario, con inicio de sesión, sin costo.

## Decisión

Supabase (Postgres + Auth). Inicio de sesión con Google y enlace mágico. Seguridad por RLS en cada tabla.

## Consecuencias

El plan gratis pausa el proyecto tras 7 días sin uso; se reactiva desde el panel.
