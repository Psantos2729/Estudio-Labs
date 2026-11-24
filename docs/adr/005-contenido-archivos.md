# ADR-005: Contenido como archivos en `content/`

Estado: aceptada (2026-11-24)

## Contexto

Lecciones y ejercicios cambian seguido y deben revisarse en PRs.

## Decisión

Cada módulo es una carpeta con `module.json` (y luego lecciones y ejercicios). `tools/seed-catalog.mjs` genera el catálogo SQL.

## Consecuencias

Las soluciones y casos ocultos van en `private/`, que nunca se sube (el repo es público).

Formato (fase 2): `lessons/NN-nombre.md` empieza con `# Título`; `exercises/ENN.json` sigue `ExerciseDef`
(`src/content/types.ts`) y lo valida `validateExercise`. Solo pruebas públicas; las ocultas van a la base.
