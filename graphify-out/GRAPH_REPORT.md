# Graph Report - estudio-labs  (2026-11-24)

## Corpus Check
- 92 files · ~13,652 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: .css 4, (none) 3, .example 1)

## Summary
- 462 nodes · 751 edges · 30 communities (28 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `35a4dfc0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- AuthProvider.tsx
- steps
- masteryView.ts
- Publicar pylab en Cloudflare
- compilerOptions
- line-limit.test.mjs
- ¿Qué es un programa?
- lint
- public.handle_new_user
- test-db.sh
- Continuar pylab en otra sesión
- steps
- check.ts
- ADR-001: React + Vite + TypeScript en Cloudflare Pages
- scripts
- dependencies
- package.json
- adr/README.md
- supabase.ts
- vite
- ADR-002: Python en el navegador con Pyodide dentro de un Web Worker
- ADR-003: Supabase como base de datos y autenticación
- ADR-004: El navegador enseña, el servidor certifica
- ADR-006: Desbloqueo por dominio con 85% y repasos espaciados
- ADR-007: Modo invitado sin Supabase
- ADR-008: Estado: TanStack Query para el servidor, Zustand para la interfaz
- ADR-009: ReactBits con carga diferida y movimiento reducido
- ADR-010: Ningún archivo de más de 250 líneas

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `react` - 14 edges
3. `Button()` - 13 edges
4. `displayId()` - 12 edges
5. `Publicar pylab en Cloudflare` - 12 edges
6. `scripts` - 11 edges
7. `ExercisePage()` - 10 edges
8. `LessonPage()` - 10 edges
9. `useModuleViews()` - 10 edges
10. `Continuar pylab en otra sesión` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Consecuencias` --references--> `ExerciseDef`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/types.ts
- `Consecuencias` --references--> `validateExercise()`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/validate.ts
- `run()` --calls--> `runPython()`  [EXTRACTED]
  src/features/lesson/RunnableCode.tsx → src/features/runner/runner.ts
- `App()` --calls--> `MapPage()`  [EXTRACTED]
  src/app/App.tsx → src/features/map/MapPage.tsx
- `LessonPage()` --calls--> `lessonsOf()`  [EXTRACTED]
  src/features/lesson/LessonPage.tsx → src/content/lessons.ts

## Import Cycles
- None detected.

## Communities (30 total, 2 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.15
Nodes (15): devDependencies, eslint@^9.39.5, @eslint/js@^9.39.5, eslint-plugin-react-hooks@^5.2.0, globals@^16.5.0, typescript@~5.8.3, typescript-eslint@^8.74.0, wrangler@^4.168.0 (+7 more)

### Community 1 - "AuthProvider.tsx"
Cohesion: 0.08
Nodes (33): marked@18.2.0, marked, react, react-router-dom, App(), Layout(), Providers(), getExercise() (+25 more)

### Community 2 - "steps"
Cohesion: 0.08
Nodes (28): runs-on, services, steps, DATABASE_URL, POSTGRES_DB, POSTGRES_PASSWORD, jobs, database (+20 more)

### Community 3 - "masteryView.ts"
Cohesion: 0.07
Nodes (44): ADR-0005, ADR-0008, Consecuencias, vitest@^3.2.7, vitest, exerciseFiles, EXERCISES, exercisesOf() (+36 more)

### Community 4 - "Publicar pylab en Cloudflare"
Cohesion: 0.07
Nodes (26): 1.1 Crear el proyecto, 1.2 Crear las tablas, 1.3 Activar el inicio de sesión, 1.4 Copiar las llaves, 1.5 Ojo con el plan gratis, 1. Supabase (base de datos e inicio de sesión), 2. Publicar la web, Antes de empezar (+18 more)

### Community 5 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, baseUrl, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+10 more)

### Community 6 - "line-limit.test.mjs"
Cohesion: 0.18
Nodes (11): config, violations, countLines(), findViolations(), listFiles(), config, arr(), modules (+3 more)

### Community 7 - "¿Qué es un programa?"
Cohesion: 0.50
Nodes (3): Antes de seguir, `print` muestra cosas en pantalla, ¿Qué es un programa?

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
Cohesion: 0.06
Nodes (34): runs-on, steps, concurrency, cancel-in-progress, group, environment, needs, runs-on (+26 more)

### Community 14 - "check.ts"
Cohesion: 0.11
Nodes (20): ADR-0002, pyodide, TestCase, CodeEditor(), Props, CodeStep(), TestResults(), runTests() (+12 more)

### Community 15 - "ADR-001: React + Vite + TypeScript en Cloudflare Pages"
Cohesion: 0.40
Nodes (4): ADR-001: React + Vite + TypeScript en Cloudflare Pages, Consecuencias, Contexto, Decisión

### Community 16 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, check-lines, dev, lint, prepare, preview, seed (+3 more)

### Community 17 - "dependencies"
Cohesion: 0.10
Nodes (20): dependencies, codemirror@6.0.2, @codemirror/commands@6.11.1, @codemirror/lang-python@6.2.1, @codemirror/theme-one-dark@6.1.3, @codemirror/view@6.43.15, pyodide@314.0.7, react@^19.3.1 (+12 more)

### Community 18 - "package.json"
Cohesion: 0.15
Nodes (12): lefthook@^1.13.6, @types/node@^22.20.5, @types/react@^19.3.0, @types/react-dom@^19.3.0, name, private, type, version (+4 more)

### Community 19 - "adr/README.md"
Cohesion: 0.33
Nodes (4): ADR-005: Contenido como archivos en `content/`, Contexto, Decisión, Decisiones de arquitectura (ADR)

### Community 20 - "supabase.ts"
Cohesion: 0.22
Nodes (8): @supabase/supabase-js@^2.119.2, @supabase/supabase-js, anonKey, isSupabaseConfigured, supabase, ADR-0006, url, normalizeSupabaseUrl()

### Community 21 - "vite"
Cohesion: 0.33
Nodes (4): vite@^6.4.6, @vitejs/plugin-react@^4.7.0, vite, @vitejs/plugin-react

### Community 22 - "ADR-002: Python en el navegador con Pyodide dentro de un Web Worker"
Cohesion: 0.40
Nodes (4): ADR-002: Python en el navegador con Pyodide dentro de un Web Worker, Consecuencias, Contexto, Decisión

### Community 23 - "ADR-003: Supabase como base de datos y autenticación"
Cohesion: 0.40
Nodes (4): ADR-003: Supabase como base de datos y autenticación, Consecuencias, Contexto, Decisión

### Community 24 - "ADR-004: El navegador enseña, el servidor certifica"
Cohesion: 0.40
Nodes (4): ADR-004: El navegador enseña, el servidor certifica, Consecuencias, Contexto, Decisión

### Community 25 - "ADR-006: Desbloqueo por dominio con 85% y repasos espaciados"
Cohesion: 0.40
Nodes (4): ADR-006: Desbloqueo por dominio con 85% y repasos espaciados, Consecuencias, Contexto, Decisión

### Community 26 - "ADR-007: Modo invitado sin Supabase"
Cohesion: 0.40
Nodes (4): ADR-007: Modo invitado sin Supabase, Consecuencias, Contexto, Decisión

### Community 27 - "ADR-008: Estado: TanStack Query para el servidor, Zustand para la interfaz"
Cohesion: 0.40
Nodes (4): ADR-008: Estado: TanStack Query para el servidor, Zustand para la interfaz, Consecuencias, Contexto, Decisión

### Community 28 - "ADR-009: ReactBits con carga diferida y movimiento reducido"
Cohesion: 0.40
Nodes (4): ADR-009: ReactBits con carga diferida y movimiento reducido, Consecuencias, Contexto, Decisión

### Community 29 - "ADR-010: Ningún archivo de más de 250 líneas"
Cohesion: 0.40
Nodes (4): ADR-010: Ningún archivo de más de 250 líneas, Consecuencias, Contexto, Decisión

## Knowledge Gaps
- **5 isolated node(s):** `ADR-0005`, `ADR-0008`, `ADR-0006`, `ADR-0002`, `ADR-0006`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 203 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-005: Contenido como archivos en `content/`` connect `adr/README.md` to `masteryView.ts`?**
  _High betweenness centrality (0.241) - this node is a cross-community bridge._
- **What connects `ADR-0005`, `ADR-0008`, `ADR-0006` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AuthProvider.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08385744234800839 - nodes in this community are weakly interconnected._
- **Why does `Consecuencias` connect `masteryView.ts` to `adr/README.md`?**
  _High betweenness centrality (0.241) - this node is a cross-community bridge._
- **Should `steps` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._
- **Why does `ExerciseDef` connect `masteryView.ts` to `AuthProvider.tsx`, `check.ts`?**
  _High betweenness centrality (0.214) - this node is a cross-community bridge._
- **Should `masteryView.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06939890710382514 - nodes in this community are weakly interconnected._