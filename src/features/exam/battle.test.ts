import { describe, expect, it } from 'vitest';
import { bossLife, pointsOf } from './battle';

describe('pelea con el jefe', () => {
  it('la vida es lo mínimo para aprobar', () => {
    expect(bossLife(12, 85)).toBe(11); // 10/12 = 83 %, 11/12 = 92 %
    expect(bossLife(7, 85)).toBe(6); // repaso: 6/7 = 86 %
    expect(bossLife(4, 0)).toBe(1);
  });

  it('suma casos y preguntas', () => {
    expect(pointsOf({ problems: [{ passed: 3, total: 4 }, { passed: 4, total: 4 }], questions: { passed: 2, total: 4 } }))
      .toEqual({ hits: 9, total: 12 });
  });
});
