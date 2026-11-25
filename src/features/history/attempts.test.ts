import { describe, expect, it } from 'vitest';
import { attemptResult, type AttemptRow } from './attempts';

const base: AttemptRow = {
  id: 1, module_id: 'M00', kind: 'exam', started_at: '2026-11-25T10:00:00Z',
  submitted_at: null, expires_at: '2026-11-25T10:45:00Z', score: null, passed: null,
};
const now = Date.parse('2026-11-25T10:30:00Z');

describe('attemptResult', () => {
  it('distingue aprobado, reprobado, en curso y vencido', () => {
    expect(attemptResult({ ...base, submitted_at: base.started_at, score: 92, passed: true }, now).label).toBe('✓ aprobado');
    expect(attemptResult({ ...base, submitted_at: base.started_at, score: 50, passed: false }, now).label).toBe('× reprobado');
    expect(attemptResult(base, now).label).toBe('en curso');
    expect(attemptResult(base, Date.parse('2026-11-25T11:00:00Z')).label).toBe('× sin entregar');
    expect(attemptResult({ ...base, kind: 'review', score: 0, passed: false }, now).label).toBe('× sin entregar');
  });
});
