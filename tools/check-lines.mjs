#!/usr/bin/env node
// Falla si algún archivo del proyecto pasa de 250 líneas (docs/adr/010).
import { readFileSync } from 'node:fs';
import { findViolations } from './line-limit.mjs';

const config = JSON.parse(readFileSync(new URL('./line-limit.config.json', import.meta.url), 'utf8'));
const violations = findViolations(process.cwd(), config);

if (violations.length > 0) {
  console.error(`✗ ${violations.length} archivo(s) pasan de ${config.maxLines} líneas:`);
  for (const v of violations) console.error(`  ${v.lines}\t${v.file}`);
  console.error('Divide el archivo en piezas más pequeñas (subcomponente, hook o módulo).');
  process.exit(1);
}
console.log(`✓ Ningún archivo pasa de ${config.maxLines} líneas.`);
