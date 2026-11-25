/** Una fila de exam_attempts tal como la lee el navegador (sin item_ids ni respuestas). */
export interface AttemptRow {
  id: number;
  module_id: string;
  kind: 'exam' | 'review';
  started_at: string;
  submitted_at: string | null;
  expires_at: string;
  score: number | null;
  passed: boolean | null;
}

/** Cómo terminó un intento: aprobado, reprobado, en curso o vencido sin entregar. */
export function attemptResult(a: AttemptRow, now = Date.now()): { label: string; tone: 'ok' | 'warn' | 'muted' } {
  if (a.passed === true) return { label: '✓ aprobado', tone: 'ok' };
  if (a.submitted_at) return { label: '× reprobado', tone: 'warn' };
  if (a.passed === false || Date.parse(a.expires_at) <= now) return { label: '× sin entregar', tone: 'warn' };
  return { label: 'en curso', tone: 'muted' };
}
