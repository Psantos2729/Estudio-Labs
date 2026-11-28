import { dirname } from 'node:path';
import { createRequire } from 'node:module';
import { loadPyodide } from 'pyodide';
import { execute } from '@/features/runner/execute';
import { describe, expect, it } from 'vitest';
import { toPython } from '@/features/pseudo/translate';
import { editList, samePseudo, toPseudo, type Block } from './model';

const parity: Block[] = [
  { kind: 'read', text: 'n' },
  { kind: 'if', text: 'n mod 2 = 0', yes: [{ kind: 'write', text: '"Par"' }], no: [{ kind: 'write', text: '"Impar"' }] },
  { kind: 'for', text: 'i ← 1 to n', body: [{ kind: 'process', text: 's ← s + i' }] },
  { kind: 'while', text: 'n > 0', body: [] },
];

describe('toPseudo', () => {
  it('sangra cada nivel, omite el else vacío y el traductor lo acepta', () => {
    const src = toPseudo([...parity, { kind: 'if', text: 'n > 3', yes: [], no: [] }]);
    expect(src).toBe(`Begin
    read n
    if n mod 2 = 0
        write "Par"
    else
        write "Impar"
    end if
    for i ← 1 to n
        s ← s + i
    end for
    while n > 0
    end while
    if n > 3
    end if
End
`);
    expect(() => toPython(src.replace('while n > 0\n', 'while n > 0\n        n ← n - 1\n'))).not.toThrow();
  });
});

describe('editList', () => {
  it('inserta dentro de una rama sin tocar el original', () => {
    const next = editList(parity, [{ i: 1, key: 'no' }], (l) => l.push({ kind: 'process', text: 'x ← 1' }));
    expect(toPseudo(next)).toContain('        write "Impar"\n        x ← 1\n    end if');
    expect((parity[1] as { no: Block[] }).no).toHaveLength(1);
  });
});

describe('samePseudo', () => {
  it('ignora sangría, mayúsculas y comentarios, pero no el orden', () => {
    expect(samePseudo('BEGIN\nread n // dato\n  x <- n*2\nend', 'Begin\n    read n\n    x ← n * 2\nEnd\n')).toBe(true);
    expect(samePseudo('Begin\nx ← 1\nread n\nEnd', 'Begin\nread n\nx ← 1\nEnd')).toBe(false);
  });
});

describe('el diagrama corre', () => {
  it('una decisión dentro del No sale como else if y pasa las pruebas de M01-E01', async () => {
    const out = (t: string): Block => ({ kind: 'write', text: `"Resultado: ", ${t}` });
    const flow: Block[] = [
      { kind: 'read', text: 'a' }, { kind: 'read', text: 'b' },
      { kind: 'if', text: 'a = b', yes: [out('a * b')], no: [{ kind: 'if', text: 'a > b', yes: [out('a - b')], no: [out('a + b')] }] },
    ];
    const src = toPseudo(flow);
    expect(src).toContain('    else if a > b\n        write "Resultado: ", a - b\n    else\n');
    expect(samePseudo(src, 'Begin\nread a\nread b\nif a = b\nwrite "Resultado: ", a * b\nelse if a > b\nwrite "Resultado: ", a - b\nelse\nwrite "Resultado: ", a + b\nend if\nEnd')).toBe(true);
    const py = await loadPyodide({ indexURL: dirname(createRequire(import.meta.url).resolve('pyodide')) + '/' });
    expect((await execute(py, toPython(src), '7\n3\n', true)).stdout).toBe('Resultado: 4\n');
    expect((await execute(py, toPython(src), '4\n4\n', true)).stdout).toBe('Resultado: 16\n');
  }, 60_000);
});
