# ADR-008: Estado: TanStack Query para el servidor, Zustand para la interfaz

Estado: aceptada (2026-11-24)

## Contexto

Hay datos remotos (progreso) y estado local pequeño (selección, editor).

## Decisión

TanStack Query para todo lo que viene de Supabase; Zustand para estado de interfaz.

## Consecuencias

Sin Redux ni boilerplate extra.
