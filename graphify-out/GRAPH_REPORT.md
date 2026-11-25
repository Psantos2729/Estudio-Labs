# Graph Report - estudio-labs  (2026-11-25)

## Corpus Check
- 185 files · ~44,510 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 7, (none) 3, .example 1)

## Summary
- 740 nodes · 1376 edges · 63 communities (52 shown, 11 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3bb7b9d8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Variables y tipos
- ExerciseFlow.tsx
- steps
- Acumuladores y contadores
- Publicar pylab en Cloudflare
- compilerOptions
- exam-bank.mjs
- ¿Qué es un programa?
- lint
- public.handle_new_user
- test-db.sh
- Continuar pylab en otra sesión
- steps
- App.tsx
- ADR-001: React + Vite + TypeScript en Cloudflare Pages
- scripts
- devDependencies
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
- auth.users
- Banderas, break y continue
- package.json
- ADR-002: Python en el navegador con Pyodide dentro de un Web Worker
- ADR-003: Supabase como base de datos y autenticación
- ADR-004: El navegador enseña, el servidor certifica
- ADR-005: Contenido como archivos en `content/`
- ADR-006: Desbloqueo por dominio con 85% y repasos espaciados
- ADR-007: Modo invitado sin Supabase
- ADR-008: Estado: TanStack Query para el servidor, Zustand para la interfaz
- ADR-009: ReactBits con carga diferida y movimiento reducido
- ADR-010: Ningún archivo de más de 250 líneas
- Ciclos anidados
- Repetir con for y range
- main.tsx
- Repetir mientras algo sea cierto: while
- LessonPage.tsx
- Binario y decimal
- Fechas y edades
- README.md
- Sacar los dígitos de un número con un ciclo
- Desglose en cascada: posiciones y billetes
- 1. Supabase (base de datos e inicio de sesión)
- Publicar pylab en GitHub Pages
- Reglas del proyecto pylab (Estudio-Labs)
- setup.md

## God Nodes (most connected - your core abstractions)
1. `displayId()` - 24 edges
2. `Button()` - 21 edges
3. `react` - 21 edges
4. `useModuleViews()` - 20 edges
5. `useAuth()` - 19 edges
6. `react-router-dom` - 17 edges
7. `compilerOptions` - 17 edges
8. `HomePage()` - 15 edges
9. `App()` - 15 edges
10. `public.submit_exam()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `Consecuencias` --references--> `ExerciseDef`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/types.ts
- `Consecuencias` --references--> `validateExercise()`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/validate.ts
- `run()` --calls--> `execute()`  [EXTRACTED]
  tools/exam-bank.mjs → src/features/runner/execute.ts
- `run()` --calls--> `runPython()`  [EXTRACTED]
  src/features/lesson/RunnableCode.tsx → src/features/runner/runner.ts
- `LessonPage()` --calls--> `displayId()`  [EXTRACTED]
  src/features/lesson/LessonPage.tsx → src/content/types.ts

## Import Cycles
- None detected.

## Communities (63 total, 11 thin omitted)

### Community 0 - "Variables y tipos"
Cohesion: 0.40
Nodes (4): El orden importa, Los tres tipos del módulo, Nombres de variables, Variables y tipos

### Community 1 - "ExerciseFlow.tsx"
Cohesion: 0.07
Nodes (47): marked, react, exercisesOf(), ExerciseDef, TestCase, buildAnswers(), Run, exam (+39 more)

### Community 2 - "steps"
Cohesion: 0.08
Nodes (28): runs-on, services, steps, DATABASE_URL, POSTGRES_DB, POSTGRES_PASSWORD, jobs, database (+20 more)

### Community 3 - "Acumuladores y contadores"
Cohesion: 0.25
Nodes (7): Acumulador: ¿cuánto suman?, Acumulador de multiplicación, Acumuladores y contadores, Acumular texto, Contador: ¿cuántos hay?, Los tres errores típicos, Promedio

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
Cohesion: 0.09
Nodes (13): practice_attempts_user_exercise, public.practice_attempts, public.record_practice(), public.lesson_progress, public.mark_lesson_read(), public.start_exam(), public.submit_exam(), public.submit_exam() (+5 more)

### Community 11 - "Continuar pylab en otra sesión"
Cohesion: 0.17
Nodes (12): Banco oculto del examen, Comandos útiles, Continuar pylab en otra sesión, Cosas que ya fallaron (no repetir), Documentos de diseño (en claude.ai, privados de Paolo), Estado actual (fases 1, 2 y 3 cerradas), Fase 4: repasos, historial y ReactBits (siguiente), Módulos y ejercicios del PDF C5 (+4 more)

### Community 13 - "steps"
Cohesion: 0.06
Nodes (34): runs-on, steps, concurrency, cancel-in-progress, group, environment, needs, runs-on (+26 more)

### Community 14 - "App.tsx"
Cohesion: 0.08
Nodes (52): ADR-0004, react-router-dom, @tanstack/react-query, App(), Layout(), Providers(), getExercise(), displayId() (+44 more)

### Community 15 - "ADR-001: React + Vite + TypeScript en Cloudflare Pages"
Cohesion: 0.40
Nodes (4): ADR-001: React + Vite + TypeScript en Cloudflare Pages, Consecuencias, Contexto, Decisión

### Community 16 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, check-lines, dev, lint, prepare, preview, seed (+3 more)

### Community 17 - "devDependencies"
Cohesion: 0.14
Nodes (13): devDependencies, eslint@^9.39.5, @types/node@^22.20.5, @types/react-dom@^19.3.0, typescript@~5.8.3, vite@^6.4.6, @vitejs/plugin-react@^4.7.0, eslint (+5 more)

### Community 18 - "Leer datos con input"
Cohesion: 0.40
Nodes (4): Convertir entre tipos, input() siempre devuelve texto, Leer datos con input(), Un input() por cada dato

### Community 20 - "Porcentajes y descuentos"
Cohesion: 0.33
Nodes (5): Aplicar un descuento, Decimales al mostrar, Decisión + porcentaje, Ponderaciones, Porcentajes y descuentos

### Community 21 - "content/types.ts"
Cohesion: 0.09
Nodes (30): ADR-0005, ADR-0008, files, MODULES, BossChallenge, LessonDef, ModuleDef, PredictQuestion (+22 more)

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
Nodes (20): dependencies, codemirror@6.0.2, @codemirror/commands@6.11.1, @codemirror/lang-python@6.2.1, @codemirror/theme-one-dark@6.1.3, @codemirror/view@6.43.15, marked@18.2.0, pyodide@314.0.7 (+12 more)

### Community 31 - "eslint.config.js"
Cohesion: 0.22
Nodes (8): @eslint/js@^9.39.5, eslint-plugin-react-hooks@^5.2.0, globals@^16.5.0, typescript-eslint@^8.74.0, @eslint/js, eslint-plugin-react-hooks, globals, typescript-eslint

### Community 32 - "line-limit.test.mjs"
Cohesion: 0.10
Nodes (20): Consecuencias, vitest@^3.2.7, vitest, root, modules, root, validateExercise(), validateModules() (+12 more)

### Community 35 - "auth.users"
Cohesion: 0.13
Nodes (16): public.exercises, public.modules, public.profiles, public.module_mastery, on_auth_user_created, public.handle_new_user(), public.fill_missing_mastery(), exam_attempts_user_module (+8 more)

### Community 36 - "Banderas, break y continue"
Cohesion: 0.29
Nodes (6): Banderas, break y continue, Banderas: recordar si algo pasó, break: salir del ciclo ya, Contador o bandera, continue: saltar a la siguiente vuelta, Probar menos divisores

### Community 37 - "package.json"
Cohesion: 0.18
Nodes (10): lefthook@^1.13.6, @types/react@^19.3.0, wrangler@^4.168.0, name, private, type, version, lefthook (+2 more)

### Community 38 - "ADR-002: Python en el navegador con Pyodide dentro de un Web Worker"
Cohesion: 0.40
Nodes (4): ADR-002: Python en el navegador con Pyodide dentro de un Web Worker, Consecuencias, Contexto, Decisión

### Community 39 - "ADR-003: Supabase como base de datos y autenticación"
Cohesion: 0.40
Nodes (4): ADR-003: Supabase como base de datos y autenticación, Consecuencias, Contexto, Decisión

### Community 40 - "ADR-004: El navegador enseña, el servidor certifica"
Cohesion: 0.40
Nodes (4): ADR-004: El navegador enseña, el servidor certifica, Consecuencias, Contexto, Decisión

### Community 41 - "ADR-005: Contenido como archivos en `content/`"
Cohesion: 0.33
Nodes (4): ADR-005: Contenido como archivos en `content/`, Contexto, Decisión, Decisiones de arquitectura (ADR)

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

### Community 48 - "Ciclos anidados"
Cohesion: 0.29
Nodes (6): Ciclos anidados, Como un odómetro, ¿Cuántas vueltas?, Figuras con asteriscos, Rellenar con ceros, Tablas de multiplicar

### Community 50 - "Repetir con for y range"
Cohesion: 0.33
Nodes (5): Antes de programar: haz la tabla, Combinar for con if, Los tres usos de range, Repetir algo N veces, Repetir con for y range

### Community 51 - "main.tsx"
Cohesion: 0.33
Nodes (3): react-dom@^19.3.1, react-dom, root

### Community 52 - "Repetir mientras algo sea cierto: while"
Cohesion: 0.40
Nodes (4): Centinela: leer hasta una señal, El ciclo infinito, for o while, Repetir mientras algo sea cierto: while

### Community 53 - "LessonPage.tsx"
Cohesion: 0.18
Nodes (14): exerciseFiles, EXERCISES, getLesson(), lessonFiles, LESSONS, lessonsOf(), parseLesson(), Block (+6 more)

### Community 54 - "Binario y decimal"
Cohesion: 0.22
Nodes (8): Antes de seguir, Binario y decimal, De binario a decimal: dos formas, De decimal a binario: dividir entre 2, Lo que Python ya trae, Qué significa cada posición, Reto: otras bases, Validar la entrada

### Community 55 - "Fechas y edades"
Cohesion: 0.25
Nodes (7): Antes de seguir, Contar días entre dos fechas, Fechas y edades, La trampa del cumpleaños, Leer una fecha en una sola línea, ¿Por qué pedir también la fecha de hoy?, Reto: años bisiestos

### Community 56 - "README.md"
Cohesion: 0.29
Nodes (4): Documentación, Empezar, Estado, pylab · Estudio-Labs

### Community 57 - "Sacar los dígitos de un número con un ciclo"
Cohesion: 0.29
Nodes (6): Antes de seguir, El caso del cero, Reto: máximo común divisor (Euclides), Reto: números de Armstrong, Sacar los dígitos de un número con un ciclo, Tres patrones con el mismo ciclo

### Community 58 - "Desglose en cascada: posiciones y billetes"
Cohesion: 0.29
Nodes (6): Antes de seguir, Centenas, decenas y unidades, Desglose en cascada: posiciones y billetes, La misma idea en otros lados, ¿Por qué de mayor a menor?, Repartir un monto en billetes

### Community 59 - "1. Supabase (base de datos e inicio de sesión)"
Cohesion: 0.33
Nodes (6): 1.1 Crear el proyecto, 1.2 Crear las tablas, 1.3 Activar el inicio de sesión, 1.4 Copiar las llaves, 1.5 Ojo con el plan gratis, 1. Supabase (base de datos e inicio de sesión)

### Community 60 - "Publicar pylab en GitHub Pages"
Cohesion: 0.33
Nodes (6): Paso 1. Activar GitHub Pages (una sola vez), Paso 2. Guardar las llaves de Supabase (una sola vez), Paso 3. Publicar, Paso 4. Avisarle a Supabase, Publicar pylab en GitHub Pages, Si algo falla

### Community 61 - "Reglas del proyecto pylab (Estudio-Labs)"
Cohesion: 0.40
Nodes (5): Comandos, Contexto con graphify, Dónde está cada cosa, Reglas del proyecto pylab (Estudio-Labs), Reglas que no se rompen

## Knowledge Gaps
- **5 isolated node(s):** `ADR-0005`, `ADR-0004`, `ADR-0008`, `ADR-0006`, `ADR-0002`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 327 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Consecuencias` connect `line-limit.test.mjs` to `ADR-005: Contenido como archivos en `content/``, `ExerciseFlow.tsx`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **What connects `ADR-0005`, `ADR-0004`, `ADR-0008` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ExerciseFlow.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06905370843989769 - nodes in this community are weakly interconnected._
- **Why does `ADR-005: Contenido como archivos en `content/`` connect `ADR-005: Contenido como archivos en `content/`` to `line-limit.test.mjs`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Should `steps` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._
- **Why does `ExerciseDef` connect `ExerciseFlow.tsx` to `line-limit.test.mjs`, `content/types.ts`, `LessonPage.tsx`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._