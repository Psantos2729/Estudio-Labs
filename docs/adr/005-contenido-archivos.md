# ADR-005: Contenido como archivos en `content/`

Estado: aceptada (2026-11-24)

## Contexto

Lecciones y ejercicios cambian seguido y deben revisarse en PRs.

## Decisión

Cada módulo es una carpeta con `module.json` (y luego lecciones y ejercicios). `tools/seed-catalog.mjs` genera el catálogo SQL.

## Consecuencias

Las soluciones y casos ocultos van en `private/`, que nunca se sube (el repo es público).
