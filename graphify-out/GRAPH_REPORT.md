# Graph Report - estudio-labs  (2026-11-25)

## Corpus Check
- 153 files · ~31,853 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 7, (none) 3, .example 1)

## Summary
- 667 nodes · 1276 edges · 43 communities (32 shown, 11 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d49e25e2`
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
- adr/README.md
- scripts
- vite
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
- README.md
- 1. Supabase (base de datos e inicio de sesión)
- package.json
- Publicar pylab en GitHub Pages
- Reglas del proyecto pylab (Estudio-Labs)
- setup.md
- @codemirror/commands

## God Nodes (most connected - your core abstractions)
1. `displayId()` - 22 edges
2. `Button()` - 21 edges
3. `react` - 21 edges
4. `useModuleViews()` - 20 edges
5. `useAuth()` - 17 edges
6. `compilerOptions` - 17 edges
7. `react-router-dom` - 16 edges
8. `HomePage()` - 15 edges
9. `App()` - 14 edges
10. `public.submit_exam()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `Consecuencias` --references--> `ExerciseDef`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/types.ts
- `Consecuencias` --references--> `validateExercise()`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/validate.ts
- `run()` --calls--> `execute()`  [EXTRACTED]
  tools/exam-bank.mjs → src/features/runner/execute.ts
- `App()` --calls--> `ExamPage()`  [EXTRACTED]
  src/app/App.tsx → src/features/exam/ExamPage.tsx
- `App()` --calls--> `ReviewListPage()`  [EXTRACTED]
  src/app/App.tsx → src/features/exam/ReviewListPage.tsx

## Import Cycles
- None detected.

## Communities (43 total, 11 thin omitted)

### Community 0 - "Variables y tipos"
Cohesion: 0.40
Nodes (4): El orden importa, Los tres tipos del módulo, Nombres de variables, Variables y tipos

### Community 1 - "ExerciseFlow.tsx"
Cohesion: 0.06
Nodes (49): marked@18.2.0, marked, exerciseFiles, EXERCISES, getExercise(), getLesson(), lessonFiles, LESSONS (+41 more)

### Community 2 - "steps"
Cohesion: 0.08
Nodes (28): runs-on, services, steps, DATABASE_URL, POSTGRES_DB, POSTGRES_PASSWORD, jobs, database (+20 more)

### Community 3 - "App.tsx"
Cohesion: 0.16
Nodes (16): react, react-router-dom, App(), Layout(), Providers(), AuthContext, AuthProvider(), AuthState (+8 more)

### Community 4 - "Publicar pylab en Cloudflare"
Cohesion: 0.17
Nodes (12): Antes de empezar, Cómo se actualiza, Paso 1. Entrar a Workers & Pages, Paso 2. Crear la aplicación desde GitHub, Paso 3. Configurar el proyecto, Paso 4. Variables de compilación, Paso 5. Publicar, Paso 6. (Opcional) Si tu panel sí muestra Pages (+4 more)

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
Cohesion: 0.05
Nodes (27): public.exercises, public.modules, public.profiles, public.module_mastery, on_auth_user_created, public.handle_new_user(), practice_attempts_user_exercise, public.practice_attempts (+19 more)

### Community 11 - "Continuar pylab en otra sesión"
Cohesion: 0.17
Nodes (12): Banco oculto del examen, Comandos útiles, Continuar pylab en otra sesión, Cosas que ya fallaron (no repetir), Documentos de diseño (en claude.ai, privados de Paolo), Estado actual (fases 1, 2 y 3 cerradas), Fase 4: repasos, historial y ReactBits (siguiente), Módulos y ejercicios del PDF C5 (+4 more)

### Community 13 - "steps"
Cohesion: 0.06
Nodes (34): runs-on, steps, concurrency, cancel-in-progress, group, environment, needs, runs-on (+26 more)

### Community 14 - "ExamPage.tsx"
Cohesion: 0.12
Nodes (27): ADR-0004, buildAnswers(), Run, exam, ExamPage(), ExamQuestions(), ExamResult(), Draft (+19 more)

### Community 15 - "adr/README.md"
Cohesion: 0.04
Nodes (37): ADR-001: React + Vite + TypeScript en Cloudflare Pages, Consecuencias, Contexto, Decisión, ADR-002: Python en el navegador con Pyodide dentro de un Web Worker, Consecuencias, Contexto, Decisión (+29 more)

### Community 16 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, check-lines, dev, lint, prepare, preview, seed (+3 more)

### Community 17 - "vite"
Cohesion: 0.33
Nodes (4): vite@^6.4.6, @vitejs/plugin-react@^4.7.0, vite, @vitejs/plugin-react

### Community 18 - "Leer datos con input"
Cohesion: 0.40
Nodes (4): Convertir entre tipos, input() siempre devuelve texto, Leer datos con input(), Un input() por cada dato

### Community 20 - "Porcentajes y descuentos"
Cohesion: 0.33
Nodes (5): Aplicar un descuento, Decimales al mostrar, Decisión + porcentaje, Ponderaciones, Porcentajes y descuentos

### Community 21 - "content/types.ts"
Cohesion: 0.06
Nodes (53): ADR-0005, ADR-0008, exercisesOf(), lessonsOf(), files, MODULES, modules, root (+45 more)

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
Cohesion: 0.10
Nodes (20): dependencies, codemirror@6.0.2, @codemirror/lang-python@6.2.1, @codemirror/theme-one-dark@6.1.3, @codemirror/view@6.43.15, pyodide@314.0.7, react@^19.3.1, react-dom@^19.3.1 (+12 more)

### Community 31 - "eslint.config.js"
Cohesion: 0.15
Nodes (15): devDependencies, eslint@^9.39.5, @eslint/js@^9.39.5, eslint-plugin-react-hooks@^5.2.0, globals@^16.5.0, lefthook@^1.13.6, typescript-eslint@^8.74.0, wrangler@^4.168.0 (+7 more)

### Community 32 - "line-limit.test.mjs"
Cohesion: 0.10
Nodes (19): ADR-005: Contenido como archivos en `content/`, Consecuencias, Contexto, Decisión, vitest@^3.2.7, vitest, root, validateExercise() (+11 more)

### Community 35 - "README.md"
Cohesion: 0.29
Nodes (4): Documentación, Empezar, Estado, pylab · Estudio-Labs

### Community 36 - "1. Supabase (base de datos e inicio de sesión)"
Cohesion: 0.33
Nodes (6): 1.1 Crear el proyecto, 1.2 Crear las tablas, 1.3 Activar el inicio de sesión, 1.4 Copiar las llaves, 1.5 Ojo con el plan gratis, 1. Supabase (base de datos e inicio de sesión)

### Community 37 - "package.json"
Cohesion: 0.15
Nodes (12): @types/node@^22.20.5, @types/react@^19.3.0, @types/react-dom@^19.3.0, typescript@~5.8.3, name, private, type, version (+4 more)

### Community 38 - "Publicar pylab en GitHub Pages"
Cohesion: 0.33
Nodes (6): Paso 1. Activar GitHub Pages (una sola vez), Paso 2. Guardar las llaves de Supabase (una sola vez), Paso 3. Publicar, Paso 4. Avisarle a Supabase, Publicar pylab en GitHub Pages, Si algo falla

### Community 39 - "Reglas del proyecto pylab (Estudio-Labs)"
Cohesion: 0.40
Nodes (5): Comandos, Contexto con graphify, Dónde está cada cosa, Reglas del proyecto pylab (Estudio-Labs), Reglas que no se rompen

## Knowledge Gaps
- **5 isolated node(s):** `ADR-0004`, `ADR-0005`, `ADR-0008`, `ADR-0006`, `ADR-0002`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 272 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Consecuencias` connect `line-limit.test.mjs` to `ExerciseFlow.tsx`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._
- **What connects `ADR-0004`, `ADR-0005`, `ADR-0008` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ExerciseFlow.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0609009009009009 - nodes in this community are weakly interconnected._
- **Why does `ExerciseDef` connect `ExerciseFlow.tsx` to `line-limit.test.mjs`, `content/types.ts`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Should `steps` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `public.handle_new_user` be split into smaller, more focused modules?**
  _Cohesion score 0.053830227743271224 - nodes in this community are weakly interconnected._