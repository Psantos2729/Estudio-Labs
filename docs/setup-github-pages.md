# Publicar pylab en GitHub Pages

La forma más simple: todo queda en GitHub. Cada merge a `main` publica la web en
`https://psantos2729.github.io/Estudio-Labs/`. El flujo está en `.github/workflows/pages.yml`.

## Paso 1. Activar GitHub Pages (una sola vez)

1. En el repo, abre **Settings** (pestaña de arriba) → **Pages** (menú izquierdo).
2. En *Build and deployment* → *Source*, elige **GitHub Actions**. No hace falta pulsar nada más.

## Paso 2. Guardar las llaves de Supabase (una sola vez)

1. En el repo: **Settings → Secrets and variables → Actions**.
2. Pulsa **New repository secret** dos veces:

| Name | Secret |
| --- | --- |
| `VITE_SUPABASE_URL` | tu *Project URL* de Supabase (`https://abcd1234.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | tu llave *anon public* de Supabase (empieza con `eyJ`) |

Escribe los nombres exactos. **Nunca** guardes la llave `service_role`.
Si no agregas los secretos, la web se publica igual, en modo invitado.

## Paso 3. Publicar

- Fusiona un PR a `main`, o ve a **Actions → Publicar en GitHub Pages → Run workflow**.
- En **Actions** verás el progreso; tarda 1 o 2 minutos. Al terminar, el paso *deploy* muestra la dirección.

## Paso 4. Avisarle a Supabase

En Supabase: **Authentication → URL Configuration**.

- *Site URL*: `https://psantos2729.github.io/Estudio-Labs/`
- *Redirect URLs*: agrega `https://psantos2729.github.io/Estudio-Labs/**` y `http://localhost:5173/**`

## Si algo falla

| Síntoma | Solución |
| --- | --- |
| El flujo falla en *deploy* con "Pages not enabled" | Haz el paso 1 y vuelve a correrlo |
| Dice "Supabase no está configurado" | Revisa los nombres de los secretos y corre el flujo de nuevo |
| El enlace del correo abre `localhost` | Haz el paso 4 |
