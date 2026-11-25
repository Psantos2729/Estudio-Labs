import { describe, expect, it } from 'vitest';
import type { ModuleDef } from '@/content/types';
import type { AttemptRow } from '@/features/history/attempts';
import { buildModuleViews } from './masteryView';
import { examToUnlock, examWaitUntil } from './lockGate';

const mods = ['M00', 'M01', 'M02', 'M03'].map((id, position) => ({ id, position, title: id }) as ModuleDef);
const views = buildModuleViews(mods, [
  { module_id: 'M00', status: 'mastered', best_score: 100 },
  { module_id: 'M01', status: 'available', best_score: null },
]);
const at = (o: Partial<AttemptRow>): AttemptRow =>
  ({ id: 1, module_id: 'M01', kind: 'exam', started_at: '', submitted_at: null, expires_at: '', score: null, passed: null, ...o });
const now = Date.parse('2026-11-25T12:00:00Z');

describe('lockGate', () => {
  it('pide el examen del módulo anterior, o del último abierto si ese también está bloqueado', () => {
    expect(examToUnlock(views, 'M02')?.module.id).toBe('M01');
    expect(examToUnlock(views, 'M03')?.module.id).toBe('M01');
    expect(examToUnlock(views, 'M00')).toBeUndefined();
  });

  it('espera 1 hora tras reprobar o dejar vencer el examen', () => {
    const failed = at({ submitted_at: '2026-11-25T11:30:00Z', passed: false });
    expect(examWaitUntil([failed], 'M01', now)).toBe(Date.parse('2026-11-25T12:30:00Z'));
    expect(examWaitUntil([at({ expires_at: '2026-11-25T11:10:00Z' })], 'M01', now)).toBe(Date.parse('2026-11-25T12:10:00Z'));
    expect(examWaitUntil([at({ submitted_at: '2026-11-25T10:00:00Z', passed: false })], 'M01', now)).toBeNull();
    expect(examWaitUntil([at({ expires_at: '2026-11-25T12:30:00Z' })], 'M01', now)).toBeNull(); // en curso
    expect(examWaitUntil([at({ kind: 'review', submitted_at: '2026-11-25T11:30:00Z', passed: false })], 'M01', now)).toBeNull();
  });
});
