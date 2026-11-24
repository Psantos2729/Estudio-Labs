# Graph Report - estudio-labs  (2026-11-24)

## Corpus Check
- 86 files · ~12,173 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 3, .css 3, .example 1)

## Summary
- 428 nodes · 650 edges · 18 communities (16 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3260d71b`
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
- ¿Qué es un programa?
- lint
- public.handle_new_user
- test-db.sh
- Continuar pylab en otra sesión
- steps
- check.ts
- adr/README.md
- scripts
- lessons.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `Publicar pylab en Cloudflare` - 12 edges
3. `scripts` - 11 edges
4. `react` - 10 edges
5. `displayId()` - 10 edges
6. `LessonPage()` - 10 edges
7. `Continuar pylab en otra sesión` - 10 edges
8. `vitest` - 9 edges
9. `MapPage()` - 9 edges
10. `App()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Consecuencias` --references--> `ExerciseDef`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/types.ts
- `Consecuencias` --references--> `validateExercise()`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/validate.ts
- `App()` --calls--> `LessonPage()`  [EXTRACTED]
  src/app/App.tsx → src/features/lesson/LessonPage.tsx
- `App()` --calls--> `MapPage()`  [EXTRACTED]
  src/app/App.tsx → src/features/map/MapPage.tsx
- `ModuleDetail()` --calls--> `lessonsOf()`  [EXTRACTED]
  src/features/map/ModuleDetail.tsx → src/content/lessons.ts

## Import Cycles
- None detected.

## Communities (18 total, 2 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.06
Nodes (45): dependencies, marked@18.2.0, pyodide@314.0.7, react@^19.3.1, react-dom@^19.3.1, react-router-dom@^7.18.7, @tanstack/react-query@^5.108.4, zustand@^5.1.0 (+37 more)

### Community 1 - "AuthProvider.tsx"
Cohesion: 0.10
Nodes (24): @supabase/supabase-js@^2.119.2, react, react-router-dom, @supabase/supabase-js, App(), Layout(), Providers(), AuthContext (+16 more)

### Community 2 - "steps"
Cohesion: 0.08
Nodes (28): runs-on, services, steps, DATABASE_URL, POSTGRES_DB, POSTGRES_PASSWORD, jobs, database (+20 more)

### Community 3 - "masteryView.ts"
Cohesion: 0.10
Nodes (30): ADR-0005, ADR-0008, files, MODULES, modules, root, BossChallenge, displayId() (+22 more)

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
Nodes (23): ADR-0002, pyodide, getLesson(), lessonsOf(), TestCase, Block, splitBlocks(), LessonPage() (+15 more)

### Community 15 - "adr/README.md"
Cohesion: 0.04
Nodes (37): ADR-001: React + Vite + TypeScript en Cloudflare Pages, Consecuencias, Contexto, Decisión, ADR-002: Python en el navegador con Pyodide dentro de un Web Worker, Consecuencias, Contexto, Decisión (+29 more)

### Community 16 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, check-lines, dev, lint, prepare, preview, seed (+3 more)

### Community 19 - "lessons.ts"
Cohesion: 0.13
Nodes (13): ADR-005: Contenido como archivos en `content/`, Consecuencias, Contexto, Decisión, exerciseFiles, EXERCISES, lessonFiles, LESSONS (+5 more)

## Knowledge Gaps
- **5 isolated node(s):** `ADR-0005`, `ADR-0008`, `ADR-0006`, `ADR-0002`, `ADR-0006`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 195 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ExerciseDef` connect `lessons.ts` to `masteryView.ts`?**
  _High betweenness centrality (0.187) - this node is a cross-community bridge._
- **What connects `ADR-0005`, `ADR-0008`, `ADR-0006` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05952380952380952 - nodes in this community are weakly interconnected._
- **Should `AuthProvider.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10384615384615385 - nodes in this community are weakly interconnected._
- **Should `steps` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._
- **Should `masteryView.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09830866807610994 - nodes in this community are weakly interconnected._
- **Should `Publicar pylab en Cloudflare` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._