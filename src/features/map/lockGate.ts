import type { AttemptRow } from '@/features/history/attempts';
import type { ModuleView } from './masteryView';

/** El examen que abre un módulo bloqueado: el del último módulo abierto antes de él. */
export function examToUnlock(views: ModuleView[], moduleId: string): ModuleView | undefined {
  const i = views.findIndex((v) => v.module.id === moduleId);
  return views.slice(0, Math.max(i, 0)).reverse().find((v) => v.open);
}

/** Hasta cuándo hay que esperar para volver a dar el examen (misma regla que start_exam). */
export function examWaitUntil(attempts: AttemptRow[], moduleId: string, now = Date.now()): number | null {
  const failed = attempts.filter((a) => a.module_id === moduleId && a.kind === 'exam' && a.passed !== true
    && (a.submitted_at || Date.parse(a.expires_at) <= now));
  if (failed.length === 0) return null;
  const until = Math.max(...failed.map((a) => Date.parse(a.submitted_at ?? a.expires_at))) + 3_600_000;
  return until > now ? until : null;
}
