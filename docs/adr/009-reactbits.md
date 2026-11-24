# ADR-009: ReactBits con carga diferida y movimiento reducido

Estado: aceptada (2026-11-24)

## Contexto

Se quiere una interfaz viva sin afectar rendimiento ni accesibilidad.

## Decisión

Los componentes de ReactBits se copian a `src/ui/reactbits`, se cargan con `lazy` y se apagan con `prefers-reduced-motion`.

## Consecuencias

Las animaciones son decoración, nunca bloquean el aprendizaje.
