#!/usr/bin/env node
// Genera supabase/seed.sql con el catálogo de módulos desde content/*/module.json.
// Uso: npm run seed
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(process.cwd(), 'content');
const q = (s) => `'${String(s).replaceAll("'", "''")}'`;
const arr = (xs, cast) => `array[${xs.map(cast).join(', ')}]::${cast === q ? 'text' : 'smallint'}[]`;

const modules = readdirSync(root)
  .map((dir) => JSON.parse(readFileSync(join(root, dir, 'module.json'), 'utf8')))
  .sort((a, b) => a.position - b.position);

const rows = modules.map((m) =>
  `  (${q(m.id)}, ${m.position}, ${q(m.slug)}, ${q(m.title)}, ${q(m.summary)}, ` +
  `${arr(m.prerequisites, q)}, ${m.passScore}, ${arr(m.reviewDays, String)})`,
);

console.log(`-- GENERADO por tools/seed-catalog.mjs. No editar a mano.
insert into public.modules (id, position, slug, title, summary, prerequisites, pass_score, review_days)
values
${rows.join(',\n')}
on conflict (id) do update set
  position = excluded.position, slug = excluded.slug, title = excluded.title,
  summary = excluded.summary, prerequisites = excluded.prerequisites,
  pass_score = excluded.pass_score, review_days = excluded.review_days;

-- Da a las cuentas existentes las filas de los módulos que falten (migración 007).
select public.fill_missing_mastery();`);
