# Publicar pylab en Cloudflare

Cloudflare toma el código de GitHub, ejecuta `npm run build` y publica la carpeta `dist`
en una dirección `https://estudio-labs.<tu-subdominio>.workers.dev`. Es gratis y se actualiza solo con cada cambio.

Los nombres de los botones pueden variar un poco porque Cloudflare cambia su panel; la idea
de cada paso es la misma.

## Antes de empezar

1. **Fusiona el PR #1** en GitHub (botón verde *Merge pull request*). Cloudflare publica la rama
   `main`, y hoy `main` solo tiene el commit inicial: sin fusionar, la primera publicación saldría vacía.
2. Ten a mano la *Project URL* y la llave *anon* de Supabase (guía de Supabase, paso 1.4).
   Si aún no configuras Supabase, puedes publicar igual: la web quedará en modo invitado.

## Paso 1. Entrar a Workers & Pages

1. Con tu sesión iniciada, abre el enlace directo
   <https://dash.cloudflare.com/?to=/:account/workers-and-pages> (si pregunta, elige tu cuenta).
2. Si prefieres buscarlo: el menú izquierdo lo guarda dentro de **Compute** o **Build**,
   o escribe **Pages** en la búsqueda de arriba (`Ctrl + K`).
3. Pulsa el botón azul **Create** (o **Create application**).

## Paso 2. Crear la aplicación desde GitHub

Cloudflare ahora publica sitios como este con **Workers** (archivos estáticos). El repo ya trae
`wrangler.jsonc`, que le dice a Cloudflare que publique la carpeta `dist`.

1. Pulsa **Create application** y elige **Import a repository** (o **Connect GitHub**).
2. GitHub te pide instalar la app **Cloudflare Workers and Pages**: elige tu cuenta `Psantos2729`,
   marca **Only select repositories** → `Estudio-Labs` y pulsa **Install & Authorize**.
3. De vuelta en Cloudflare, selecciona `Psantos2729/Estudio-Labs`.

## Paso 3. Configurar el proyecto

| Campo | Valor | Para qué sirve |
| --- | --- | --- |
| Project name | `estudio-labs` | **Debe ser igual** al `name` de `wrangler.jsonc`; da la dirección `estudio-labs.<tu-subdominio>.workers.dev` |
| Build command | `npm run build` | Revisa tipos y compila la app en `dist` |
| Deploy command | `npx wrangler deploy` (el que trae) | Sube `dist` a Cloudflare |
| Preview command | `npx wrangler versions upload` o el que trae | Versiones de prueba para otras ramas |
| Enable Preview builds | activado | Cada rama o PR tiene su vista previa |
| Protect with Cloudflare Access | desactivado | La web debe ser pública |

## Paso 4. Variables de compilación

Abre **Advanced settings** (abajo, antes de *Deploy*):

1. *Root directory*: vacío. *Production branch* (si aparece): `main`.
2. En **Build variables** (no en *Variables and Secrets* de ejecución) agrega:

| Variable | Valor |
| --- | --- |
| `NODE_VERSION` | `22` |
| `VITE_SUPABASE_URL` | tu *Project URL*, por ejemplo `https://abcd1234.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | tu llave *anon public* (empieza con `eyJ`) |

Van en *Build variables* porque Vite las mete en la app **al compilar**. Escribe los nombres
exactos, sin comillas. **Nunca** pongas aquí la llave `service_role`.

## Paso 5. Publicar

1. Pulsa **Deploy**. Verás el registro: tarda 1 o 2 minutos y debe terminar en *Success*.
2. Abre la dirección que te muestra (`https://estudio-labs.<tu-subdominio>.workers.dev`).
   Deberías ver el mapa de módulos con el tema oscuro.

## Paso 6. (Opcional) Si tu panel sí muestra Pages

Si en *Create application* ves una pestaña **Pages** → **Connect to Git**, también sirve:
build `npm run build`, output `dist`, y las mismas tres variables. La dirección será `*.pages.dev`.

## Paso 7. Avisarle a Supabase tu dirección

Sin esto, el enlace mágico del correo te mandaría a `localhost`.

1. En Supabase: **Authentication → URL Configuration**.
2. *Site URL*: la dirección del paso 5
3. *Redirect URLs*: agrega `https://estudio-labs.<tu-subdominio>.workers.dev/**` y `https://*-estudio-labs.<tu-subdominio>.workers.dev/**`
   (la segunda cubre las vistas previas de cada PR).

## Revisar que todo funciona

- Abre la web, pulsa **entrar**, escribe tu correo y abre el enlace que te llega.
  Arriba a la derecha debe aparecer tu correo en lugar de *invitado*.
- Si cambias una variable de entorno después, ve a **Settings → Build → Build variables**, guárdala
  y luego en **Deployments** pulsa **Retry deployment**: las variables se leen al compilar.

## Cómo se actualiza

- Cada merge a `main` publica una nueva versión automáticamente.
- Cada PR obtiene su propia vista previa; Cloudflare la deja como comentario o check en el PR.

## Si algo falla

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| La compilación falla en `tsc` o `npm ci` | Versión de Node vieja | Revisa que `NODE_VERSION` sea `22` y reintenta |
| La página sale en blanco | Output directory mal escrito | Debe ser `dist`, en **Settings → Build** |
| Dice "Supabase no está configurado" | Variables con nombre incorrecto o puestas después de compilar | Corrige los nombres y pulsa **Retry deployment** |
| El enlace del correo abre `localhost` | Falta el paso 7 | Configura *Site URL* en Supabase |
| Falla con "name mismatch" | El nombre del proyecto no es `estudio-labs` | Usa `estudio-labs` o cambia `name` en `wrangler.jsonc` |
| Al recargar una página sale 404 | Falta el modo SPA | `wrangler.jsonc` ya trae `not_found_handling: single-page-application` |
