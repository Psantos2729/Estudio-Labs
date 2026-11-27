import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import { beforeAll, describe, expect, it } from 'vitest';
import { loadPyodide, type PyodideAPI } from 'pyodide';
import { execute } from '@/features/runner/execute';
import { toPython } from './translate';

// Todo bloque ```pseudo de las lecciones y la guía debe traducirse y correr sin error.
const root = join(__dirname, '../../../content');
const files = [join(root, 'pseudocodigo.md'), ...readdirSync(root).filter((d) => /^M\d\d/.test(d))
  .flatMap((d) => readdirSync(join(root, d, 'lessons')).map((f) => join(root, d, 'lessons', f)))];
const blocks = files.flatMap((f) => [...readFileSync(f, 'utf8').matchAll(/^```pseudo\n([\s\S]*?)^```$/gm)]
  .map((m, i) => ({ name: `${f.split('content/')[1]} #${i + 1}`, code: m[1] })));
// Todo ```python se puede Correr, así que debe correr solo: sin variables sueltas de un fragmento.
const pythons = files.flatMap((f) => [...readFileSync(f, 'utf8').matchAll(/^```python\n([\s\S]*?)^```$/gm)]
  .map((m, i) => ({ name: `${f.split('content/')[1]} #${i + 1}`, code: m[1] }))
  // shortcut: numpy/pandas (M12) se descargan del CDN en el navegador y aquí no existen; si se instalan local, quitar el filtro.
  .filter((b) => !/^\s*(import|from)\s+(numpy|pandas)\b/m.test(b.code)));

let py: PyodideAPI;
beforeAll(async () => {
  py = await loadPyodide({ indexURL: dirname(createRequire(import.meta.url).resolve('pyodide')) + '/' });
}, 60_000);

describe('bloques de pseudocódigo del contenido', () => {
  it.each(blocks)('$name corre', async ({ code }) => {
    const sample = code.match(/^\/\/ entrada: (.*)/)?.[1] ?? '';
    const r = await execute(py, toPython(code), sample.split(' ').join('\n') + '\n', true);
    expect(r.error).toBeUndefined();
  });
});

describe('bloques de Python del contenido', () => {
  it.each(pythons)('$name corre', async ({ code }) => {
    const [, sample = '', body = code] = code.match(/^\/\/ entrada: (.*)\n([\s\S]*)$/) ?? [];
    // Los que usan input() necesitan su `// entrada:`; sin ella, Correr da ValueError con la caja vacía.
    if (/^[^#\n]*\binput\s*\(/m.test(body)) expect(code, 'falta la línea // entrada:').toMatch(/^\/\/ entrada: /);
    const r = await execute(py, body, sample.split(' ').join('\n') + '\n', true);
    expect(r.error).toBeUndefined();
  });
});
