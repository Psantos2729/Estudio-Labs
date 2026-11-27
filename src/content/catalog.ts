import index from 'virtual:content-index';
import type { ExerciseDef, LessonDef } from './types';

export type LessonInfo = Pick<LessonDef, 'id' | 'moduleId' | 'title'>;
export type ExerciseInfo = Pick<ExerciseDef, 'id' | 'title' | 'challenge'>;

/** Solo ids y títulos (lo arma tools/content-index.mjs al compilar): portada y mapa no cargan el texto completo. */
const { lessons, exercises } = index as { lessons: LessonInfo[]; exercises: ExerciseInfo[] };

export const lessonInfosOf = (moduleId: string) => lessons.filter((l) => l.moduleId === moduleId);
export const exerciseInfosOf = (moduleId: string) => exercises.filter((e) => e.id.startsWith(`${moduleId}-`));
