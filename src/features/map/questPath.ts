/** Estado de cada paso del camino de dominio y de cada fila de lecciones/práctica. */
export type StepState = 'done' | 'now' | 'todo' | 'self' | 'locked';
export type RowState = 'done' | 'next' | 'todo';

/**
 * Pasos: lección, práctica, tareas reales, labs C5, examen.
 * Tareas y labs no se registran en la app: quedan "por tu cuenta" hasta dominar el módulo.
 */
export function pathStates(open: boolean, mastered: boolean, lessonsDone: boolean, practiceDone: boolean): StepState[] {
  if (!open) return Array(5).fill('locked');
  if (mastered) return Array(5).fill('done');
  const tracked = [lessonsDone, practiceDone, false];
  const now = tracked.indexOf(false);
  const [lesson, practice, exam] = tracked.map((done, i): StepState => (done ? 'done' : i === now ? 'now' : 'todo'));
  return [lesson, practice, 'self', 'self', exam];
}

/** Hasta qué paso llega la línea iluminada (0 a 4). */
export function pathReach(states: StepState[]): number {
  const now = states.indexOf('now');
  if (now >= 0) return now;
  return states.every((s) => s === 'done') ? states.length - 1 : 0;
}

/** La primera fila obligatoria sin hacer es la siguiente; los retos nunca lo son. */
export function rowStates(ids: string[], done: Set<string>, optional: (i: number) => boolean = () => false): RowState[] {
  const next = ids.findIndex((id, i) => !done.has(id) && !optional(i));
  return ids.map((id, i) => (done.has(id) ? 'done' : i === next ? 'next' : 'todo'));
}
