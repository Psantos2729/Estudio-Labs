# Reglas del proyecto pylab (Estudio-Labs)

Plataforma web para aprender Python desde cero y prepararse para los laboratorios de C5.

## Reglas que no se rompen

1. **Ningún archivo de más de 250 líneas.** Si un archivo crece, divídelo por responsabilidad.
   `npm run check-lines` lo verifica (también lefthook y CI). Ver docs/adr/010.
2. **Nunca subir soluciones.** El repo es público. Soluciones y casos ocultos van en `private/`
   (ignorado por git y por graphify). CI falla si aparece `solution.py` o `private/`.
3. **El progreso solo lo escribe el servidor.** Ninguna tabla de progreso acepta escrituras del
   cliente; todo pasa por funciones RPC. Cada migración nueva lleva su prueba en `supabase/tests/`.
4. **Todo en español** (interfaz, contenido, mensajes de commit y documentación). Código en inglés
   o español, pero consistente dentro de cada archivo.
5. **Nunca modificar las carpetas de tareas de Paolo** en su computadora; solo se leen.

## Contexto con graphify

Antes de explorar el código a mano, consulta el grafo:

```bash
graphify query "¿dónde se calcula el estado de un módulo?"
graphify explain "buildModuleViews"
```

Después de cada feature: `graphify update .` y sube `graphify-out/` (sin `cache/`).
Durante desarrollo puedes dejar `graphify watch .` corriendo. Lo que se excluye está en `.graphifyignore`.

## Comandos

- `npm run dev`: servidor local (sin `.env.local` corre en modo invitado)
- `npm run verify`: líneas + lint + tipos + pruebas
- `npm run seed`: regenera `supabase/seed.sql` desde `content/`
- `DATABASE_URL=... bash tools/test-db.sh`: migraciones + pruebas de RLS en un Postgres vacío

## Dónde está cada cosa

- `content/`: módulos (M00–M12) como archivos JSON
- `src/features/`: una carpeta por funcionalidad (auth, map, …)
- `src/ui/`: tema, primitivas y componentes de ReactBits
- `supabase/migrations/`: esquema; `supabase/tests/`: pruebas SQL
- `docs/adr/`: decisiones de arquitectura; `docs/setup.md`: cómo conectar Supabase y Cloudflare
