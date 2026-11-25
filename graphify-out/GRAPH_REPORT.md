# Graph Report - estudio-labs  (2026-11-25)

## Corpus Check
- 305 files · ~104,679 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 7, (none) 3, .example 1)

## Summary
- 1023 nodes · 1710 edges · 92 communities (80 shown, 12 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8c87def8`
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
- LockedNotice.tsx
- adr/README.md
- scripts
- vite
- Leer datos con input
- Porcentajes y descuentos
- MapPage.tsx
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
- LessonPage.tsx
- supabase.ts
- masteryView.ts
- HomePage.tsx
- content/types.ts
- Expresiones regulares (2): separar, validar y reemplazar
- Conteos carácter por carácter
- Expresiones regulares (1): patrones
- Listas de listas: la matriz
- Recorrer por filas y por columnas
- Tableros: ajedrez, vecinos y tres en raya
- Abrir y cerrar archivos
- Escribir archivos
- Leer archivos
- Palabras y números dentro del texto
- Bytes y struct
- Grabar y leer registros
- seek: consulta individual y modificación
- Las rutinas: ingreso, consultas y modificación
- Suma de matrices y traspuesta
- Multiplicación de matrices
- Frecuencia de letras (PDF #22)
- Registros y acceso directo
- main.tsx

## God Nodes (most connected - your core abstractions)
1. `displayId()` - 26 edges
2. `Button()` - 25 edges
3. `react` - 23 edges
4. `useModuleViews()` - 22 edges
5. `useAuth()` - 19 edges
6. `react-router-dom` - 18 edges
7. `compilerOptions` - 17 edges
8. `LockedNotice()` - 16 edges
9. `LessonPage()` - 15 edges
10. `HomePage()` - 15 edges

## Surprising Connections (you probably didn't know these)
- `Consecuencias` --references--> `ExerciseDef`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/types.ts
- `Consecuencias` --references--> `validateExercise()`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/validate.ts
- `run()` --calls--> `execute()`  [EXTRACTED]
  tools/exam-bank.mjs → src/features/runner/execute.ts
- `ModuleView` --references--> `ModuleDef`  [EXTRACTED]
  src/features/map/masteryView.ts → src/content/types.ts
- `ExamPage()` --calls--> `displayId()`  [EXTRACTED]
  src/features/exam/ExamPage.tsx → src/content/types.ts

## Import Cycles
- None detected.

## Communities (92 total, 12 thin omitted)

### Community 0 - "Variables y tipos"
Cohesion: 0.40
Nodes (4): El orden importa, Los tres tipos del módulo, Nombres de variables, Variables y tipos

### Community 1 - "ExerciseFlow.tsx"
Cohesion: 0.06
Nodes (61): ADR-0004, marked, react, ExerciseDef, TestCase, buildAnswers(), Run, exam (+53 more)

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
Cohesion: 0.14
Nodes (15): ADR-0002, ADR-0006, pyodide, mod(), cleanTraceback(), collect(), execute(), hex() (+7 more)

### Community 7 - "¿Qué es un programa?"
Cohesion: 0.50
Nodes (3): Antes de seguir, `print` muestra cosas en pantalla, ¿Qué es un programa?

### Community 8 - "lint"
Cohesion: 0.22
Nodes (8): run, check-lines, lint, glob, run, pre-commit, commands, parallel

### Community 9 - "public.handle_new_user"
Cohesion: 0.05
Nodes (31): public.exercises, public.modules, public.profiles, public.module_mastery, on_auth_user_created, public.handle_new_user(), practice_attempts_user_exercise, public.practice_attempts (+23 more)

### Community 11 - "Continuar pylab en otra sesión"
Cohesion: 0.17
Nodes (12): Banco oculto del examen, Comandos útiles, Continuar pylab en otra sesión, Cosas que ya fallaron (no repetir), Documentos de diseño (en claude.ai, privados de Paolo), Estado actual (fases 1, 2 y 3 cerradas), Fase 4: repasos, historial y ReactBits (siguiente), Módulos y ejercicios del PDF C5 (+4 more)

### Community 13 - "steps"
Cohesion: 0.06
Nodes (34): runs-on, steps, concurrency, cancel-in-progress, group, environment, needs, runs-on (+26 more)

### Community 14 - "LockedNotice.tsx"
Cohesion: 0.17
Nodes (16): vitest@^3.2.7, vitest, attemptResult(), AttemptRow, base, now, HistoryPage(), when() (+8 more)

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

### Community 21 - "MapPage.tsx"
Cohesion: 0.20
Nodes (12): ADR-0008, PrivacyPage(), GateCard(), MapPage(), MapState, useMapStore, currentModule(), ModuleView (+4 more)

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
Cohesion: 0.08
Nodes (25): ADR-005: Contenido como archivos en `content/`, Consecuencias, Contexto, Decisión, exerciseFiles, EXERCISES, lessonFiles, LESSONS (+17 more)

### Community 35 - "Funciones: def, parámetros y return"
Cohesion: 0.20
Nodes (9): Antes de seguir, Definir y llamar, Funciones: def, parámetros y return, Funciones que devuelven True o False, Funciones que usan otras funciones, Reto: una función que se llama a sí misma, return: devolver un resultado, Variables locales (+1 more)

### Community 36 - "Banderas, break y continue"
Cohesion: 0.29
Nodes (6): Banderas, break y continue, Banderas: recordar si algo pasó, break: salir del ciclo ya, Contador o bandera, continue: saltar a la siguiente vuelta, Probar menos divisores

### Community 37 - "package.json"
Cohesion: 0.14
Nodes (19): devDependencies, eslint@^9.39.5, lefthook@^1.13.6, @types/node@^22.20.5, @types/react@^19.3.0, @types/react-dom@^19.3.0, typescript@~5.8.3, wrangler@^4.168.0 (+11 more)

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
Cohesion: 0.22
Nodes (12): react-router-dom, App(), Layout(), getExercise(), useAuth(), LoginPage(), ExercisePage(), useLastAttempt() (+4 more)

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

### Community 67 - "LessonPage.tsx"
Cohesion: 0.18
Nodes (16): getLesson(), Block, Grid, GridStep, parseGrid(), parseSteps(), splitBlocks(), Step (+8 more)

### Community 68 - "supabase.ts"
Cohesion: 0.16
Nodes (13): @supabase/supabase-js, @tanstack/react-query, Providers(), AuthContext, AuthProvider(), AuthState, usePracticeSummary(), anonKey (+5 more)

### Community 69 - "masteryView.ts"
Cohesion: 0.21
Nodes (14): files, MODULES, ModuleDef, ReviewListPage(), buildModuleViews(), daysUntil(), dueReviews(), globalMastery() (+6 more)

### Community 70 - "HomePage.tsx"
Cohesion: 0.28
Nodes (10): exercisesOf(), lessonsOf(), displayId(), HomePage(), ProgressRing(), TIPS, tipsOfTheDay(), useReadLessons() (+2 more)

### Community 71 - "content/types.ts"
Cohesion: 0.24
Nodes (9): ADR-0005, BossChallenge, LessonDef, PredictQuestion, NextStep, nextStep(), allRead, exercises (+1 more)

### Community 72 - "Expresiones regulares (2): separar, validar y reemplazar"
Cohesion: 0.22
Nodes (8): El jefe: decimales a romanos (PDF #26), Expresiones regulares (2): separar, validar y reemplazar, Grupos: sacar partes, Patrones de validación típicos, re.split: separadores raros (PDF #26), re.sub: reemplazar, Resumen del módulo, Validar un dato completo: re.fullmatch

### Community 73 - "Conteos carácter por carácter"
Cohesion: 0.25
Nodes (7): Antes de seguir, Clasificar cada carácter, Conteos carácter por carácter, Las preguntas que puedes hacerle a un carácter, Mayúsculas, minúsculas y espacios, Por línea y en total, Una tabla de contadores

### Community 74 - "Expresiones regulares (1): patrones"
Cohesion: 0.25
Nodes (7): Contar con regex, Cuántas veces: cuantificadores, Errores comunes, Expresiones regulares (1): patrones, Los símbolos básicos, Palabras, re.findall: todas las coincidencias

### Community 75 - "Listas de listas: la matriz"
Cohesion: 0.29
Nodes (6): Antes de seguir, Crear una matriz de tamaño fijo, Imprimir como tabla, La trampa de `[[0] * 3] * 2`, Leer una matriz por teclado, Listas de listas: la matriz

### Community 76 - "Recorrer por filas y por columnas"
Cohesion: 0.29
Nodes (6): Contar con condiciones, Diagonales (solo matrices cuadradas), El mayor y dónde está, Recorrer por filas y por columnas, Suma de cada columna, Suma de cada fila

### Community 77 - "Tableros: ajedrez, vecinos y tres en raya"
Cohesion: 0.29
Nodes (6): De "C5" a índices, El tablero de ajedrez, Los vecinos de una casilla, Resumen del módulo, Tableros: ajedrez, vecinos y tres en raya, Tres en raya: ¿quién ganó?

### Community 78 - "Abrir y cerrar archivos"
Cohesion: 0.29
Nodes (6): Abrir y cerrar archivos, Antes de seguir, Cuando el archivo no existe, El fin de línea, open: el archivo y el modo, with: se cierra solo

### Community 79 - "Escribir archivos"
Cohesion: 0.29
Nodes (6): Agregar sin borrar: modo 'a', Comprobar lo que escribiste, Escribir archivos, Grabar lo que escribe el usuario (PDF #21), print con file=, write

### Community 80 - "Leer archivos"
Cohesion: 0.29
Nodes (6): Errores comunes, for linea in f: línea por línea, Leer archivos, Letras, palabras y líneas (PDF #23), read(): todo de una vez, readlines(): una lista de líneas

### Community 81 - "Palabras y números dentro del texto"
Cohesion: 0.29
Nodes (6): Comparar con otro archivo, Números dentro del texto, Palabras armadas letra por letra, Palabras con split, Palabras y números dentro del texto, Palíndromos y la palabra más larga

### Community 82 - "Bytes y struct"
Cohesion: 0.29
Nodes (6): Bytes y struct, Dos funciones que vas a usar siempre, Leer el texto de vuelta, struct: un registro en bytes, Texto y bytes, Ver los bytes

### Community 83 - "Grabar y leer registros"
Cohesion: 0.29
Nodes (6): Consulta general: leer todos, El cursor del archivo, Errores comunes, Grabar y leer registros, Ingreso: agregar al final, Los modos binarios

### Community 84 - "seek: consulta individual y modificación"
Cohesion: 0.29
Nodes (6): Antes de seguir, Buscar por un campo, Modificar un registro, Saltar a un registro, seek: consulta individual y modificación, Validar que el registro existe

### Community 85 - "Las rutinas: ingreso, consultas y modificación"
Cohesion: 0.29
Nodes (6): Baja lógica, Campos calculados (PDF #28 y #29), El archivo existe o no (PDF #27), El programa completo, Las rutinas: ingreso, consultas y modificación, Resumen del módulo

### Community 86 - "Suma de matrices y traspuesta"
Cohesion: 0.33
Nodes (5): Error común: el orden de los argumentos, La traspuesta, Multiplicar por un número, Suma de matrices y traspuesta, Sumar dos matrices

### Community 87 - "Multiplicación de matrices"
Cohesion: 0.33
Nodes (5): Cada casilla es fila por columna, Con validación, Errores comunes, La regla, Multiplicación de matrices

### Community 88 - "Frecuencia de letras (PDF #22)"
Cohesion: 0.33
Nodes (5): Contar y mostrar, El alfabeto como texto, Frecuencia de letras (PDF #22), Normalizar cada letra, Variantes que salen en examen

### Community 89 - "Registros y acceso directo"
Cohesion: 0.33
Nodes (5): La cuenta del acceso directo, Lo que vas a hacer en este módulo, ¿Por qué "binario"?, Registro y campo, Registros y acceso directo

### Community 90 - "main.tsx"
Cohesion: 0.33
Nodes (3): react-dom@^19.3.1, react-dom, root

## Knowledge Gaps
- **5 isolated node(s):** `ADR-0005`, `ADR-0002`, `ADR-0004`, `ADR-0006`, `ADR-0008`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 552 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ExerciseDef` connect `ExerciseFlow.tsx` to `line-limit.test.mjs`, `content/types.ts`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **What connects `ADR-0005`, `ADR-0002`, `ADR-0004` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ExerciseFlow.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06452455590386624 - nodes in this community are weakly interconnected._
- **Why does `Consecuencias` connect `line-limit.test.mjs` to `ExerciseFlow.tsx`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Should `steps` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `exam-bank.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._