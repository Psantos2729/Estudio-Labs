import type { ExerciseInfo, LessonInfo } from '@/content/catalog';

export interface NextStep {
  to: string;
  kind: 'lección' | 'ejercicio' | 'examen' | 'mapa';
  title: string;
}

/**
 * A dónde lleva "Continuar" dentro del módulo actual:
 * primero la siguiente lección sin leer; luego el primer ejercicio sin resolver;
 * todo listo → el examen de dominio del módulo.
 */
export function nextStep(lessons: LessonInfo[], exercises: ExerciseInfo[], read: Set<string>, passed: Set<string>): NextStep {
  const unread = lessons.find((l) => !read.has(l.id));
  if (unread) return { to: `/leccion/${unread.id}`, kind: 'lección', title: unread.title };
  const pending = exercises.find((e) => !passed.has(e.id));
  if (pending) return { to: `/ejercicio/${pending.id}`, kind: 'ejercicio', title: pending.title };
  const moduleId = exercises[0]?.id.slice(0, 3);
  if (moduleId) return { to: `/examen/${moduleId}`, kind: 'examen', title: 'Todo listo: presenta el examen de dominio' };
  return { to: '/mapa', kind: 'mapa', title: 'Sigue en el mapa' };
}
