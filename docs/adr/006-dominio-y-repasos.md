# ADR-006: Desbloqueo por dominio con 85% y repasos espaciados

Estado: aceptada (2026-11-24)

## Contexto

El progreso debe ser real y exigente.

## Decisión

Un módulo se domina con 85% o más en el examen. Si se reprueba hay 1 hora de espera (Paolo lo bajó de 24 h el 2026-11-25). Repasos a los 3, 7, 21 y 60 días; fallar uno reabre el módulo.

## Consecuencias

Más trabajo para el estudiante, pero el avance significa algo.

Implementación (fase 3): migración 009. El examen son 12 puntos sacados al azar del banco del módulo
(2 problemas con 4 casos ocultos cada uno y 4 preguntas de razonamiento), 45 minutos y sin pistas.
El banco no está en el repo: se carga en Supabase con un `.sql` privado.
