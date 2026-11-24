# Conectar Supabase y Cloudflare

Sin estos pasos la app funciona en **modo invitado** (solo M0, nada se guarda).
Ambos servicios son gratis para este proyecto.

## 1. Supabase (base de datos e inicio de sesión)

### 1.1 Crear el proyecto

1. Entra a <https://supabase.com/dashboard> y pulsa **New project**.
2. Nombre: `estudio-labs`. Región: la más cercana (por ejemplo *East US*).
3. Guarda la contraseña de la base de datos en un lugar seguro (no la subas al repo).

### 1.2 Crear las tablas

En el panel, abre **SQL Editor** y ejecuta, **en este orden**, el contenido de cada archivo
(copiar, pegar y pulsar *Run*):

1. `supabase/migrations/20261124000001_catalog.sql`
2. `supabase/migrations/20261124000002_profiles.sql`
3. `supabase/migrations/20261124000003_module_mastery.sql`
4. `supabase/migrations/20261124000004_new_user.sql`
5. `supabase/seed.sql` (carga los 13 módulos)

No ejecutes nada de `supabase/tests/`: esos archivos solo sirven para probar en local.

> Alternativa con terminal: `npx supabase login`, `npx supabase link --project-ref <ref>`
> y `npx supabase db push --include-seed`. El `ref` está en la URL del panel.

### 1.3 Activar el inicio de sesión

1. **Authentication → Sign In / Providers → Email**: déjalo activado (enlace mágico).
   El plan gratis envía pocos correos por hora; para pruebas alcanza.
2. **Authentication → URL Configuration**:
   - *Site URL*: la dirección de Cloudflare (paso 2), por ejemplo `https://estudio-labs.pages.dev`.
   - *Redirect URLs*: agrega `http://localhost:5173/**` y `https://*.estudio-labs.pages.dev/**`.
3. Google es opcional. Requiere crear un *OAuth client* en Google Cloud Console y pegar su
   Client ID y Secret en **Providers → Google**. Puedes dejarlo para después.

### 1.4 Copiar las llaves

En **Project Settings → API** (o **Data API**) copia:

- **Project URL** → `VITE_SUPABASE_URL`
- **anon public key** → `VITE_SUPABASE_ANON_KEY`

Crea `.env.local` en la raíz del repo (git lo ignora):

```bash
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

La llave *anon* es pública por diseño: la seguridad la dan las reglas RLS.
**Nunca** uses ni copies la llave `service_role`.

### 1.5 Ojo con el plan gratis

Supabase pausa el proyecto tras 7 días sin actividad. Si pasa, entra al panel y pulsa
**Restore**; los datos no se pierden.

## 2. Publicar la web

- **Recomendado:** GitHub Pages, todo dentro de GitHub → [setup-github-pages.md](setup-github-pages.md)
- **Alternativa:** Cloudflare Workers → [setup-cloudflare.md](setup-cloudflare.md)
