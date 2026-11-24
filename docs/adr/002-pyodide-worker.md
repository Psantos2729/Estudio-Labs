# ADR-002: Python en el navegador con Pyodide dentro de un Web Worker

Estado: aceptada (2026-11-24)

## Contexto

Los ejercicios se escriben en Python y no hay presupuesto para servidores que ejecuten código.

## Decisión

Pyodide corre en un Web Worker. Cada ejecución tiene 5 s de límite; si se pasa, el worker se termina y se crea otro.

## Consecuencias

Un bucle infinito no congela la página. La primera carga de Pyodide pesa unos 10 MB, así que se carga solo al abrir un ejercicio.
