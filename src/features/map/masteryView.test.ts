import { describe, expect, it } from 'vitest';
import type { ModuleDef } from '@/content/types';
import { buildModuleViews, currentModule, globalMastery, guestMastery } from './masteryView';

const mod = (id: string, position: number) => ({ id, position, title: id }) as ModuleDef;
const modules = [mod('M00', 0), mod('M01', 1), mod('M02', 2)];

describe('masteryView', () => {
  it('el invitado solo tiene M00 abierto', () => {
    const views = buildModuleViews(modules, guestMastery(modules));
    expect(views.map((v) => v.open)).toEqual([true, false, false]);
  });

  it('un módulo sin fila queda bloqueado', () => {
    const views = buildModuleViews(modules, []);
    expect(views.every((v) => v.status === 'locked')).toBe(true);
  });

  it('el módulo actual es el primero abierto sin dominar', () => {
    const views = buildModuleViews(modules, [
      { module_id: 'M00', status: 'mastered', best_score: 92 },
      { module_id: 'M01', status: 'in_progress', best_score: null },
    ]);
    expect(currentModule(views)?.module.id).toBe('M01');
    expect(globalMastery(views)).toBe(33);
  });
});
