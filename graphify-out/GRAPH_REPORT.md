# Graph Report - estudio-labs  (2026-11-24)

## Corpus Check
- 73 files · ~9,676 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 3, .css 2, .example 1)

## Summary
- 372 nodes · 520 edges · 26 communities (23 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d1f67088`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- AuthProvider.tsx
- steps
- masteryView.ts
- Publicar pylab en Cloudflare
- compilerOptions
- line-limit.test.mjs
- scripts
- lint
- public.handle_new_user
- test-db.sh
- Continuar pylab en otra sesión
- steps
- pages.yml
- ADR-001: React + Vite + TypeScript en Cloudflare Pages
- ADR-002: Python en el navegador con Pyodide dentro de un Web Worker
- ADR-003: Supabase como base de datos y autenticación
- ADR-004: El navegador enseña, el servidor certifica
- ADR-005: Contenido como archivos en `content/`
- ADR-006: Desbloqueo por dominio con 85% y repasos espaciados
- ADR-007: Modo invitado sin Supabase
- ADR-008: Estado: TanStack Query para el servidor, Zustand para la interfaz
- ADR-009: ReactBits con carga diferida y movimiento reducido
- ADR-010: Ningún archivo de más de 250 líneas
- adr/README.md

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `Publicar pylab en Cloudflare` - 12 edges
3. `scripts` - 11 edges
4. `Continuar pylab en otra sesión` - 10 edges
5. `MapPage()` - 9 edges
6. `react` - 8 edges
7. `displayId()` - 8 edges
8. `App()` - 7 edges
9. `ModuleDef` - 7 edges
10. `useAuth()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `MapPage()`  [EXTRACTED]
  src/app/App.tsx → src/features/map/MapPage.tsx
- `useModuleViews()` --calls--> `useAuth()`  [EXTRACTED]
  src/features/map/useMastery.ts → src/features/auth/AuthProvider.tsx
- `GateCard()` --calls--> `Panel()`  [EXTRACTED]
  src/features/map/GateCard.tsx → src/ui/primitives/Panel.tsx
- `Props` --references--> `ModuleView`  [EXTRACTED]
  src/features/map/ModuleList.tsx → src/features/map/masteryView.ts
- `App()` --calls--> `Layout()`  [EXTRACTED]
  src/app/App.tsx → src/app/Layout.tsx

## Import Cycles
- None detected.

## Communities (26 total, 3 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.08
Nodes (35): zustand@^5.1.0, devDependencies, eslint@^9.39.5, @eslint/js@^9.39.5, eslint-plugin-react-hooks@^5.2.0, globals@^16.5.0, lefthook@^1.13.6, @types/node@^22.20.5 (+27 more)

### Community 1 - "AuthProvider.tsx"
Cohesion: 0.09
Nodes (31): dependencies, react@^19.3.1, react-dom@^19.3.1, react-router-dom@^7.18.7, @supabase/supabase-js@^2.119.2, @tanstack/react-query@^5.108.4, react, react-dom (+23 more)

### Community 2 - "steps"
Cohesion: 0.08
Nodes (28): runs-on, services, steps, DATABASE_URL, POSTGRES_DB, POSTGRES_PASSWORD, jobs, database (+20 more)

### Community 3 - "masteryView.ts"
Cohesion: 0.10
Nodes (29): ADR-0005, ADR-0008, files, MODULES, modules, root, BossChallenge, displayId() (+21 more)

### Community 4 - "Publicar pylab en Cloudflare"
Cohesion: 0.07
Nodes (26): 1.1 Crear el proyecto, 1.2 Crear las tablas, 1.3 Activar el inicio de sesión, 1.4 Copiar las llaves, 1.5 Ojo con el plan gratis, 1. Supabase (base de datos e inicio de sesión), 2. Publicar la web, Antes de empezar (+18 more)

### Community 5 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, baseUrl, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+10 more)

### Community 6 - "line-limit.test.mjs"
Cohesion: 0.18
Nodes (11): config, violations, countLines(), findViolations(), listFiles(), config, arr(), modules (+3 more)

### Community 7 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, check-lines, dev, lint, prepare, preview, seed (+3 more)

### Community 8 - "lint"
Cohesion: 0.22
Nodes (8): run, check-lines, lint, glob, run, pre-commit, commands, parallel

### Community 9 - "public.handle_new_user"
Cohesion: 0.22
Nodes (7): public.exercises, public.modules, public.profiles, public.module_mastery, on_auth_user_created, public.handle_new_user(), auth.users

### Community 11 - "Continuar pylab en otra sesión"
Cohesion: 0.08
Nodes (22): Comandos, Contexto con graphify, Dónde está cada cosa, Reglas del proyecto pylab (Estudio-Labs), Reglas que no se rompen, Comandos útiles, Continuar pylab en otra sesión, Cosas que ya fallaron (no repetir) (+14 more)

### Community 13 - "steps"
Cohesion: 0.10
Nodes (22): runs-on, steps, environment, needs, runs-on, steps, VITE_BASE, VITE_SUPABASE_ANON_KEY (+14 more)

### Community 14 - "pages.yml"
Cohesion: 0.15
Nodes (12): concurrency, cancel-in-progress, group, name, on, push, workflow_dispatch, permissions (+4 more)

### Community 15 - "ADR-001: React + Vite + TypeScript en Cloudflare Pages"
Cohesion: 0.40
Nodes (4): ADR-001: React + Vite + TypeScript en Cloudflare Pages, Consecuencias, Contexto, Decisión

### Community 16 - "ADR-002: Python en el navegador con Pyodide dentro de un Web Worker"
Cohesion: 0.40
Nodes (4): ADR-002: Python en el navegador con Pyodide dentro de un Web Worker, Consecuencias, Contexto, Decisión

### Community 17 - "ADR-003: Supabase como base de datos y autenticación"
Cohesion: 0.40
Nodes (4): ADR-003: Supabase como base de datos y autenticación, Consecuencias, Contexto, Decisión

### Community 18 - "ADR-004: El navegador enseña, el servidor certifica"
Cohesion: 0.40
Nodes (4): ADR-004: El navegador enseña, el servidor certifica, Consecuencias, Contexto, Decisión

### Community 19 - "ADR-005: Contenido como archivos en `content/`"
Cohesion: 0.40
Nodes (4): ADR-005: Contenido como archivos en `content/`, Consecuencias, Contexto, Decisión

### Community 20 - "ADR-006: Desbloqueo por dominio con 85% y repasos espaciados"
Cohesion: 0.40
Nodes (4): ADR-006: Desbloqueo por dominio con 85% y repasos espaciados, Consecuencias, Contexto, Decisión

### Community 21 - "ADR-007: Modo invitado sin Supabase"
Cohesion: 0.40
Nodes (4): ADR-007: Modo invitado sin Supabase, Consecuencias, Contexto, Decisión

### Community 22 - "ADR-008: Estado: TanStack Query para el servidor, Zustand para la interfaz"
Cohesion: 0.40
Nodes (4): ADR-008: Estado: TanStack Query para el servidor, Zustand para la interfaz, Consecuencias, Contexto, Decisión

### Community 23 - "ADR-009: ReactBits con carga diferida y movimiento reducido"
Cohesion: 0.40
Nodes (4): ADR-009: ReactBits con carga diferida y movimiento reducido, Consecuencias, Contexto, Decisión

### Community 24 - "ADR-010: Ningún archivo de más de 250 líneas"
Cohesion: 0.40
Nodes (4): ADR-010: Ningún archivo de más de 250 líneas, Consecuencias, Contexto, Decisión

## Knowledge Gaps
- **4 isolated node(s):** `ADR-0005`, `ADR-0008`, `ADR-0006`, `ADR-0006`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 177 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `package.json` to `AuthProvider.tsx`, `masteryView.ts`, `line-limit.test.mjs`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `ADR-0005`, `ADR-0008`, `ADR-0006` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07557354925775979 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Should `AuthProvider.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Why does `react` connect `AuthProvider.tsx` to `package.json`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Should `steps` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._