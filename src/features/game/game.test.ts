import { describe, expect, it } from 'vitest';
import { gearOf, levelOf } from './game';

describe('juego', () => {
  it('sube de nivel cada 500 XP', () => {
    expect(levelOf(0)).toEqual({ level: 1, into: 0 });
    expect(levelOf(499)).toEqual({ level: 1, into: 499 });
    expect(levelOf(1240)).toEqual({ level: 3, into: 240 });
  });

  it('da un accesorio por zona completa', () => {
    expect(gearOf(0)).toBe(0);
    expect(gearOf(3)).toBe(0);
    expect(gearOf(4)).toBe(1);
    expect(gearOf(10)).toBe(3);
    expect(gearOf(13)).toBe(4);
  });
});
