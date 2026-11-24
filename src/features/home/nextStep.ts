import type { ExerciseDef, LessonDef } from '@/content/types';

export interface NextStep {
  to: string;
  kind: 'lección' | 'ejercicio' | 'mapa';
  title: string;
}

/**
 * A dónde lleva "Continuar" dentro del módulo actual:
 * primero la siguiente lección sin leer; luego el primer ejercicio sin resolver;
 * todo listo → el mapa (ahí está el examen de dominio).
 */
export function nextStep(lessons: LessonDef[], exercises: ExerciseDef[], read: Set<string>, passed: Set<string>): NextStep {
  const unread = lessons.find((l) => !read.has(l.id));
  if (unread) return { to: `/leccion/${unread.id}`, kind: 'lección', title: unread.title };
  const pending = exercises.find((e) => !passed.has(e.id));
  if (pending) return { to: `/ejercicio/${pending.id}`, kind: 'ejercicio', title: pending.title };
  return { to: '/mapa', kind: 'mapa', title: 'Todo listo: prepárate para el examen de dominio' };
}
