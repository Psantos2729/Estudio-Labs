import type { ExerciseDef, LessonDef } from '@/content/types';

export interface NextStep {
  to: string;
  kind: 'lección' | 'ejercicio' | 'mapa';
  title: string;
}

/**
 * A dónde lleva "Continuar" dentro del módulo actual:
 * sin intentos → la primera lección; con intentos → el primer ejercicio sin resolver;
 * todo resuelto → el mapa (ahí está el examen de dominio).
 * shortcut: las lecciones leídas no se guardan; si algún día se guardan, continuar en la siguiente sin leer.
 */
export function nextStep(lessons: LessonDef[], exercises: ExerciseDef[], attempted: Set<string>, passed: Set<string>): NextStep {
  const started = exercises.some((e) => attempted.has(e.id));
  if (!started && lessons[0]) return { to: `/leccion/${lessons[0].id}`, kind: 'lección', title: lessons[0].title };
  const pending = exercises.find((e) => !passed.has(e.id));
  if (pending) return { to: `/ejercicio/${pending.id}`, kind: 'ejercicio', title: pending.title };
  return { to: '/mapa', kind: 'mapa', title: 'Todo resuelto: prepárate para el examen de dominio' };
}
