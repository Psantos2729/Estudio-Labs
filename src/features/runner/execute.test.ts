import { dirname } from 'node:path';
import { createRequire } from 'node:module';
import { beforeAll, describe, expect, it } from 'vitest';
import { loadPyodide, type PyodideAPI } from 'pyodide';
import { cleanTraceback, execute } from './execute';
import { sameOutput } from './check';

// En Node, Pyodide se carga desde node_modules: es el mismo Python que usa el navegador.
let py: PyodideAPI;
beforeAll(async () => {
  const indexURL = dirname(createRequire(import.meta.url).resolve('pyodide')) + '/';
  py = await loadPyodide({ indexURL });
}, 60_000);

describe('execute', () => {
  it('captura print e input()', async () => {
    const r = await execute(py, 'n = input()\nprint(f"Hola, {n}!")', 'Ana\n');
    expect(r).toEqual({ stdout: 'Hola, Ana!\n' });
  });

  it('no comparte variables entre corridas', async () => {
    await execute(py, 'x = 1', '');
    expect((await execute(py, 'print(x)', '')).error).toMatch(/NameError/);
  });

  it('da EOFError si se piden más datos de los que hay', async () => {
    expect((await execute(py, 'input()\ninput()', 'uno\n')).error).toMatch(/EOFError/);
  });

  it('muestra solo el traceback del programa', async () => {
    const r = await execute(py, 'print("antes")\n1 / 0', '');
    expect(r.stdout).toBe('antes\n');
    expect(r.error).toMatch(/^Traceback[\s\S]*programa\.py", line 2[\s\S]*ZeroDivisionError/);
    expect(r.error).not.toMatch(/_pyodide/);
  });
});

describe('cleanTraceback', () => {
  it('sin marcos del programa deja solo el último renglón', () => {
    expect(cleanTraceback('Traceback\n  File "x"\nSyntaxError: algo')).toBe('SyntaxError: algo');
  });
});

describe('sameOutput', () => {
  it('ignora espacios finales y saltos de línea finales', () => {
    expect(sameOutput('7  \n\n', '7\n')).toBe(true);
    expect(sameOutput('7\r\n8', '7\n8\n')).toBe(true);
    expect(sameOutput('7\n8', '78')).toBe(false);
  });
});
