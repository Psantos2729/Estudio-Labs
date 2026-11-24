# Publicar pylab en Cloudflare Pages

Cloudflare Pages toma el código de GitHub, ejecuta `npm run build` y publica la carpeta `dist`
en una dirección `https://<nombre>.pages.dev`. Es gratis y se actualiza solo con cada cambio.

Los nombres de los botones pueden variar un poco porque Cloudflare cambia su panel; la idea
de cada paso es la misma.

## Antes de empezar

1. **Fusiona el PR #1** en GitHub (botón verde *Merge pull request*). Cloudflare publica la rama
   `main`, y hoy `main` solo tiene el commit inicial: sin fusionar, la primera publicación saldría vacía.
2. Ten a mano la *Project URL* y la llave *anon* de Supabase (guía de Supabase, paso 1.4).
   Si aún no configuras Supabase, puedes publicar igual: la web quedará en modo invitado.

## Paso 1. Entrar a Workers & Pages

1. Entra a <https://dash.cloudflare.com> con tu cuenta.
2. En el menú de la izquierda, abre **Compute (Workers)** → **Workers & Pages**.
   En algunas cuentas aparece directamente como **Workers & Pages**.
3. Pulsa el botón azul **Create** (o **Create application**).

## Paso 2. Elegir Pages (no Workers)

Cloudflare muestra primero la opción de crear un *Worker*. Nosotros queremos **Pages**:

1. Busca la pestaña **Pages** arriba, o el enlace al final que dice
   *"Looking to deploy Pages? Get started"*.
2. Elige **Import an existing Git repository** → **Get started**.

## Paso 3. Conectar GitHub

1. Pulsa **Connect GitHub**. Se abre una ventana de GitHub.
2. GitHub te pide instalar la app **Cloudflare Workers and Pages**. Elige tu cuenta `Psantos2729`.
3. En *Repository access* elige **Only select repositories** y marca `Estudio-Labs`.
   (Así Cloudflare no ve tus otros repos.)
4. Pulsa **Install & Authorize**. Vuelves a Cloudflare.
5. Selecciona `Psantos2729/Estudio-Labs` en la lista y pulsa **Begin setup**.

## Paso 4. Configurar la compilación

Llena la pantalla *Set up builds and deployments* exactamente así:

| Campo | Valor | Para qué sirve |
| --- | --- | --- |
| Project name | `estudio-labs` | Define la dirección: `estudio-labs.pages.dev` (si está ocupado, elige otro) |
| Production branch | `main` | La rama que se publica como versión oficial |
| Framework preset | `React (Vite)` (o `None`) | Solo rellena los campos de abajo |
| Build command | `npm run build` | Revisa tipos y compila la app |
| Build output directory | `dist` | Carpeta que Vite genera y Cloudflare publica |
| Root directory | (vacío) | El proyecto está en la raíz del repo |

## Paso 5. Variables de entorno

En la misma pantalla, abre **Environment variables (advanced)** y pulsa **Add variable**
tres veces:

| Variable | Valor |
| --- | --- |
| `NODE_VERSION` | `22` |
| `VITE_SUPABASE_URL` | tu *Project URL*, por ejemplo `https://abcd1234.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | tu llave *anon public* (empieza con `eyJ`) |

Notas:

- Escribe los nombres exactos, en mayúsculas. Si falta el prefijo `VITE_`, la app no los ve.
- No pongas comillas ni espacios alrededor de los valores.
- **Nunca** pongas aquí la llave `service_role` de Supabase.

## Paso 6. Publicar

1. Pulsa **Save and Deploy**.
2. Verás el registro de la compilación. Tarda 1 o 2 minutos. Al final debe decir *Success*.
3. Pulsa **Continue to project** y abre la dirección `https://estudio-labs.pages.dev`.
   Deberías ver el mapa de módulos con el tema oscuro.

## Paso 7. Avisarle a Supabase tu dirección

Sin esto, el enlace mágico del correo te mandaría a `localhost`.

1. En Supabase: **Authentication → URL Configuration**.
2. *Site URL*: `https://estudio-labs.pages.dev`
3. *Redirect URLs*: agrega `https://estudio-labs.pages.dev/**` y `https://*.estudio-labs.pages.dev/**`
   (la segunda cubre las vistas previas de cada PR).

## Revisar que todo funciona

- Abre la web, pulsa **entrar**, escribe tu correo y abre el enlace que te llega.
  Arriba a la derecha debe aparecer tu correo en lugar de *invitado*.
- Si cambias una variable de entorno después, ve a **Settings → Variables and Secrets**, guárdala
  y luego en **Deployments** pulsa **Retry deployment**: las variables se leen al compilar.

## Cómo se actualiza

- Cada merge a `main` publica una nueva versión automáticamente.
- Cada PR obtiene su propia dirección de vista previa (`https://<rama>.estudio-labs.pages.dev`);
  Cloudflare la deja como comentario o check en el PR.

## Si algo falla

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| La compilación falla en `tsc` o `npm ci` | Versión de Node vieja | Revisa que `NODE_VERSION` sea `22` y reintenta |
| La página sale en blanco | Output directory mal escrito | Debe ser `dist`, en **Settings → Build** |
| Dice "Supabase no está configurado" | Variables con nombre incorrecto o puestas después de compilar | Corrige los nombres y pulsa **Retry deployment** |
| El enlace del correo abre `localhost` | Falta el paso 7 | Configura *Site URL* en Supabase |
| Al recargar una página sale 404 | Falta `_redirects` | Ya viene en `public/_redirects`; revisa que el build use `dist` |
