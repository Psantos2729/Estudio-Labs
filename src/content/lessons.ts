import type { ExerciseDef, LessonDef } from './types';

// Vite incluye las lecciones (texto) y los ejercicios (JSON) de content/ al compilar.
const lessonFiles = import.meta.glob<string>('../../content/*/lessons/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});
const exerciseFiles = import.meta.glob<ExerciseDef>('../../content/*/exercises/*.json', {
  eager: true,
  import: 'default',
});

/** 'content/M00-x/lessons/01-hola.md' → lección M00-L01, título de la primera línea `# `. */
export function parseLesson(path: string, raw: string): LessonDef {
  const [, moduleId, n] = path.match(/(M\d{2})-[^/]+\/lessons\/(\d{2})-/) ?? [];
  if (!moduleId) throw new Error(`Nombre de lección inválido: ${path} (usa NN-nombre.md)`);
  const [first, ...rest] = raw.split('\n');
  if (!first.startsWith('# ')) throw new Error(`${path}: la primera línea debe ser "# Título"`);
  return { id: `${moduleId}-L${n}`, moduleId, title: first.slice(2).trim(), body: rest.join('\n').trim() };
}

const LESSONS = Object.entries(lessonFiles)
  .map(([path, raw]) => parseLesson(path, raw))
  .sort((a, b) => a.id.localeCompare(b.id));
const EXERCISES = Object.values(exerciseFiles).sort((a, b) => a.id.localeCompare(b.id));

export const lessonsOf = (moduleId: string) => LESSONS.filter((l) => l.moduleId === moduleId);
export const exercisesOf = (moduleId: string) => EXERCISES.filter((e) => e.id.startsWith(`${moduleId}-`));
export const getLesson = (id: string) => LESSONS.find((l) => l.id === id);
export const getExercise = (id: string) => EXERCISES.find((e) => e.id === id);
