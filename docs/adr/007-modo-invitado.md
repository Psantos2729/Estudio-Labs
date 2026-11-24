# ADR-007: Modo invitado sin Supabase

Estado: aceptada (2026-11-24)

## Contexto

Se debe poder probar la app sin cuenta y sin configurar nada.

## Decisión

Si faltan las variables de entorno, la app funciona como invitado: solo M0 abierto y nada se guarda.

## Consecuencias

El desarrollo local funciona sin backend.
