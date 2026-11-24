# ADR-001: React + Vite + TypeScript en Cloudflare Pages

Estado: aceptada (2026-11-24)

## Contexto

La plataforma necesita correr gratis, cargar rápido y ser fácil de mantener por un estudiante.

## Decisión

SPA con React 19, Vite 6 y TypeScript estricto. Se publica como sitio estático en Cloudflare Pages (plan gratis).

## Consecuencias

Sin servidor propio que mantener. Todo lo que deba ser confiable vive en Supabase (ADR-003).
