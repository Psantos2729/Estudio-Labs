import { dirname } from 'node:path';
import { createRequire } from 'node:module';
import { beforeAll, describe, expect, it } from 'vitest';
import { loadPyodide, type PyodideAPI } from 'pyodide';
import { execute } from '@/features/runner/execute';
import { toPython } from './translate';

let py: PyodideAPI;
beforeAll(async () => {
  py = await loadPyodide({ indexURL: dirname(createRequire(import.meta.url).resolve('pyodide')) + '/' });
}, 60_000);

const run = async (src: string, stdin = '') => execute(py, toPython(src), stdin, true);
const errorOf = (src: string) => {
  try {
    toPython(src);
  } catch (e) {
    return `${(e as { line: number }).line}: ${(e as Error).message}`;
  }
  return 'sin error';
};

describe('toPython', () => {
  it('corre el estilo de los labs: mayúsculas mezcladas, begin opcional, Array y .len', async () => {
    const src = `Begin
    Read n
    v ← new Array(n)
    For i ← 0 to n-1
        read V[i]
    End For
    Largo ← v.len
    suma ← 0
    I ← 0
    While i < largo
    begin
        suma ← suma + v[i]
        i <- i + 1
    End While
    If suma mod 2 = 0 then
        Write "par: ", suma
    else if suma > 10
        write "grande"
    Else
        Write "impar"
    EndIf
End`;
    expect((await run(src, '3\n1\n2\n3\n')).stdout).toBe('par: 6\n');
    expect((await run(src, '2\n5\n6\n')).stdout).toBe('grande\n');
  });

  it('funciones, return de varios valores, matrices y step negativo', async () => {
    const src = `Function mayor_menor(v)
    mayor ← v[0]
    menor ← v[0]
    for i = 1 to len(v) - 1
        if v[i] > mayor
            mayor ← v[i]
        end if
        if v[i] < menor
            menor ← v[i]
        end if
    end for
    return mayor, menor
end function
Begin
    m ← Array(2, 3)
    m[1][2] ← 7
    a, b ← mayor_menor(m[1])
    write a, " ", b
    for k ← 3 to 1 step -1
        write k
    end for
End`;
    expect(await run(src)).toEqual({ stdout: '7 0\n3\n2\n1\n' });
  });

  it('stack: push, pop, top, empty', async () => {
    const src = `Begin
    p ← new Stack()
    p.push(1)
    p.push(2)
    write p.top()
    while not p.empty()
        write p.pop()
    end while
End`;
    expect((await run(src)).stdout).toBe('2\n2\n1\n');
  });

  it('un error de Python apunta a la misma línea del pseudocódigo', async () => {
    expect((await run('Begin\n    x ← 1\n    write y\nEnd')).error).toMatch(/line 3/);
  });

  it('explica en español lo que falta o sobra, con su línea', () => {
    expect(errorOf('Begin\n    if x = 1\n        write x\nEnd')).toBe('4: falta `end if` para el `if` de la línea 2 (cierra primero el bloque de adentro)');
    expect(errorOf('Begin\n    x = 1\nEnd')).toMatch(/^2: para asignar se usa ←/);
    expect(errorOf('Begin\n    print(1)\nEnd')).toMatch(/^2: para mostrar se usa `write`/);
    expect(errorOf('Begin\n    if x == 1\n    end if\nEnd')).toMatch(/^2: .*un solo `=`/);
    expect(errorOf('Begin\n    while x < 3\n        x ← x + 1\nEnd')).toMatch(/^4: falta `end while`/);
    expect(errorOf('Begin\n    write 1\n')).toMatch(/^1: falta `end`/);
    expect(errorOf('x ← 1')).toMatch(/^1: esta línea está fuera del programa/);
    expect(errorOf('Begin\n    for i in range(3)\n    end for\nEnd')).toMatch(/^2: el for se escribe/);
    expect(errorOf('')).toMatch(/^1: el programa empieza con `Begin`/);
    expect(errorOf('Begin\nwrite 1\nEnd')).toMatch(/^2: la sangría no va así: esta línea va con 1 sangría .*`Begin` de la línea 1/);
    expect(errorOf('Begin\n    if 1 = 1\n    write 1\n    end if\nEnd')).toMatch(/^3: .*va con 2 sangrías/);
    expect(errorOf('Begin\n    if 1 = 1\n        write 1\n        end if\nEnd')).toMatch(/^4: .*misma altura que su `if` de la línea 2/);
    expect(errorOf('Begin\n  write 1\nEnd')).toMatch(/^2: la sangría se hace con un Tab o 4 espacios/);
    expect(errorOf('    Begin\n        write 1\n    End')).toMatch(/^1: `Begin`, `Function` y su `End` van pegados al margen/);
    expect(errorOf('Begin\n\twrite 1\n\tif 1 = 1\n\t\twrite 2\n\tend if\nEnd')).toBe('sin error');
  });

  it('no toca lo que está entre comillas ni los comentarios //', async () => {
    expect((await run('Begin // inicio\n    write "a = b ← c", 1 = 1\nEnd')).stdout).toBe('a = b ← cTrue\n');
  });
});
