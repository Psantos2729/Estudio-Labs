import { dirname } from 'node:path';
import { createRequire } from 'node:module';
import { beforeAll, describe, expect, it } from 'vitest';
import { loadPyodide, type PyodideAPI } from 'pyodide';
import { execute } from './execute';
import { explainError } from './explain';

// Errores reales de Pyodide: si cambia el texto de Python, la regla deja de coincidir y la prueba lo dice.
let py: PyodideAPI;
beforeAll(async () => {
  py = await loadPyodide({ indexURL: dirname(createRequire(import.meta.url).resolve('pyodide')) + '/' });
}, 60_000);

const explain = async (code: string, stdin = '') => explainError((await execute(py, code, stdin, true)).error ?? '');

describe('explainError', () => {
  it.each([
    ['if 1 > 0\n    print(1)', 'SyntaxError', 1, /Falta el «:»/],
    ['if True:\nprint(1)', 'IndentationError', 2, /falta el bloque/],
    ['x = 1\n    print(x)', 'IndentationError', 2, /no está dentro/],
    ['print("hola)', 'SyntaxError', 1, /comillas/],
    ['print((1 + 2)', 'SyntaxError', 1, /nunca lo cerraste/],
    ['if x = 1:\n    pass', 'SyntaxError', 1, /«=»/],
    ['edad = 3\nprint(Edad)', 'NameError', 2, /«Edad»/],
    ['print("tienes " + 3)', 'TypeError', 1, /texto y un entero/],
    ['n = input()\nprint(n * 2.5)', 'TypeError', 2, /texto o lista/],
    ['n = input()\nprint(n + 1)', 'TypeError', 2, /texto y un entero/],
    ['n = input()\nif n > 5:\n    pass', 'TypeError', 2, /comparar/],
    ['def f(a):\n    return a\nf(1, 2)', 'TypeError', 3, /recibe 1/],
    ['for i in range(5 / 2):\n    pass', 'TypeError', 1, /decimal/],
    ['s = "ab"\ns[0] = "c"', 'TypeError', 2, /no se pueden modificar/],
    ['print(int(input()))', 'ValueError', 1, /'3.5'/],
    ['print(10 % 0)', 'ZeroDivisionError', 1, /cero/],
    ['v = [1, 2]\nprint(v[2])', 'IndexError', 2, /lista/],
    ['print("ab"[5])', 'IndexError', 1, /texto/],
    ['d = {}\nprint(d["a"])', 'KeyError', 2, /'a'/],
    ['input()\ninput()', 'EOFError', 2, /input\(\)/],
    ['def f():\n    return f()\nf()', 'RecursionError', 2, /sí misma/],
    ['open("datos.txt")', 'FileNotFoundError', 1, /datos\.txt/],
    ['"a".uper()', 'AttributeError', 1, /\.uper/],
  ])('%s', async (code, name, line, what) => {
    const help = await explain(code, code.includes('int(input') ? '3.5\n' : code.startsWith('input') ? '1\n' : '4\n');
    expect(help).toMatchObject({ name, line });
    expect(help!.what).toMatch(what);
  });

  it('no explica lo que no es un error de Python', () => {
    expect(explainError('Tu programa tardó más de 5 s. ¿Hay un ciclo que nunca termina?')).toBeNull();
  });
});
