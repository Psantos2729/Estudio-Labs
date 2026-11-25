# Graph Report - estudio-labs  (2026-11-25)

## Corpus Check
- 144 files · ~27,734 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: .css 6, (none) 3, .example 1)

## Summary
- 631 nodes · 1127 edges · 46 communities (37 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `23859f5c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Variables y tipos
- ExerciseFlow.tsx
- steps
- App.tsx
- Publicar pylab en Cloudflare
- compilerOptions
- exam-bank.mjs
- ¿Qué es un programa?
- lint
- public.handle_new_user
- test-db.sh
- Continuar pylab en otra sesión
- steps
- ExamPage.tsx
- ADR-001: React + Vite + TypeScript en Cloudflare Pages
- scripts
- package.json
- Leer datos con input
- Porcentajes y descuentos
- content/types.ts
- Tomar decisiones con if y else
- Más de dos caminos con elif
- Combinar condiciones: and, or, not
- División entera (//) y residuo (%)
- Mostrar resultados con f-strings
- dependencies
- Operadores aritméticos
- eslint.config.js
- line-limit.test.mjs
- package.json
- adr/README.md
- ADR-002: Python en el navegador con Pyodide dentro de un Web Worker
- ADR-003: Supabase como base de datos y autenticación
- ADR-004: El navegador enseña, el servidor certifica
- ADR-006: Desbloqueo por dominio con 85% y repasos espaciados
- ADR-007: Modo invitado sin Supabase
- ADR-008: Estado: TanStack Query para el servidor, Zustand para la interfaz
- ADR-009: ReactBits con carga diferida y movimiento reducido
- ADR-010: Ningún archivo de más de 250 líneas

## God Nodes (most connected - your core abstractions)
1. `Button()` - 19 edges
2. `react` - 19 edges
3. `compilerOptions` - 17 edges
4. `displayId()` - 16 edges
5. `useAuth()` - 15 edges
6. `HomePage()` - 14 edges
7. `useModuleViews()` - 14 edges
8. `public.submit_exam()` - 13 edges
9. `runPython()` - 13 edges
10. `react-router-dom` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Consecuencias` --references--> `ExerciseDef`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/types.ts
- `Consecuencias` --references--> `validateExercise()`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/validate.ts
- `run()` --calls--> `execute()`  [EXTRACTED]
  tools/exam-bank.mjs → src/features/runner/execute.ts
- `Layout()` --calls--> `Button()`  [EXTRACTED]
  src/app/Layout.tsx → src/ui/primitives/Button.tsx
- `LoginPage()` --calls--> `Button()`  [EXTRACTED]
  src/features/auth/LoginPage.tsx → src/ui/primitives/Button.tsx

## Import Cycles
- None detected.

## Communities (46 total, 9 thin omitted)

### Community 0 - "Variables y tipos"
Cohesion: 0.40
Nodes (4): El orden importa, Los tres tipos del módulo, Nombres de variables, Variables y tipos

### Community 1 - "ExerciseFlow.tsx"
Cohesion: 0.07
Nodes (42): marked, react, getExercise(), getLesson(), TestCase, CodeEditor(), Props, CodeStep() (+34 more)

### Community 2 - "steps"
Cohesion: 0.08
Nodes (28): runs-on, services, steps, DATABASE_URL, POSTGRES_DB, POSTGRES_PASSWORD, jobs, database (+20 more)

### Community 3 - "App.tsx"
Cohesion: 0.09
Nodes (27): @supabase/supabase-js@^2.119.2, @tanstack/react-query@^5.108.4, react-router-dom, @supabase/supabase-js, @tanstack/react-query, App(), Layout(), Providers() (+19 more)

### Community 4 - "Publicar pylab en Cloudflare"
Cohesion: 0.07
Nodes (26): 1.1 Crear el proyecto, 1.2 Crear las tablas, 1.3 Activar el inicio de sesión, 1.4 Copiar las llaves, 1.5 Ojo con el plan gratis, 1. Supabase (base de datos e inicio de sesión), 2. Publicar la web, Antes de empezar (+18 more)

### Community 5 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, baseUrl, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+10 more)

### Community 6 - "exam-bank.mjs"
Cohesion: 0.15
Nodes (13): ADR-0002, ADR-0006, pyodide, mod(), cleanTraceback(), execute(), ready, arr() (+5 more)

### Community 7 - "¿Qué es un programa?"
Cohesion: 0.50
Nodes (3): Antes de seguir, `print` muestra cosas en pantalla, ¿Qué es un programa?

### Community 8 - "lint"
Cohesion: 0.22
Nodes (8): run, check-lines, lint, glob, run, pre-commit, commands, parallel

### Community 9 - "public.handle_new_user"
Cohesion: 0.07
Nodes (22): public.exercises, public.modules, public.profiles, public.module_mastery, on_auth_user_created, public.handle_new_user(), practice_attempts_user_exercise, public.practice_attempts (+14 more)

### Community 11 - "Continuar pylab en otra sesión"
Cohesion: 0.08
Nodes (21): Comandos, Contexto con graphify, Dónde está cada cosa, Reglas del proyecto pylab (Estudio-Labs), Reglas que no se rompen, Banco oculto del examen, Comandos útiles, Continuar pylab en otra sesión (+13 more)

### Community 13 - "steps"
Cohesion: 0.06
Nodes (34): runs-on, steps, concurrency, cancel-in-progress, group, environment, needs, runs-on (+26 more)

### Community 14 - "ExamPage.tsx"
Cohesion: 0.15
Nodes (18): ADR-0004, buildAnswers(), Run, exam, ExamProblemCard(), ExamQuestions(), Draft, ExamRun() (+10 more)

### Community 15 - "ADR-001: React + Vite + TypeScript en Cloudflare Pages"
Cohesion: 0.40
Nodes (4): ADR-001: React + Vite + TypeScript en Cloudflare Pages, Consecuencias, Contexto, Decisión

### Community 16 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, check-lines, dev, lint, prepare, preview, seed (+3 more)

### Community 17 - "package.json"
Cohesion: 0.13
Nodes (14): devDependencies, eslint@^9.39.5, lefthook@^1.13.6, @types/react@^19.3.0, vite@^6.4.6, @vitejs/plugin-react@^4.7.0, vitest@^3.2.7, wrangler@^4.168.0 (+6 more)

### Community 18 - "Leer datos con input"
Cohesion: 0.40
Nodes (4): Convertir entre tipos, input() siempre devuelve texto, Leer datos con input(), Un input() por cada dato

### Community 20 - "Porcentajes y descuentos"
Cohesion: 0.33
Nodes (5): Aplicar un descuento, Decimales al mostrar, Decisión + porcentaje, Ponderaciones, Porcentajes y descuentos

### Community 21 - "content/types.ts"
Cohesion: 0.06
Nodes (54): ADR-0005, ADR-0008, Consecuencias, vitest, exerciseFiles, EXERCISES, exercisesOf(), lessonFiles (+46 more)

### Community 22 - "Tomar decisiones con if y else"
Cohesion: 0.40
Nodes (4): Comparaciones, Cuidado con los tipos, La sangría es parte del código, Tomar decisiones con if y else

### Community 23 - "Más de dos caminos con elif"
Cohesion: 0.40
Nodes (4): Antes de programar: dibuja los rangos, El orden importa, else es opcional, Más de dos caminos con elif

### Community 24 - "Combinar condiciones: and, or, not"
Cohesion: 0.40
Nodes (4): Combinar condiciones: and, or, not, not, or para varias respuestas válidas, Rangos

### Community 25 - "División entera (//) y residuo (%)"
Cohesion: 0.17
Nodes (11): Antes de seguir, Dar la vuelta en un ciclo, División entera (//) y residuo (%), divmod: las dos cosas de una vez, El residuo siempre es menor que el divisor, ¿Es par? ¿Es múltiplo?, La regla que siempre se cumple, Repartir en unidades más grandes (+3 more)

### Community 27 - "Mostrar resultados con f-strings"
Cohesion: 0.40
Nodes (4): Controlar los decimales, Dentro de las llaves puede ir una cuenta, Mostrar resultados con f-strings, print con comas vs. f-string

### Community 29 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, codemirror@6.0.2, @codemirror/commands@6.11.1, @codemirror/lang-python@6.2.1, @codemirror/theme-one-dark@6.1.3, @codemirror/view@6.43.15, marked@18.2.0, pyodide@314.0.7 (+11 more)

### Community 31 - "eslint.config.js"
Cohesion: 0.22
Nodes (8): @eslint/js@^9.39.5, eslint-plugin-react-hooks@^5.2.0, globals@^16.5.0, typescript-eslint@^8.74.0, @eslint/js, eslint-plugin-react-hooks, globals, typescript-eslint

### Community 32 - "line-limit.test.mjs"
Cohesion: 0.18
Nodes (11): config, violations, countLines(), findViolations(), listFiles(), config, arr(), modules (+3 more)

### Community 37 - "package.json"
Cohesion: 0.18
Nodes (10): @types/node@^22.20.5, @types/react-dom@^19.3.0, typescript@~5.8.3, name, private, type, version, @types/node (+2 more)

### Community 38 - "adr/README.md"
Cohesion: 0.33
Nodes (4): ADR-005: Contenido como archivos en `content/`, Contexto, Decisión, Decisiones de arquitectura (ADR)

### Community 39 - "ADR-002: Python en el navegador con Pyodide dentro de un Web Worker"
Cohesion: 0.40
Nodes (4): ADR-002: Python en el navegador con Pyodide dentro de un Web Worker, Consecuencias, Contexto, Decisión

### Community 40 - "ADR-003: Supabase como base de datos y autenticación"
Cohesion: 0.40
Nodes (4): ADR-003: Supabase como base de datos y autenticación, Consecuencias, Contexto, Decisión

### Community 41 - "ADR-004: El navegador enseña, el servidor certifica"
Cohesion: 0.40
Nodes (4): ADR-004: El navegador enseña, el servidor certifica, Consecuencias, Contexto, Decisión

### Community 42 - "ADR-006: Desbloqueo por dominio con 85% y repasos espaciados"
Cohesion: 0.40
Nodes (4): ADR-006: Desbloqueo por dominio con 85% y repasos espaciados, Consecuencias, Contexto, Decisión

### Community 43 - "ADR-007: Modo invitado sin Supabase"
Cohesion: 0.40
Nodes (4): ADR-007: Modo invitado sin Supabase, Consecuencias, Contexto, Decisión

### Community 44 - "ADR-008: Estado: TanStack Query para el servidor, Zustand para la interfaz"
Cohesion: 0.40
Nodes (4): ADR-008: Estado: TanStack Query para el servidor, Zustand para la interfaz, Consecuencias, Contexto, Decisión

### Community 46 - "ADR-009: ReactBits con carga diferida y movimiento reducido"
Cohesion: 0.40
Nodes (4): ADR-009: ReactBits con carga diferida y movimiento reducido, Consecuencias, Contexto, Decisión

### Community 47 - "ADR-010: Ningún archivo de más de 250 líneas"
Cohesion: 0.40
Nodes (4): ADR-010: Ningún archivo de más de 250 líneas, Consecuencias, Contexto, Decisión

## Knowledge Gaps
- **7 isolated node(s):** `ADR-0004`, `ADR-0008`, `ADR-0006`, `ADR-0005`, `ADR-0006` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 271 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Consecuencias` connect `content/types.ts` to `adr/README.md`?**
  _High betweenness centrality (0.166) - this node is a cross-community bridge._
- **What connects `ADR-0004`, `ADR-0008`, `ADR-0006` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ExerciseFlow.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07355769230769231 - nodes in this community are weakly interconnected._
- **Why does `ADR-005: Contenido como archivos en `content/`` connect `adr/README.md` to `content/types.ts`?**
  _High betweenness centrality (0.166) - this node is a cross-community bridge._
- **Should `steps` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._
- **Why does `ExerciseDef` connect `content/types.ts` to `ExerciseFlow.tsx`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09191919191919191 - nodes in this community are weakly interconnected._