import { describe, expect, it } from 'vitest';
import { validateExercise } from '@/content/validate';
import { LEVELS, PROBLEMS, whereOf } from './problems';

describe('zona de práctica', () => {
  it('tiene problemas P01, P02… seguidos y bien formados', () => {
    expect(PROBLEMS.length).toBeGreaterThanOrEqual(40);
    PROBLEMS.forEach((p, i) => {
      expect(p.id).toBe(`P${String(i + 1).padStart(2, '0')}`);
      expect(Object.keys(LEVELS)).toContain(p.level);
      expect(p.topic.trim()).not.toBe('');
      if (p.zone !== undefined) expect([1, 2, 3, 4]).toContain(p.zone);
      // validateExercise pide ids de módulo (MXX-ENN); lo demás aplica igual.
      expect(validateExercise(p, 'P').filter((m) => !m.includes('id debe'))).toEqual([]);
    });
  });

  it('es mayormente de nivel medio a muy difícil, con temas extra', () => {
    expect(PROBLEMS.filter((p) => p.level === 'muy-dificil').length).toBeGreaterThan(0);
    expect(PROBLEMS.some((p) => !p.zone)).toBe(true);
  });

  it('dice la zona o el tema', () => {
    expect(whereOf({ zone: 2, topic: 'cadenas' })).toBe('Zona 2 · Archipiélago del Puerto · cadenas');
    expect(whereOf({ topic: 'recursión' })).toBe('Tema extra · recursión');
  });
});
