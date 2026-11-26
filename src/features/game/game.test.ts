import { describe, expect, it } from 'vitest';
import { levelOf } from './game';
import { islandOf } from './islands';
import { MINI_BOSSES } from './minibosses';
import { SPRITES } from '@/ui/sprites';

describe('juego', () => {
  it('sube de nivel cada 500 XP', () => {
    expect(levelOf(0)).toEqual({ level: 1, into: 0 });
    expect(levelOf(499)).toEqual({ level: 1, into: 499 });
    expect(levelOf(1240)).toEqual({ level: 3, into: 240 });
  });

  it('pone cada módulo en su sector', () => {
    expect(islandOf(0).name).toBe('Bosque de las Ruinas');
    expect(islandOf(3).name).toBe('Bosque de las Ruinas');
    expect(islandOf(4).name).toBe('Archipiélago del Puerto');
    expect(islandOf(9).name).toBe('Fortaleza del Archivo');
    expect(islandOf(12).name).toBe('Mar de la Tormenta');
  });

  it('da un mini jefe a cada módulo, con dibujos rectangulares', () => {
    expect(MINI_BOSSES).toHaveLength(13);
    for (const { g } of Object.values(SPRITES)) expect(new Set(g.map((r) => r.length)).size).toBe(1);
  });
});
