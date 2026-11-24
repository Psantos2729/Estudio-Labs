# Graph Report - estudio-labs  (2026-11-24)

## Corpus Check
- 122 files · ~20,784 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: .css 5, (none) 3, .example 1)

## Summary
- 548 nodes · 897 edges · 41 communities (36 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `64c83df9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Variables y tipos
- App.tsx
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
- Leer datos con input
- Porcentajes y descuentos
- supabase.ts
- Tomar decisiones con if y else
- Más de dos caminos con elif
- Combinar condiciones: and, or, not
- División entera (//) y residuo (%)
- ADR-005: Contenido como archivos en `content/`
- Mostrar resultados con f-strings
- ADR-002: Python en el navegador con Pyodide dentro de un Web Worker
- ADR-003: Supabase como base de datos y autenticación
- Operadores aritméticos
- ADR-004: El navegador enseña, el servidor certifica
- ADR-006: Desbloqueo por dominio con 85% y repasos espaciados
- ADR-007: Modo invitado sin Supabase
- ADR-008: Estado: TanStack Query para el servidor, Zustand para la interfaz
- ADR-009: ReactBits con carga diferida y movimiento reducido
- ADR-010: Ningún archivo de más de 250 líneas
- package.json
- eslint.config.js
- CodeEditor.tsx
- vite

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `react` - 16 edges
3. `displayId()` - 14 edges
4. `HomePage()` - 13 edges
5. `Button()` - 13 edges
6. `ExerciseDef` - 12 edges
7. `useAuth()` - 12 edges
8. `useModuleViews()` - 12 edges
9. `Publicar pylab en Cloudflare` - 12 edges
10. `LessonPage()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Consecuencias` --references--> `ExerciseDef`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/types.ts
- `Consecuencias` --references--> `validateExercise()`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/validate.ts
- `App()` --calls--> `ExercisePage()`  [EXTRACTED]
  src/app/App.tsx → src/features/exercise/ExercisePage.tsx
- `App()` --calls--> `HomePage()`  [EXTRACTED]
  src/app/App.tsx → src/features/home/HomePage.tsx
- `App()` --calls--> `LessonPage()`  [EXTRACTED]
  src/app/App.tsx → src/features/lesson/LessonPage.tsx

## Import Cycles
- None detected.

## Communities (41 total, 5 thin omitted)

### Community 0 - "Variables y tipos"
Cohesion: 0.40
Nodes (4): El orden importa, Los tres tipos del módulo, Nombres de variables, Variables y tipos

### Community 1 - "App.tsx"
Cohesion: 0.16
Nodes (14): react, react-router-dom, App(), Layout(), Providers(), AuthProvider(), LoginPage(), PrivacyPage() (+6 more)

### Community 2 - "steps"
Cohesion: 0.08
Nodes (28): runs-on, services, steps, DATABASE_URL, POSTGRES_DB, POSTGRES_PASSWORD, jobs, database (+20 more)

### Community 3 - "masteryView.ts"
Cohesion: 0.06
Nodes (51): ADR-0005, ADR-0008, @tanstack/react-query, exerciseFiles, EXERCISES, exercisesOf(), getExercise(), lessonFiles (+43 more)

### Community 4 - "Publicar pylab en Cloudflare"
Cohesion: 0.07
Nodes (26): 1.1 Crear el proyecto, 1.2 Crear las tablas, 1.3 Activar el inicio de sesión, 1.4 Copiar las llaves, 1.5 Ojo con el plan gratis, 1. Supabase (base de datos e inicio de sesión), 2. Publicar la web, Antes de empezar (+18 more)

### Community 5 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, baseUrl, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+10 more)

### Community 6 - "line-limit.test.mjs"
Cohesion: 0.11
Nodes (20): Consecuencias, vitest@^3.2.7, vitest, root, modules, root, ModuleDef, validateExercise() (+12 more)

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
Nodes (37): ADR-0002, pyodide, getLesson(), ExerciseDef, CodeStep(), Props, ANALYSIS, ExerciseFlow() (+29 more)

### Community 15 - "ADR-001: React + Vite + TypeScript en Cloudflare Pages"
Cohesion: 0.40
Nodes (4): ADR-001: React + Vite + TypeScript en Cloudflare Pages, Consecuencias, Contexto, Decisión

### Community 16 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, check-lines, dev, lint, prepare, preview, seed (+3 more)

### Community 17 - "dependencies"
Cohesion: 0.11
Nodes (22): dependencies, codemirror@6.0.2, @codemirror/commands@6.11.1, @codemirror/lang-python@6.2.1, @codemirror/theme-one-dark@6.1.3, @codemirror/view@6.43.15, marked@18.2.0, pyodide@314.0.7 (+14 more)

### Community 18 - "Leer datos con input"
Cohesion: 0.40
Nodes (4): Convertir entre tipos, input() siempre devuelve texto, Leer datos con input(), Un input() por cada dato

### Community 20 - "Porcentajes y descuentos"
Cohesion: 0.33
Nodes (5): Aplicar un descuento, Decimales al mostrar, Decisión + porcentaje, Ponderaciones, Porcentajes y descuentos

### Community 21 - "supabase.ts"
Cohesion: 0.24
Nodes (7): @supabase/supabase-js@^2.119.2, @supabase/supabase-js, anonKey, isSupabaseConfigured, ADR-0006, url, normalizeSupabaseUrl()

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

### Community 26 - "ADR-005: Contenido como archivos en `content/`"
Cohesion: 0.33
Nodes (4): ADR-005: Contenido como archivos en `content/`, Contexto, Decisión, Decisiones de arquitectura (ADR)

### Community 27 - "Mostrar resultados con f-strings"
Cohesion: 0.40
Nodes (4): Controlar los decimales, Dentro de las llaves puede ir una cuenta, Mostrar resultados con f-strings, print con comas vs. f-string

### Community 28 - "ADR-002: Python en el navegador con Pyodide dentro de un Web Worker"
Cohesion: 0.40
Nodes (4): ADR-002: Python en el navegador con Pyodide dentro de un Web Worker, Consecuencias, Contexto, Decisión

### Community 29 - "ADR-003: Supabase como base de datos y autenticación"
Cohesion: 0.40
Nodes (4): ADR-003: Supabase como base de datos y autenticación, Consecuencias, Contexto, Decisión

### Community 31 - "ADR-004: El navegador enseña, el servidor certifica"
Cohesion: 0.40
Nodes (4): ADR-004: El navegador enseña, el servidor certifica, Consecuencias, Contexto, Decisión

### Community 32 - "ADR-006: Desbloqueo por dominio con 85% y repasos espaciados"
Cohesion: 0.40
Nodes (4): ADR-006: Desbloqueo por dominio con 85% y repasos espaciados, Consecuencias, Contexto, Decisión

### Community 33 - "ADR-007: Modo invitado sin Supabase"
Cohesion: 0.40
Nodes (4): ADR-007: Modo invitado sin Supabase, Consecuencias, Contexto, Decisión

### Community 34 - "ADR-008: Estado: TanStack Query para el servidor, Zustand para la interfaz"
Cohesion: 0.40
Nodes (4): ADR-008: Estado: TanStack Query para el servidor, Zustand para la interfaz, Consecuencias, Contexto, Decisión

### Community 35 - "ADR-009: ReactBits con carga diferida y movimiento reducido"
Cohesion: 0.40
Nodes (4): ADR-009: ReactBits con carga diferida y movimiento reducido, Consecuencias, Contexto, Decisión

### Community 36 - "ADR-010: Ningún archivo de más de 250 líneas"
Cohesion: 0.40
Nodes (4): ADR-010: Ningún archivo de más de 250 líneas, Consecuencias, Contexto, Decisión

### Community 37 - "package.json"
Cohesion: 0.14
Nodes (19): devDependencies, eslint@^9.39.5, lefthook@^1.13.6, @types/node@^22.20.5, @types/react@^19.3.0, @types/react-dom@^19.3.0, typescript@~5.8.3, wrangler@^4.168.0 (+11 more)

### Community 38 - "eslint.config.js"
Cohesion: 0.22
Nodes (8): @eslint/js@^9.39.5, eslint-plugin-react-hooks@^5.2.0, globals@^16.5.0, typescript-eslint@^8.74.0, @eslint/js, eslint-plugin-react-hooks, globals, typescript-eslint

### Community 40 - "vite"
Cohesion: 0.33
Nodes (4): vite@^6.4.6, @vitejs/plugin-react@^4.7.0, vite, @vitejs/plugin-react

## Knowledge Gaps
- **5 isolated node(s):** `ADR-0006`, `ADR-0002`, `ADR-0005`, `ADR-0008`, `ADR-0006`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 254 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR-005: Contenido como archivos en `content/`` connect `ADR-005: Contenido como archivos en `content/`` to `line-limit.test.mjs`?**
  _High betweenness centrality (0.189) - this node is a cross-community bridge._
- **What connects `ADR-0006`, `ADR-0002`, `ADR-0005` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `steps` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._
- **Why does `Consecuencias` connect `line-limit.test.mjs` to `ADR-005: Contenido como archivos en `content/``, `check.ts`?**
  _High betweenness centrality (0.189) - this node is a cross-community bridge._
- **Should `masteryView.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.061088485746019994 - nodes in this community are weakly interconnected._
- **Why does `ExerciseDef` connect `check.ts` to `App.tsx`, `masteryView.ts`, `line-limit.test.mjs`?**
  _High betweenness centrality (0.177) - this node is a cross-community bridge._
- **Should `Publicar pylab en Cloudflare` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._