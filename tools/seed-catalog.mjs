#!/usr/bin/env node
// Genera supabase/seed.sql con el catálogo de módulos (content/*/module.json) y de cosméticos (content/cosmeticos.json).
// Uso: npm run seed
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(process.cwd(), 'content');
const q = (s) => `'${String(s).replaceAll("'", "''")}'`;
const arr = (xs, cast) => `array[${xs.map(cast).join(', ')}]::${cast === q ? 'text' : 'smallint'}[]`;

const modules = readdirSync(root)
  .filter((dir) => /^M\d/.test(dir))
  .map((dir) => JSON.parse(readFileSync(join(root, dir, 'module.json'), 'utf8')))
  .sort((a, b) => a.position - b.position);

const rows = modules.map((m) =>
  `  (${q(m.id)}, ${m.position}, ${q(m.slug)}, ${q(m.title)}, ${q(m.summary)}, ` +
  `${arr(m.prerequisites, q)}, ${m.passScore}, ${arr(m.reviewDays, String)})`,
);

const cosmetics = JSON.parse(readFileSync(join(root, 'cosmeticos.json'), 'utf8'));
const pieces = cosmetics.map((p, i) => `  (${q(p.id)}, ${q(p.slot)}, ${q(p.unlock[0])}, ${q(p.unlock[1])}, ${i})`);

console.log(`-- GENERADO por tools/seed-catalog.mjs. No editar a mano.
insert into public.modules (id, position, slug, title, summary, prerequisites, pass_score, review_days)
values
${rows.join(',\n')}
on conflict (id) do update set
  position = excluded.position, slug = excluded.slug, title = excluded.title,
  summary = excluded.summary, prerequisites = excluded.prerequisites,
  pass_score = excluded.pass_score, review_days = excluded.review_days;

-- Da a las cuentas existentes las filas de los módulos que falten (migración 007).
select public.fill_missing_mastery();

-- Cosméticos del taller: qué espacio ocupan y cómo se ganan (migración 019).
insert into public.gear_items (id, slot, rule, need, position)
values
${pieces.join(',\n')}
on conflict (id) do update set
  slot = excluded.slot, rule = excluded.rule, need = excluded.need, position = excluded.position;
delete from public.gear_items where id not in (${cosmetics.map((p) => q(p.id)).join(', ')});`);
