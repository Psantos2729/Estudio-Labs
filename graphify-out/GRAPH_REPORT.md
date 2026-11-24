# Graph Report - estudio-labs  (2026-11-24)

## Corpus Check
- 104 files · ~16,261 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: .css 4, (none) 3, .example 1)

## Summary
- 499 nodes · 807 edges · 22 communities (19 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cb488387`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Variables y tipos
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
- package.json
- Leer datos con input
- Mostrar resultados con f-strings
- Operadores aritméticos

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `react` - 15 edges
3. `Button()` - 13 edges
4. `displayId()` - 12 edges
5. `Publicar pylab en Cloudflare` - 12 edges
6. `scripts` - 11 edges
7. `ExerciseDef` - 10 edges
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
- `ExercisePage()` --calls--> `ExerciseFlow()`  [EXTRACTED]
  src/features/exercise/ExercisePage.tsx → src/features/exercise/ExerciseFlow.tsx
- `ExercisePage()` --calls--> `displayId()`  [EXTRACTED]
  src/features/exercise/ExercisePage.tsx → src/content/types.ts

## Import Cycles
- None detected.

## Communities (22 total, 3 thin omitted)

### Community 0 - "Variables y tipos"
Cohesion: 0.40
Nodes (4): El orden importa, Los tres tipos del módulo, Nombres de variables, Variables y tipos

### Community 1 - "AuthProvider.tsx"
Cohesion: 0.09
Nodes (27): react-router-dom@^7.18.7, @supabase/supabase-js@^2.119.2, @tanstack/react-query@^5.108.4, react-router-dom, @supabase/supabase-js, @tanstack/react-query, App(), Layout() (+19 more)

### Community 2 - "steps"
Cohesion: 0.08
Nodes (28): runs-on, services, steps, DATABASE_URL, POSTGRES_DB, POSTGRES_PASSWORD, jobs, database (+20 more)

### Community 3 - "masteryView.ts"
Cohesion: 0.07
Nodes (44): ADR-0005, ADR-0008, exerciseFiles, EXERCISES, exercisesOf(), getLesson(), lessonFiles, LESSONS (+36 more)

### Community 4 - "Publicar pylab en Cloudflare"
Cohesion: 0.07
Nodes (26): 1.1 Crear el proyecto, 1.2 Crear las tablas, 1.3 Activar el inicio de sesión, 1.4 Copiar las llaves, 1.5 Ojo con el plan gratis, 1. Supabase (base de datos e inicio de sesión), 2. Publicar la web, Antes de empezar (+18 more)

### Community 5 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, baseUrl, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+10 more)

### Community 6 - "line-limit.test.mjs"
Cohesion: 0.10
Nodes (19): ADR-005: Contenido como archivos en `content/`, Consecuencias, Contexto, Decisión, vitest@^3.2.7, vitest, root, validateExercise() (+11 more)

### Community 7 - "¿Qué es un programa?"
Cohesion: 0.50
Nodes (3): Antes de seguir, `print` muestra cosas en pantalla, ¿Qué es un programa?

### Community 8 - "lint"
Cohesion: 0.22
Nodes (8): run, check-lines, lint, glob, run, pre-commit, commands, parallel

### Community 9 - "public.handle_new_user"
Cohesion: 0.13
Nodes (10): public.exercises, public.modules, public.profiles, public.module_mastery, on_auth_user_created, public.handle_new_user(), practice_attempts_user_exercise, public.practice_attempts (+2 more)

### Community 11 - "Continuar pylab en otra sesión"
Cohesion: 0.08
Nodes (22): Comandos, Contexto con graphify, Dónde está cada cosa, Reglas del proyecto pylab (Estudio-Labs), Reglas que no se rompen, Comandos útiles, Continuar pylab en otra sesión, Cosas que ya fallaron (no repetir) (+14 more)

### Community 13 - "steps"
Cohesion: 0.06
Nodes (34): runs-on, steps, concurrency, cancel-in-progress, group, environment, needs, runs-on (+26 more)

### Community 14 - "check.ts"
Cohesion: 0.08
Nodes (36): ADR-0002, pyodide, react, ExerciseDef, TestCase, CodeEditor(), Props, CodeStep() (+28 more)

### Community 15 - "adr/README.md"
Cohesion: 0.04
Nodes (37): ADR-001: React + Vite + TypeScript en Cloudflare Pages, Consecuencias, Contexto, Decisión, ADR-002: Python en el navegador con Pyodide dentro de un Web Worker, Consecuencias, Contexto, Decisión (+29 more)

### Community 16 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, check-lines, dev, lint, prepare, preview, seed (+3 more)

### Community 17 - "package.json"
Cohesion: 0.05
Nodes (50): dependencies, codemirror@6.0.2, @codemirror/commands@6.11.1, @codemirror/lang-python@6.2.1, @codemirror/theme-one-dark@6.1.3, @codemirror/view@6.43.15, marked@18.2.0, pyodide@314.0.7 (+42 more)

### Community 18 - "Leer datos con input"
Cohesion: 0.40
Nodes (4): Convertir entre tipos, input() siempre devuelve texto, Leer datos con input(), Un input() por cada dato

### Community 21 - "Mostrar resultados con f-strings"
Cohesion: 0.40
Nodes (4): Controlar los decimales, Dentro de las llaves puede ir una cuenta, Mostrar resultados con f-strings, print con comas vs. f-string

### Community 30 - "Operadores aritméticos"
Cohesion: 0.50
Nodes (3): Operadores aritméticos, Orden de las operaciones, Para qué sirven // y %

## Knowledge Gaps
- **5 isolated node(s):** `ADR-0002`, `ADR-0006`, `ADR-0005`, `ADR-0008`, `ADR-0006`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 224 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Consecuencias` connect `line-limit.test.mjs` to `check.ts`?**
  _High betweenness centrality (0.214) - this node is a cross-community bridge._
- **What connects `ADR-0002`, `ADR-0006`, `ADR-0005` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AuthProvider.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08686868686868687 - nodes in this community are weakly interconnected._
- **Why does `ExerciseDef` connect `check.ts` to `masteryView.ts`, `line-limit.test.mjs`?**
  _High betweenness centrality (0.196) - this node is a cross-community bridge._
- **Should `steps` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._
- **Should `masteryView.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06980433632998413 - nodes in this community are weakly interconnected._
- **Should `Publicar pylab en Cloudflare` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._