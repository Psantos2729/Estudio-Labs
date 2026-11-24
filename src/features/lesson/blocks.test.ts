import { describe, expect, it } from 'vitest';
import { splitBlocks } from './blocks';

describe('splitBlocks', () => {
  it('separa texto y bloques de python, y deja otros bloques como markdown', () => {
    const body = 'Hola\n\n```python\nprint(1)\nprint(2)\n```\n\nFin\n\n```\nsalida\n```';
    expect(splitBlocks(body)).toEqual([
      { kind: 'md', text: 'Hola\n\n' },
      { kind: 'python', code: 'print(1)\nprint(2)' },
      { kind: 'md', text: '\n\nFin\n\n```\nsalida\n```' },
    ]);
  });

  it('sin código devuelve un solo bloque', () => {
    expect(splitBlocks('solo texto')).toEqual([{ kind: 'md', text: 'solo texto' }]);
  });
});
