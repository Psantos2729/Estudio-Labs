# Continuar pylab en otra sesión

Archivo de traspaso. Léelo completo antes de tocar código; luego lee `CLAUDE.md` y `docs/adr/`.
Última actualización: 24 de noviembre de 2026, al cerrar la fase 3.

## Para empezar la nueva sesión

Pega esto como primer mensaje en Claude Code, abierto en la carpeta del repo:

> Lee `docs/CONTINUAR.md`, `CLAUDE.md` y `docs/adr/README.md`. Corre `npm install` y
> `npm run verify`. Después propón el plan de la fase 4 (repasos espaciados e historial)
> en pasos pequeños y espera mi aprobación antes de programar.

## Qué es el proyecto

Plataforma web para que Paolo (y cualquier estudiante) aprenda Python desde cero y se prepare
para los laboratorios de C5. Nadie avanza de módulo sin dominarlo: examen con casos ocultos
calificado en el servidor, 85% para aprobar, 1 hora de espera si repruebas, repasos a los
3, 7, 21 y 60 días.

## Estado actual (fases 1, 2 y 3 cerradas)

| Pieza | Estado |
| --- | --- |
| Repo | https://github.com/Psantos2729/Estudio-Labs (público), rama `main` |
| Web publicada | https://psantos2729.github.io/Estudio-Labs/ (GitHub Pages) |
| Base de datos | Supabase, proyecto `udkrnjkamwjsrdcyezlk`, migraciones 001–010 + seed + banco del examen (M00, M01) aplicados |
| Login | Enlace mágico por correo y Google (app de OAuth publicada) |
| Copia local | `C:\Users\suizo\Documents\Tareas\TutoríasProgramación\Guía Labs\` (hacer `git pull`) |

Lo que ya funciona:

- Mapa de módulos M0–M12 con el tema "Terminal nocturna" (oscuro, JetBrains Mono, verde #3FB950).
- Modo invitado sin Supabase: solo M0 abierto, nada se guarda.
- Al registrarse, un trigger crea el perfil y deja M0 disponible y el resto bloqueado.
- El cliente solo puede **leer** su progreso; no puede escribirlo (probado en `supabase/tests/`).
- Página `/privacidad` (la pide Google para publicar el login).
- CI en cada PR: líneas, lint, tipos, pruebas, build y pruebas SQL en Postgres.
- Publicación automática a GitHub Pages en cada merge a `main` (`.github/workflows/pages.yml`).
- Fase 2: lecciones, editor Python con Pyodide en un worker, ejercicios con pistas y pruebas
  públicas, práctica guardada por RPC, contenido de M0 y M1, portada con "Continuar".
- Fase 3: examen de dominio en `/examen/MXX` (migraciones 009 y 010, `src/features/exam/`).
  `start_exam` saca 12 puntos al azar del banco (2 problemas × 4 casos ocultos + 4 preguntas),
  45 min, sin pistas; el navegador corre el código con las entradas y `submit_exam` califica.
  85% domina el módulo, abre el siguiente y agenda el repaso a 3 días; si no, 1 hora de espera.

### Banco oculto del examen

Fuentes en `private/exam/MXX/gen.py` (fuera del repo; copia en la carpeta del proyecto de
claude.ai, `soluciones-privadas/examen/`). Para agregar un módulo: escribir su `gen.py`
(problemas con solución y entradas, y preguntas), correr
`node tools/exam-bank.mjs M00 M01 MXX > private/exam/banco-examen.sql` y pegar ese `.sql` en el
SQL Editor de Supabase. Hoy solo M00 y M01 tienen banco: los demás módulos dan
"todavía no tiene banco de preguntas" al empezar el examen.

## Reglas de Paolo (no se negocian)

1. Ningún archivo de más de 250 líneas (`npm run check-lines`, lefthook y CI lo bloquean).
2. Todo en español. Lenguaje de los ejercicios: Python.
3. Herramientas gratis (es estudiante, sin presupuesto).
4. Nunca modificar sus carpetas de tareas en
   `C:\Users\suizo\Documents\Tareas\Computación` y `...\Programación`: solo lectura.
   Nunca inventar el contenido de un archivo que no se pudo abrir.
5. El repo es público: soluciones y casos ocultos van en `private/` (ignorado). CI falla si se suben.
6. Progreso real: nadie pasa de módulo sin entender todo lo del módulo. Enseñar el
   **razonamiento**, no solo la respuesta.
7. Usar ReactBits (copiado a `src/ui/reactbits`, carga diferida, respeta movimiento reducido).
8. Usar graphify: `graphify update .` después de cada feature (paquete pip `graphifyy[sql]`).
9. Antes de construir algo grande, proponer y esperar su aprobación.

## Módulos y ejercicios del PDF C5

El PDF "Ejercicios preparatorios para Laboratorios de C5" tiene 37 ejercicios. Cada uno está
asignado a un solo módulo en `content/*/module.json` (lo valida `src/content/modules.test.ts`).

| Módulo | Tema | Ejercicios del PDF |
| --- | --- | --- |
| M0 | Primeros pasos | — |
| M1 | Decisiones | 1, 6, 7, 8, 11, 12, 13 |
| M2 | Ciclos | 2, 3, 4, 5, 10, 15, 19 |
| M3 | Números y dígitos | 9, 14, 16, 17 |
| M4 | Funciones y cadenas | 18, 20 |
| M5 | Vectores | 31, 34 |
| M6 | Ordenar y buscar | 30, 33, 35, 36, 37 |
| M7 | Matrices | (tareas reales) |
| M8 | Archivos de texto | 21–26 |
| M9 | Registros binarios | 27–29 |
| M10 | Stacks | 32 |
| M11 | Infix y postfix | (tareas reales) |
| M12 | Datos con pandas | (tareas reales) |

Erratas conocidas del PDF: el 13 no cubre promedios ≤ 5.5; el 28 dice "4 rutinas" pero lista 3;
el 32 dice "segundo" donde debería decir "primero"; el 35 pide comparaciones en counting sort
(que no compara: úsalo como pregunta trampa).

Formato de entrega que Paolo usa en clase (para los retos finales): portada, descripción,
análisis (entrada, salida, proceso, casos especiales), pseudocódigo, diagrama de flujo, pruebas
de corrida y `.py` con encabezado "Documentación interna".

## Próximas fases

### Fase 4: repasos, historial y ReactBits (siguiente)

- Repasos espaciados (3/7/21/60 días) que reabren el módulo si se fallan.
- Historial de trabajos pasados; componentes ReactBits (DecryptedText, DotGrid, CountUp,
  ClickSpark, ElectricBorder, LetterGlitch).

## Cosas que ya fallaron (no repetir)

- **GitHub Pages debe estar en Source = "GitHub Actions"**. Con "Deploy from a branch" se
  publica el código sin compilar y la web sale en blanco.
- GitHub Pages guarda copias hasta 10 minutos: tras publicar, probar en incógnito o esperar.
- La URL de Supabase a veces se copia con `/rest/v1/`; `src/lib/supabaseUrl.ts` ya la limpia.
- En `gh`, abrir PRs con `gh api repos/Psantos2729/estudio-labs/pulls` (GraphQL da 403).
  No se puede pedir revisión a Paolo porque él es el autor; solo asignarlo.
- `npx supabase init` genera un `config.toml` de más de 250 líneas: usar el mínimo que ya existe.
- `wrangler.jsonc` sigue en el repo por si algún día se quiere Cloudflare; hoy no se usa.

## Comandos útiles

```bash
npm install
npm run dev          # http://localhost:5173 (necesita .env.local para guardar progreso)
npm run verify       # líneas + lint + tipos + pruebas
npm run build
npm run seed         # regenera supabase/seed.sql desde content/
DATABASE_URL=postgresql://... bash tools/test-db.sh   # migraciones + pruebas de RLS
graphify update .    # actualizar el grafo de contexto
```

`.env.local` (no se sube):

```bash
VITE_SUPABASE_URL=https://udkrnjkamwjsrdcyezlk.supabase.co
VITE_SUPABASE_ANON_KEY=<llave anon o publishable de Supabase>
```

## Documentos de diseño (en claude.ai, privados de Paolo)

- Propuesta inicial (3 opciones): https://claude.ai/artifact/1um5xktoH5wMs7JycdsEXE
- Propuestas gráficas (elegida la 1, Terminal nocturna): https://claude.ai/artifact/MYYdsC9XXhPVA6F4H4YhhF
- Arquitectura aprobada (17 tablas, flujos, riesgos): https://claude.ai/artifact/5Vsg7S9qM2a9rMXJLvuiK7
