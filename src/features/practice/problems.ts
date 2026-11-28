import type { PracticeDef, PracticeLevel } from '@/content/types';
import { ISLANDS } from '@/features/game/islands';

// shortcut: la lista carga los 60 enunciados completos (~150 KB, solo en /practica); si crece mucho, hacer un índice como content-index.
const files = import.meta.glob<PracticeDef>('../../../content/practica/*.json', { eager: true, import: 'default' });

export const PROBLEMS = Object.values(files).sort((a, b) => a.id.localeCompare(b.id));
export const getProblem = (id: string) => PROBLEMS.find((p) => p.id === id);

/** El XP tiene que coincidir con tools/seed-catalog.mjs (catalog_items.xp). */
export const LEVELS: Record<PracticeLevel, { label: string; xp: number }> = {
  medio: { label: 'medio', xp: 30 },
  dificil: { label: 'difícil', xp: 45 },
  'muy-dificil': { label: 'muy difícil', xp: 60 },
};

/** La zona se abre junto con M04: al vencer al jefe del sector 1 (examen de M03). */
export const GATE_MODULE = 'M04';

/** "Zona 2 · Archipiélago del Puerto · cadenas" o "Tema extra · recursión". */
export function whereOf(p: Pick<PracticeDef, 'zone' | 'topic'>): string {
  return p.zone ? `Zona ${p.zone} · ${ISLANDS[p.zone - 1].name} · ${p.topic}` : `Tema extra · ${p.topic}`;
}
