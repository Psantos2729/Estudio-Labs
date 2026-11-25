import { describe, expect, it } from 'vitest';
import type { ModuleDef } from '@/content/types';
import { buildModuleViews, currentModule, daysUntil, dueReviews, globalMastery, guestMastery } from './masteryView';

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

  it('marca el estado de los repasos de cada módulo dominado', () => {
    const now = Date.parse('2026-11-25T12:00:00Z');
    const views = buildModuleViews(modules, [
      { module_id: 'M00', status: 'mastered', best_score: 92, next_review_at: '2026-11-25T11:00:00Z' },
      { module_id: 'M01', status: 'mastered', best_score: 100, next_review_at: '2026-11-28T12:00:00Z' },
      { module_id: 'M02', status: 'mastered', best_score: 90, next_review_at: null },
    ], now);
    expect(views.map((v) => v.review)).toEqual(['due', 'scheduled', 'done']);
    expect(views[0].label).toBe('repaso pendiente');
    expect(dueReviews(views).map((v) => v.module.id)).toEqual(['M00']);
    expect(daysUntil('2026-11-28T12:00:00Z', now)).toBe('en 3 días');
    expect(daysUntil('2026-11-26T01:00:00Z', now)).toBe('mañana');
  });
});
