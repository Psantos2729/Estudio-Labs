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

  it('lee los pasos con valores, marcas y nota', () => {
    const body = '```pasos\n5 2 9 | c0 c1 | ¿5 > 2? sí | se cambian\n2 5 9 | o2 |\n```\n\nFin';
    expect(splitBlocks(body)).toEqual([
      { kind: 'steps', steps: [
        { values: ['5', '2', '9'], marks: { 0: 'c', 1: 'c' }, note: '¿5 > 2? sí | se cambian' },
        { values: ['2', '5', '9'], marks: { 2: 'o' }, note: '' },
      ] },
      { kind: 'md', text: '\n\nFin' },
    ]);
  });
});
