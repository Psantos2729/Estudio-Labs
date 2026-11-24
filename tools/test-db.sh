#!/usr/bin/env bash
# Aplica las migraciones en un Postgres desechable y corre supabase/tests/rls_*.sql.
# Uso local: DATABASE_URL=postgres://... bash tools/test-db.sh  (base vacía)
set -euo pipefail
: "${DATABASE_URL:?Define DATABASE_URL con una base vacía}"
run() { psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -q -f "$1"; }
run supabase/tests/auth_stub.sql
for f in supabase/migrations/*.sql; do run "$f"; done
run supabase/seed.sql
for f in supabase/tests/rls_*.sql; do echo "▶ $f"; psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -q -f "$f"; done
