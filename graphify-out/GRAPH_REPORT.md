# Graph Report - estudio-labs  (2026-11-26)

## Corpus Check
- 465 files · ~171,498 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 9, (none) 3, .example 1)

## Summary
- 1466 nodes · 2650 edges · 140 communities (119 shown, 21 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5beb9434`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Variables y tipos
- react
- steps
- Acumuladores y contadores
- Publicar pylab en Cloudflare
- compilerOptions
- translate.ts
- ¿Qué es un programa?
- lint
- public.submit_exam
- test-db.sh
- Continuar pylab en otra sesión
- steps
- public.missions_of
- ADR-001: React + Vite + TypeScript en Cloudflare Pages
- scripts
- vite
- Leer datos con input
- Porcentajes y descuentos
- auth.users
- Tomar decisiones con if y else
- Más de dos caminos con elif
- Combinar condiciones: and, or, not
- División entera (//) y residuo (%)
- Mostrar resultados con f-strings
- dependencies
- Operadores aritméticos
- eslint.config.js
- ExpeditionMap.tsx
- Funciones: def, parámetros y return
- Banderas, break y continue
- LessonPage.tsx
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
- cosmetics.ts
- Binario y decimal
- Fechas y edades
- README.md
- Sacar los dígitos de un número con un ciclo
- Desglose en cascada: posiciones y billetes
- exam_attempts
- Tu primer pseudocódigo
- Decisiones en pseudocódigo
- Tablas de conversión: romanos y números a letras
- Recorrer un vector: sumar, el mayor y buscar
- Funciones con vectores y programas con menú
- Ordenar: intercambios y el método de selección
- Ciclos en pseudocódigo
- Vectores en pseudocódigo
- public.submit_exam
- Dígitos en pseudocódigo
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
- Símbolos balanceados
- Salir de un laberinto
- Varias cifras, negativos y errores
- numpy: operar con todo el vector a la vez
- DataFrame: una tabla
- Qué es una pila
- Clases desde cero
- La pila con un vector y un puntero
- Infix, prefix y postfix
- Evaluar postfix con una pila
- De infix a postfix
- Expresiones con x y despejar x
- Filtros
- Leer archivos CSV y resumir
- Usos: invertir, cambiar de base y reemplazar
- Jerarquía de operadores
- Series: un vector con nombres
- Regex y pandas: de texto suelto a tabla
- Funciones y textos en pseudocódigo
- ADR-002: Python en el navegador con Pyodide dentro de un Web Worker
- ADR-003: Supabase como base de datos y autenticación
- ADR-004: El navegador enseña, el servidor certifica
- ADR-006: Desbloqueo por dominio con 85% y repasos espaciados
- ADR-007: Modo invitado sin Supabase
- ADR-008: Estado: TanStack Query para el servidor, Zustand para la interfaz
- ADR-009: ReactBits con carga diferida y movimiento reducido
- ADR-010: Ningún archivo de más de 250 líneas
- ExamPage.tsx
- Cómo agregar un cosmético al taller
- content/types.ts
- Ordenar y buscar en pseudocódigo
- Matrices en pseudocódigo
- devDependencies
- El algoritmo detrás de pandas, en pseudocódigo
- Stacks en pseudocódigo
- Infix a postfix en pseudocódigo
- HomePage.tsx
- ADR-005: Contenido como archivos en `content/`
- public.start_exam
- public.record_practice
- package.json
- anon

## God Nodes (most connected - your core abstractions)
1. `react` - 37 edges
2. `Button()` - 32 edges
3. `displayId()` - 30 edges
4. `useAuth()` - 27 edges
5. `react-router-dom` - 26 edges
6. `Robot()` - 24 edges
7. `useLeaderboard()` - 22 edges
8. `useModuleViews()` - 22 edges
9. `App()` - 20 edges
10. `vitest` - 19 edges

## Surprising Connections (you probably didn't know these)
- `Consecuencias` --references--> `ExerciseDef`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/types.ts
- `Consecuencias` --references--> `validateExercise()`  [INFERRED]
  docs/adr/005-contenido-archivos.md → src/content/validate.ts
- `run()` --calls--> `execute()`  [EXTRACTED]
  tools/exam-bank.mjs → src/features/runner/execute.ts
- `LessonBody()` --calls--> `RunnableCode()`  [EXTRACTED]
  src/features/lesson/LessonBody.tsx → src/features/lesson/RunnableCode.tsx
- `RunnableCode()` --calls--> `Button()`  [EXTRACTED]
  src/features/lesson/RunnableCode.tsx → src/ui/primitives/Button.tsx

## Import Cycles
- None detected.

## Communities (140 total, 21 thin omitted)

### Community 0 - "Variables y tipos"
Cohesion: 0.40
Nodes (4): El orden importa, Los tres tipos del módulo, Nombres de variables, Variables y tipos

### Community 1 - "react"
Cohesion: 0.09
Nodes (33): TestCase, CodeEditor(), Props, CodeStep(), Props, ANALYSIS, ExerciseFlow(), Props (+25 more)

### Community 2 - "steps"
Cohesion: 0.08
Nodes (28): runs-on, services, steps, DATABASE_URL, POSTGRES_DB, POSTGRES_PASSWORD, jobs, database (+20 more)

### Community 3 - "Acumuladores y contadores"
Cohesion: 0.25
Nodes (7): Acumulador: ¿cuánto suman?, Acumulador de multiplicación, Acumuladores y contadores, Acumular texto, Contador: ¿cuántos hay?, Los tres errores típicos, Promedio

### Community 4 - "Publicar pylab en Cloudflare"
Cohesion: 0.07
Nodes (26): 1.1 Crear el proyecto, 1.2 Crear las tablas, 1.3 Activar el inicio de sesión, 1.4 Copiar las llaves, 1.5 Ojo con el plan gratis, 1. Supabase (base de datos e inicio de sesión), 2. Publicar la web, Antes de empezar (+18 more)

### Community 5 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, baseUrl, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+10 more)

### Community 6 - "translate.ts"
Cohesion: 0.07
Nodes (43): ADR-0002, ADR-0006, pyodide, mod(), blocks, files, inputs, root (+35 more)

### Community 7 - "¿Qué es un programa?"
Cohesion: 0.50
Nodes (3): Antes de seguir, `print` muestra cosas en pantalla, ¿Qué es un programa?

### Community 8 - "lint"
Cohesion: 0.22
Nodes (8): run, check-lines, lint, glob, run, pre-commit, commands, parallel

### Community 9 - "public.submit_exam"
Cohesion: 0.18
Nodes (7): public.submit_exam(), public.submit_exam(), public.exam_review(), public.submit_exam(), public.exam_payload(), public.exam_review(), public.submit_exam()

### Community 11 - "Continuar pylab en otra sesión"
Cohesion: 0.17
Nodes (12): Banco oculto del examen, Comandos útiles, Continuar pylab en otra sesión, Cosas que ya fallaron (no repetir), Documentos de diseño (en claude.ai, privados de Paolo), Estado actual (fases 1, 2 y 3 cerradas), Fase 4: repasos, historial y ReactBits (siguiente), Módulos y ejercicios del PDF C5 (+4 more)

### Community 13 - "steps"
Cohesion: 0.06
Nodes (34): runs-on, steps, concurrency, cancel-in-progress, group, environment, needs, runs-on (+26 more)

### Community 14 - "public.missions_of"
Cohesion: 0.13
Nodes (15): public.gear_unlocked(), public.missions_of(), public.my_quests(), public.study_days(), public.xp_of(), public.leaderboard(), public.public_profile(), public.station_of() (+7 more)

### Community 15 - "ADR-001: React + Vite + TypeScript en Cloudflare Pages"
Cohesion: 0.40
Nodes (4): ADR-001: React + Vite + TypeScript en Cloudflare Pages, Consecuencias, Contexto, Decisión

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

### Community 21 - "auth.users"
Cohesion: 0.14
Nodes (10): public.profiles, public.module_mastery, on_auth_user_created, public.handle_new_user(), public.lesson_progress, public.mark_lesson_read(), public.fill_missing_mastery(), auth.users (+2 more)

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
Nodes (17): dependencies, codemirror@6.0.2, @codemirror/commands@6.11.1, @codemirror/view@6.43.15, marked@18.2.0, pyodide@314.0.7, react@^19.3.1, react-dom@^19.3.1 (+9 more)

### Community 31 - "eslint.config.js"
Cohesion: 0.22
Nodes (8): @eslint/js@^9.39.5, eslint-plugin-react-hooks@^5.2.0, globals@^16.5.0, typescript-eslint@^8.74.0, @eslint/js, eslint-plugin-react-hooks, globals, typescript-eslint

### Community 32 - "ExpeditionMap.tsx"
Cohesion: 0.16
Nodes (16): Island, islandOf(), ISLANDS, MINI_BOSSES, LessonScene(), CENTERS, COLOR, SPOTS (+8 more)

### Community 35 - "Funciones: def, parámetros y return"
Cohesion: 0.20
Nodes (9): Antes de seguir, Definir y llamar, Funciones: def, parámetros y return, Funciones que devuelven True o False, Funciones que usan otras funciones, Reto: una función que se llama a sí misma, return: devolver un resultado, Variables locales (+1 more)

### Community 36 - "Banderas, break y continue"
Cohesion: 0.29
Nodes (6): Banderas, break y continue, Banderas: recordar si algo pasó, break: salir del ciclo ya, Contador o bandera, continue: saltar a la siguiente vuelta, Probar menos divisores

### Community 37 - "LessonPage.tsx"
Cohesion: 0.09
Nodes (31): Asignar con ← y comparar con =, Begin, read y write, Errores comunes (pylab te los marca), for: de un número a otro, Funciones, Guía de pseudocódigo, if, else if y else, La sangría es obligatoria (+23 more)

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

### Community 53 - "cosmetics.ts"
Cohesion: 0.06
Nodes (67): react, react-router-dom, App(), Layout(), Providers(), AuthProvider(), LoginPage(), AchievementPopup() (+59 more)

### Community 54 - "Binario y decimal"
Cohesion: 0.22
Nodes (8): Antes de seguir, Binario y decimal, De binario a decimal: dos formas, De decimal a binario: dividir entre 2, Lo que Python ya trae, Qué significa cada posición, Reto: otras bases, Validar la entrada

### Community 55 - "Fechas y edades"
Cohesion: 0.25
Nodes (7): Antes de seguir, Contar días entre dos fechas, Fechas y edades, La trampa del cumpleaños, Leer una fecha en una sola línea, ¿Por qué pedir también la fecha de hoy?, Reto: años bisiestos

### Community 56 - "README.md"
Cohesion: 0.17
Nodes (9): Comandos, Contexto con graphify, Dónde está cada cosa, Reglas del proyecto pylab (Estudio-Labs), Reglas que no se rompen, Documentación, Empezar, Estado (+1 more)

### Community 57 - "Sacar los dígitos de un número con un ciclo"
Cohesion: 0.29
Nodes (6): Antes de seguir, El caso del cero, Reto: máximo común divisor (Euclides), Reto: números de Armstrong, Sacar los dígitos de un número con un ciclo, Tres patrones con el mismo ciclo

### Community 58 - "Desglose en cascada: posiciones y billetes"
Cohesion: 0.29
Nodes (6): Antes de seguir, Centenas, decenas y unidades, Desglose en cascada: posiciones y billetes, La misma idea en otros lados, ¿Por qué de mayor a menor?, Repartir un monto en billetes

### Community 59 - "exam_attempts"
Cohesion: 0.33
Nodes (4): public.gear_unlocked(), public.gear_items, public.gear_slot(), public.gear_unlocked()

### Community 61 - "Tu primer pseudocódigo"
Cohesion: 0.29
Nodes (6): Asignar con la flecha ←, Begin y End, Lo que pylab te marca, Operaciones, read y write, Tu primer pseudocódigo

### Community 62 - "Decisiones en pseudocódigo"
Cohesion: 0.33
Nodes (5): and, or, not, Comparar con =, Decisiones en pseudocódigo, Un if dentro de otro, Varias opciones

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

### Community 68 - "Ciclos en pseudocódigo"
Cohesion: 0.33
Nodes (5): Ciclos anidados, Ciclos en pseudocódigo, Contadores y acumuladores, for: de un número a otro, while: mientras se cumpla

### Community 69 - "Vectores en pseudocódigo"
Cohesion: 0.33
Nodes (5): Buscar un dato (Encontrar), Leer y mostrar un vector, Suma de vectores, Un detalle de tus labs, Vectores en pseudocódigo

### Community 70 - "public.submit_exam"
Cohesion: 0.23
Nodes (4): public.start_exam(), public.start_exam(), public.start_review(), public.submit_exam()

### Community 71 - "Dígitos en pseudocódigo"
Cohesion: 0.40
Nodes (4): Armar un número al revés, Así va en tu entrega, Dígitos en pseudocódigo, Sumar los dígitos

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

### Community 90 - "Símbolos balanceados"
Cohesion: 0.25
Nodes (7): Decir dónde falla, El algoritmo, El programa, Los tres errores, Parejas sin muchos `if`, Por qué una pila, Símbolos balanceados

### Community 92 - "Salir de un laberinto"
Cohesion: 0.25
Nodes (7): Dibujar el camino, El algoritmo, El laberinto como matriz, El programa, Errores típicos, Míralo paso a paso, Salir de un laberinto

### Community 93 - "Varias cifras, negativos y errores"
Cohesion: 0.25
Nodes (7): 1. Separar en tokens, 2. El menos que no resta, 3. Validar antes de convertir, 4. Dividir entre 0, 5. Decimales que casi son enteros, Todo junto, Varias cifras, negativos y errores

### Community 94 - "numpy: operar con todo el vector a la vez"
Cohesion: 0.25
Nodes (7): Comparar todo el arreglo: máscaras, Estadísticas en una línea, Importar, Mostrar números de numpy, numpy: operar con todo el vector a la vez, Operar con todo el arreglo, Un arreglo es un vector de tamaño fijo

### Community 95 - "DataFrame: una tabla"
Cohesion: 0.25
Nodes (7): Agregar filas leídas, Columnas calculadas, Crear una tabla desde un diccionario, DataFrame: una tabla, ¿Por qué no `print(df)`?, Recorrer filas, Una columna, una fila, una casilla

### Community 96 - "Qué es una pila"
Cohesion: 0.29
Nodes (6): ¿Dónde se usan las pilas?, Las cuatro operaciones, Lo que vas a hacer en este módulo, Los dos errores de una pila, Míralo paso a paso, Qué es una pila

### Community 97 - "Clases desde cero"
Cohesion: 0.29
Nodes (6): Clase y objeto, Clases desde cero, El problema, Errores típicos, Mirar dentro de un objeto, Un método que devuelve algo

### Community 98 - "La pila con un vector y un puntero"
Cohesion: 0.29
Nodes (6): El código, La idea, La pila con un vector y un puntero, Mostrar la pila, `raise`: avisar que algo salió mal, `try` / `except`: atrapar el error

### Community 99 - "Infix, prefix y postfix"
Cohesion: 0.29
Nodes (6): El plan del módulo, Infix, prefix y postfix, Leer postfix a mano, Pasar de infix a postfix a mano, Tres formas de escribir lo mismo, ¿Y prefix?

### Community 100 - "Evaluar postfix con una pila"
Cohesion: 0.29
Nodes (6): Cuándo una expresión no se puede evaluar, El orden importa, Evaluar postfix con una pila, Mostrar el resultado, Un carácter por dato, Varias cifras: separar con espacios

### Community 101 - "De infix a postfix"
Cohesion: 0.29
Nodes (6): Con paréntesis y potencias: `(a+b)*c^2^d`, De infix a postfix, Diferencias con tu tarea, El programa, Las reglas, Míralo con `a+b*c-d`

### Community 102 - "Expresiones con x y despejar x"
Cohesion: 0.29
Nodes (6): Despejar x en una ecuación lineal, El programa completo, Expresiones con x y despejar x, La x es un operando más, Los casos raros, ¿Y si no es lineal?

### Community 103 - "Filtros"
Cohesion: 0.29
Nodes (6): Filtrar y luego calcular, Filtros, Ordenar, Si el filtro no deja nada, Una condición, Varias condiciones: `&`, `|` y `~`

### Community 104 - "Leer archivos CSV y resumir"
Cohesion: 0.29
Nodes (6): Escribir un CSV, La posición dentro de un filtro, Las estadísticas de siempre, Leer archivos CSV y resumir, `read_csv`, Resumir por grupo: `groupby`

### Community 105 - "Usos: invertir, cambiar de base y reemplazar"
Cohesion: 0.33
Nodes (5): Decimal a binario, El patrón de la pila auxiliar, Invertir, Reemplazar (ejercicio 32 del PDF), Usos: invertir, cambiar de base y reemplazar

### Community 106 - "Jerarquía de operadores"
Cohesion: 0.33
Nodes (5): Jerarquía de operadores, La jerarquía como función, La tabla, Misma jerarquía: ¿quién va primero?, Practica a mano

### Community 107 - "Series: un vector con nombres"
Cohesion: 0.33
Nodes (5): Leer casillas, Lo mismo que numpy, y más, Ordenar y contar, Recorrer una Series, Series: un vector con nombres

### Community 108 - "Regex y pandas: de texto suelto a tabla"
Cohesion: 0.33
Nodes (5): El plan, Grupos con nombre de columna, Promedio por fila, Regex y pandas: de texto suelto a tabla, Resumen del módulo

### Community 109 - "Funciones y textos en pseudocódigo"
Cohesion: 0.40
Nodes (4): Funciones y textos en pseudocódigo, Function … End function, Textos, Varias respuestas

### Community 110 - "ADR-002: Python en el navegador con Pyodide dentro de un Web Worker"
Cohesion: 0.40
Nodes (4): ADR-002: Python en el navegador con Pyodide dentro de un Web Worker, Consecuencias, Contexto, Decisión

### Community 111 - "ADR-003: Supabase como base de datos y autenticación"
Cohesion: 0.40
Nodes (4): ADR-003: Supabase como base de datos y autenticación, Consecuencias, Contexto, Decisión

### Community 112 - "ADR-004: El navegador enseña, el servidor certifica"
Cohesion: 0.40
Nodes (4): ADR-004: El navegador enseña, el servidor certifica, Consecuencias, Contexto, Decisión

### Community 113 - "ADR-006: Desbloqueo por dominio con 85% y repasos espaciados"
Cohesion: 0.40
Nodes (4): ADR-006: Desbloqueo por dominio con 85% y repasos espaciados, Consecuencias, Contexto, Decisión

### Community 114 - "ADR-007: Modo invitado sin Supabase"
Cohesion: 0.40
Nodes (4): ADR-007: Modo invitado sin Supabase, Consecuencias, Contexto, Decisión

### Community 115 - "ADR-008: Estado: TanStack Query para el servidor, Zustand para la interfaz"
Cohesion: 0.40
Nodes (4): ADR-008: Estado: TanStack Query para el servidor, Zustand para la interfaz, Consecuencias, Contexto, Decisión

### Community 116 - "ADR-009: ReactBits con carga diferida y movimiento reducido"
Cohesion: 0.40
Nodes (4): ADR-009: ReactBits con carga diferida y movimiento reducido, Consecuencias, Contexto, Decisión

### Community 117 - "ADR-010: Ningún archivo de más de 250 líneas"
Cohesion: 0.40
Nodes (4): ADR-010: Ningún archivo de más de 250 líneas, Consecuencias, Contexto, Decisión

### Community 118 - "ExamPage.tsx"
Cohesion: 0.10
Nodes (37): ADR-0004, marked, buildAnswers(), Run, exam, bossLife(), pointsOf(), BossBattle() (+29 more)

### Community 123 - "content/types.ts"
Cohesion: 0.07
Nodes (36): ADR-0005, Consecuencias, vitest, exerciseFiles, EXERCISES, lessonFiles, LESSONS, parseLesson() (+28 more)

### Community 126 - "Ordenar y buscar en pseudocódigo"
Cohesion: 0.40
Nodes (4): Burbuja, Búsqueda binaria, Ordenar y buscar en pseudocódigo, Selección

### Community 127 - "Matrices en pseudocódigo"
Cohesion: 0.40
Nodes (4): Matrices en pseudocódigo, Multiplicar matrices, Recorrer una matriz, Sumar matrices (tu lab Matrices)

### Community 128 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint@^9.39.5, lefthook@^1.13.6, @types/node@^22.20.5, @types/react-dom@^19.3.0, typescript@~5.8.3, vitest@^3.2.7, wrangler@^4.168.0 (+6 more)

### Community 130 - "El algoritmo detrás de pandas, en pseudocódigo"
Cohesion: 0.40
Nodes (4): Contar por grupo (`df["seccion"].value_counts()`), El algoritmo detrás de pandas, en pseudocódigo, Filtrar filas (`df[df["nota"] >= 61]`), Promedio de una columna (`df["nota"].mean()`)

### Community 131 - "Stacks en pseudocódigo"
Cohesion: 0.50
Nodes (3): Invertir un texto, Paréntesis balanceados, Stacks en pseudocódigo

### Community 133 - "Infix a postfix en pseudocódigo"
Cohesion: 0.50
Nodes (3): Evaluar postfix, Infix a postfix en pseudocódigo, Qué se corrigió de la entrega original

### Community 135 - "HomePage.tsx"
Cohesion: 0.06
Nodes (67): ADR-0008, @supabase/supabase-js, @tanstack/react-query, exercisesOf(), getExercise(), lessonsOf(), files, MODULES (+59 more)

### Community 138 - "ADR-005: Contenido como archivos en `content/`"
Cohesion: 0.33
Nodes (4): ADR-005: Contenido como archivos en `content/`, Contexto, Decisión, Decisiones de arquitectura (ADR)

### Community 139 - "public.start_exam"
Cohesion: 0.38
Nodes (8): public.exercises, public.modules, exam_attempts_user_module, exam_items_module, public.exam_attempts, public.exam_items, public.exam_payload(), public.exam_problems

### Community 140 - "public.record_practice"
Cohesion: 0.29
Nodes (6): practice_attempts_user_exercise, public.practice_attempts, public.record_practice(), public.catalog_items, public.mark_lesson_read(), public.record_practice()

### Community 141 - "package.json"
Cohesion: 0.18
Nodes (10): @codemirror/lang-python@6.2.1, @codemirror/theme-one-dark@6.1.3, @types/react@^19.3.0, name, private, type, version, @codemirror/lang-python (+2 more)

### Community 146 - "anon"
Cohesion: 0.15
Nodes (11): public.leaderboard(), public.xp_of(), public.gear_unlocked(), public.leaderboard(), public.my_gear(), public.set_avatar_gear(), public.gear_unlocked(), public.is_first_place() (+3 more)

## Knowledge Gaps
- **5 isolated node(s):** `ADR-0004`, `ADR-0006`, `ADR-0002`, `ADR-0005`, `ADR-0008`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 765 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Consecuencias` connect `content/types.ts` to `ADR-005: Contenido como archivos en `content/``?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **What connects `ADR-0004`, `ADR-0006`, `ADR-0002` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.08705882352941176 - nodes in this community are weakly interconnected._
- **Why does `ADR-005: Contenido como archivos en `content/`` connect `ADR-005: Contenido como archivos en `content/`` to `content/types.ts`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Should `steps` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._
- **Why does `ExerciseDef` connect `content/types.ts` to `react`, `cosmetics.ts`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Should `Publicar pylab en Cloudflare` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._