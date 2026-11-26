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
