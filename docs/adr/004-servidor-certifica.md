# ADR-004: El navegador enseña, el servidor certifica

Estado: aceptada (2026-11-24)

## Contexto

Nadie debe poder pasar un módulo sin dominarlo, y el cliente se puede manipular.

## Decisión

El progreso solo cambia por funciones RPC security definer. El examen usa casos ocultos que el cliente nunca ve: el servidor manda entradas, el cliente devuelve salidas y `submit_exam` califica.

## Consecuencias

Las tablas de progreso no aceptan insert/update del cliente; las pruebas SQL lo verifican.
