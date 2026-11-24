# ADR-010: Ningún archivo de más de 250 líneas

Estado: aceptada (2026-11-24)

## Contexto

Archivos largos son difíciles de leer, revisar y de cargar como contexto.

## Decisión

ESLint `max-lines` y `tools/check-lines.mjs` (lefthook y CI) rechazan cualquier archivo de más de 250 líneas. Excepciones solo en `tools/line-limit.config.json`, con motivo: archivos generados (lockfile, seed, graphify-out).

## Consecuencias

Obliga a dividir por responsabilidad desde el inicio.
