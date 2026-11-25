# Graph Report - estudio-labs  (2026-11-25)

## Corpus Check
- 244 files · ~73,541 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 7, (none) 3, .example 1)

## Summary
- 881 nodes · 1553 edges · 67 communities (56 shown, 11 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ea55da4e`
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
- content/types.ts
- adr/README.md
- scripts
- vite
- Leer datos con input
- Porcentajes y descuentos
- mapStore.ts
- Tomar decisiones con if y else
- Más de dos caminos con elif
- Combinar condiciones: and, or, not
- División entera (//) y residuo (%)
- Mostrar resultados con f-strings
- dependencies
- Operadores aritméticos
- eslint.config.js
- line-limit.test.mjs
- Funciones: def, parámetros y return
- Banderas, break y continue
- package.json
- Búsqueda binaria
- Recorrer cadenas de texto
- Palíndromos: comparar los extremos
- Listas como vectores de tamaño fijo
- Ordenamiento por inserción
- Ordenamiento por conteo y qué hacer con un vector ordenado
- Operar vectores y llenarlos al azar
- Ordenamiento burbuja
- Burbuja mejorada y cómo medir el costo
- Ciclos anidados
- Repetir con for y range
- Mezclar listas ordenadas y elegir el método
- Repetir mientras algo sea cierto: while
- App.tsx
- Binario y decimal
- Fechas y edades
- README.md
- Sacar los dígitos de un número con un ciclo
- Desglose en cascada: posiciones y billetes
- 1. Supabase (base de datos e inicio de sesión)
- Publicar pylab en GitHub Pages
- Reglas del proyecto pylab (Estudio-Labs)
- setup.md
- Tablas de conversión: romanos y números a letras
- Recorrer un vector: sumar, el mayor y buscar
- Funciones con vectores y programas con menú
- Ordenar: intercambios y el método de selección

## God Nodes (most connected - your core abstractions)
1. `displayId()` - 26 edges
2. `Button()` - 23 edges
3. `useModuleViews()` - 22 edges
4. `react` - 22 edges
5. `useAuth()` - 19 edges
6. `react-router-dom` - 18 edges
7. `compilerOptions` - 17 edges
8. `LockedNotice()` - 16 edges
9. `App()` - 15 edges
10. `HomePage()` - 15 edges

## Surprising Connections (you probably didn't know these)
- `Consecuencias` --references--> `ExerciseDef`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/types.ts
- `Consecuencias` --references--> `validateExercise()`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/validate.ts
- `run()` --calls--> `execute()`  [EXTRACTED]
  tools/exam-bank.mjs → src/features/runner/execute.ts
- `LessonPage()` --calls--> `lessonsOf()`  [EXTRACTED]
  src/features/lesson/LessonPage.tsx → src/content/lessons.ts
- `LessonPage()` --calls--> `displayId()`  [EXTRACTED]
  src/features/lesson/LessonPage.tsx → src/content/types.ts

## Import Cycles
- None detected.

## Communities (67 total, 11 thin omitted)

### Community 0 - "Variables y tipos"
Cohesion: 0.40
Nodes (4): El orden importa, Los tres tipos del módulo, Nombres de variables, Variables y tipos

### Community 1 - "ExerciseFlow.tsx"
Cohesion: 0.07
Nodes (43): ADR-0004, @supabase/supabase-js@^2.119.2, marked, react-router-dom, @supabase/supabase-js, buildAnswers(), Run, exam (+35 more)

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
Cohesion: 0.05
Nodes (29): public.exercises, public.modules, public.profiles, public.module_mastery, on_auth_user_created, public.handle_new_user(), practice_attempts_user_exercise, public.practice_attempts (+21 more)

### Community 11 - "Continuar pylab en otra sesión"
Cohesion: 0.17
Nodes (12): Banco oculto del examen, Comandos útiles, Continuar pylab en otra sesión, Cosas que ya fallaron (no repetir), Documentos de diseño (en claude.ai, privados de Paolo), Estado actual (fases 1, 2 y 3 cerradas), Fase 4: repasos, historial y ReactBits (siguiente), Módulos y ejercicios del PDF C5 (+4 more)

### Community 13 - "steps"
Cohesion: 0.06
Nodes (34): runs-on, steps, concurrency, cancel-in-progress, group, environment, needs, runs-on (+26 more)

### Community 14 - "content/types.ts"
Cohesion: 0.06
Nodes (61): ADR-0005, @tanstack/react-query@^5.108.4, @tanstack/react-query, vitest, exercisesOf(), lessonsOf(), files, MODULES (+53 more)

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

### Community 21 - "mapStore.ts"
Cohesion: 0.40
Nodes (4): ADR-0008, zustand@^5.1.0, zustand, MapState

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
Cohesion: 0.12
Nodes (17): dependencies, codemirror@6.0.2, @codemirror/commands@6.11.1, @codemirror/lang-python@6.2.1, @codemirror/theme-one-dark@6.1.3, @codemirror/view@6.43.15, marked@18.2.0, pyodide@314.0.7 (+9 more)

### Community 31 - "eslint.config.js"
Cohesion: 0.22
Nodes (8): @eslint/js@^9.39.5, eslint-plugin-react-hooks@^5.2.0, globals@^16.5.0, typescript-eslint@^8.74.0, @eslint/js, eslint-plugin-react-hooks, globals, typescript-eslint

### Community 32 - "line-limit.test.mjs"
Cohesion: 0.09
Nodes (22): ADR-005: Contenido como archivos en `content/`, Consecuencias, Contexto, Decisión, exerciseFiles, EXERCISES, lessonFiles, LESSONS (+14 more)

### Community 35 - "Funciones: def, parámetros y return"
Cohesion: 0.20
Nodes (9): Antes de seguir, Definir y llamar, Funciones: def, parámetros y return, Funciones que devuelven True o False, Funciones que usan otras funciones, Reto: una función que se llama a sí misma, return: devolver un resultado, Variables locales (+1 more)

### Community 36 - "Banderas, break y continue"
Cohesion: 0.29
Nodes (6): Banderas, break y continue, Banderas: recordar si algo pasó, break: salir del ciclo ya, Contador o bandera, continue: saltar a la siguiente vuelta, Probar menos divisores

### Community 37 - "package.json"
Cohesion: 0.13
Nodes (20): devDependencies, eslint@^9.39.5, lefthook@^1.13.6, @types/node@^22.20.5, @types/react@^19.3.0, @types/react-dom@^19.3.0, typescript@~5.8.3, vitest@^3.2.7 (+12 more)

### Community 38 - "Búsqueda binaria"
Cohesion: 0.20
Nodes (9): Antes de seguir, Buscar un valor que sí está, Buscar uno que no está, Búsqueda binaria, El ejercicio 36, En código, La idea, ¿Por qué es tan rápida? (+1 more)

### Community 39 - "Recorrer cadenas de texto"
Cohesion: 0.22
Nodes (8): Antes de seguir, Armar un texto nuevo, Contar y acumular sobre un texto, Dos formas de recorrer, Rebanadas, Recorrer cadenas de texto, Separar en palabras, Índices y len

### Community 40 - "Palíndromos: comparar los extremos"
Cohesion: 0.22
Nodes (8): Antes de seguir, En código, con una bandera, Errores comunes, Frases: limpiar antes de comparar, La letra y su espejo, Palíndromos: comparar los extremos, Reto: anagramas, Reto: cifrado César

### Community 41 - "Listas como vectores de tamaño fijo"
Cohesion: 0.22
Nodes (8): Antes de seguir, Copiar un vector, La regla de este curso: tamaño definido, Leer un vector, Listas como vectores de tamaño fijo, Mostrar un vector, Posiciones (índices), Recorrer al revés

### Community 42 - "Ordenamiento por inserción"
Cohesion: 0.22
Nodes (8): Antes de seguir, Con intercambios, como en tu tarea, ¿Cuándo conviene?, En código, Errores comunes, La idea, Ordenamiento por inserción, Paso a paso

### Community 43 - "Ordenamiento por conteo y qué hacer con un vector ordenado"
Cohesion: 0.22
Nodes (8): Antes de seguir, Aprobados y reprobados (ejercicio 30), ¿Cuánto cuesta?, En código, La posición media, Ordenamiento por conteo y qué hacer con un vector ordenado, Paso 1: contar, Paso 2: reconstruir

### Community 44 - "Operar vectores y llenarlos al azar"
Cohesion: 0.25
Nodes (7): Antes de seguir, La semilla, Números aleatorios con random, Operar vectores y llenarlos al azar, Producto escalar: un solo número, Reto: producto vectorial, Suma y resta: un vector nuevo

### Community 46 - "Ordenamiento burbuja"
Cohesion: 0.25
Nodes (7): Antes de seguir, Contar comparaciones e intercambios, El recorrido completo, En código, Errores comunes, Ordenamiento burbuja, Una pasada

### Community 47 - "Burbuja mejorada y cómo medir el costo"
Cohesion: 0.25
Nodes (7): Antes de seguir, Burbuja mejorada y cómo medir el costo, Contar en la mejorada, El mismo vector, con bandera, La bandera, Medir el tiempo, Normal contra mejorada

### Community 48 - "Ciclos anidados"
Cohesion: 0.29
Nodes (6): Ciclos anidados, Como un odómetro, ¿Cuántas vueltas?, Figuras con asteriscos, Rellenar con ceros, Tablas de multiplicar

### Community 50 - "Repetir con for y range"
Cohesion: 0.33
Nodes (5): Antes de programar: haz la tabla, Combinar for con if, Los tres usos de range, Repetir algo N veces, Repetir con for y range

### Community 51 - "Mezclar listas ordenadas y elegir el método"
Cohesion: 0.25
Nodes (7): Antes de seguir, Dos índices que avanzan, En código, con tamaño fijo, Lo que pide el ejercicio 33, Mezclar listas ordenadas y elegir el método, ¿Qué método uso?, Reto: radix sort

### Community 52 - "Repetir mientras algo sea cierto: while"
Cohesion: 0.40
Nodes (4): Centinela: leer hasta una señal, El ciclo infinito, for o while, Repetir mientras algo sea cierto: while

### Community 53 - "App.tsx"
Cohesion: 0.06
Nodes (52): react, App(), Layout(), Providers(), getExercise(), getLesson(), ExerciseDef, TestCase (+44 more)

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

### Community 63 - "Tablas de conversión: romanos y números a letras"
Cohesion: 0.29
Nodes (6): Antes de seguir, Cómo pensar un problema por capas, Números a letras, Números romanos, Reto: de romano a decimal, Tablas de conversión: romanos y números a letras

### Community 64 - "Recorrer un vector: sumar, el mayor y buscar"
Cohesion: 0.29
Nodes (6): Antes de seguir, Búsqueda lineal, El mayor y su posición, Recorrer un vector: sumar, el mayor y buscar, Recorridos con dos posiciones, Suma y promedio

### Community 65 - "Funciones con vectores y programas con menú"
Cohesion: 0.29
Nodes (6): Antes de seguir, Funciones con vectores y programas con menú, Imprimir al revés desde una posición, Pasar un vector a una función, Un programa con menú, Una función puede modificar el vector que recibe

### Community 66 - "Ordenar: intercambios y el método de selección"
Cohesion: 0.29
Nodes (6): Antes de seguir, ¿Cuánto trabajo hace?, ¿Está ordenado?, La pieza básica: intercambiar, Ordenar: intercambios y el método de selección, Selección: el mayor al final

## Knowledge Gaps
- **5 isolated node(s):** `ADR-0004`, `ADR-0005`, `ADR-0008`, `ADR-0006`, `ADR-0002`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 440 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Consecuencias` connect `line-limit.test.mjs` to `App.tsx`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **What connects `ADR-0004`, `ADR-0005`, `ADR-0008` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ExerciseFlow.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06628621597892889 - nodes in this community are weakly interconnected._
- **Why does `ExerciseDef` connect `App.tsx` to `line-limit.test.mjs`, `content/types.ts`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Should `steps` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `public.handle_new_user` be split into smaller, more focused modules?**
  _Cohesion score 0.0547945205479452 - nodes in this community are weakly interconnected._