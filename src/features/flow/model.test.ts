import { describe, expect, it } from 'vitest';
import { toPython } from '@/features/pseudo/translate';
import { toPseudo, type Block } from './model';

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
