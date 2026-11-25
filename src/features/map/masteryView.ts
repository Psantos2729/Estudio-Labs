import type { ModuleDef } from '@/content/types';

export type MasteryStatus = 'locked' | 'available' | 'in_progress' | 'mastered' | 'reopened';

export interface MasteryRow {
  module_id: string;
  status: MasteryStatus;
  best_score: number | null;
  next_review_at?: string | null;
}

export interface ModuleView {
  module: ModuleDef;
  status: MasteryStatus;
  score: number | null;
  icon: string;
  label: string;
  open: boolean;
  /** Solo en módulos dominados: 'due' toca repaso, 'scheduled' hay uno más adelante, 'done' consolidado. */
  review: 'due' | 'scheduled' | 'done' | null;
  nextReviewAt: string | null;
}

const VIEW: Record<MasteryStatus, { icon: string; label: string }> = {
  locked: { icon: '×', label: 'bloqueado' },
  available: { icon: '>', label: 'disponible' },
  in_progress: { icon: '>', label: 'en curso' },
  mastered: { icon: '✓', label: 'dominado' },
  reopened: { icon: '!', label: 'reabierto' },
};

/** Estado de invitado: solo M00 abierto (ADR-006). */
export function guestMastery(modules: ModuleDef[]): MasteryRow[] {
  return modules.map((m) => ({
    module_id: m.id,
    status: m.position === 0 ? 'available' : 'locked',
    best_score: null,
  }));
}

/** Une el catálogo con el progreso. Un módulo sin fila se considera bloqueado. */
export function buildModuleViews(modules: ModuleDef[], rows: MasteryRow[], now = Date.now()): ModuleView[] {
  const byId = new Map(rows.map((r) => [r.module_id, r]));
  return modules.map((module) => {
    const row = byId.get(module.id);
    const status = row?.status ?? 'locked';
    const at = row?.next_review_at ?? null;
    const review = status !== 'mastered' ? null : !at ? 'done' : Date.parse(at) <= now ? 'due' : 'scheduled';
    return {
      module,
      status,
      score: row?.best_score ?? null,
      ...(review === 'due' ? { icon: '↻', label: 'repaso pendiente' } : VIEW[status]),
      open: status !== 'locked',
      review,
      nextReviewAt: at,
    };
  });
}

/** El módulo a mostrar al abrir el mapa: el primero abierto que no esté dominado. */
export function currentModule(views: ModuleView[]): ModuleView | undefined {
  return views.find((v) => v.open && v.status !== 'mastered') ?? views.find((v) => v.open);
}

/** % de dominio global: módulos dominados sobre el total. */
export function globalMastery(views: ModuleView[]): number {
  if (views.length === 0) return 0;
  return Math.round((100 * views.filter((v) => v.status === 'mastered').length) / views.length);
}

/** Repasos que ya tocan, el más atrasado primero. */
export function dueReviews(views: ModuleView[]): ModuleView[] {
  return views.filter((v) => v.review === 'due').sort((a, b) => (a.nextReviewAt ?? '').localeCompare(b.nextReviewAt ?? ''));
}

/** "hoy", "mañana" o "en N días" hasta una fecha. */
export function daysUntil(iso: string, now = Date.now()): string {
  const days = Math.ceil((Date.parse(iso) - now) / 86_400_000);
  return days <= 0 ? 'hoy' : days === 1 ? 'mañana' : `en ${days} días`;
}
