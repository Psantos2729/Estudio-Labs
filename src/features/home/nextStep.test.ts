import { describe, expect, it } from 'vitest';
import type { ExerciseDef, LessonDef } from '@/content/types';
import { nextStep } from './nextStep';

const lessons = [{ id: 'M00-L01', title: 'Uno' }, { id: 'M00-L02', title: 'Dos' }] as LessonDef[];
const allRead = new Set(['M00-L01', 'M00-L02']);
const exercises = [{ id: 'M00-E01', title: 'A' }, { id: 'M00-E02', title: 'B' }] as ExerciseDef[];

describe('nextStep', () => {
  it('va a la primera lección sin leer', () => {
    expect(nextStep(lessons, exercises, new Set(), new Set()).to).toBe('/leccion/M00-L01');
    expect(nextStep(lessons, exercises, new Set(['M00-L01']), new Set()).to).toBe('/leccion/M00-L02');
  });
  it('con las lecciones leídas va al primer ejercicio sin resolver', () => {
    expect(nextStep(lessons, exercises, allRead, new Set()).to).toBe('/ejercicio/M00-E01');
    expect(nextStep(lessons, exercises, allRead, new Set(['M00-E01'])).to).toBe('/ejercicio/M00-E02');
  });
  it('todo listo lleva al examen del módulo', () => {
    expect(nextStep(lessons, exercises, allRead, new Set(['M00-E01', 'M00-E02'])).to).toBe('/examen/M00');
  });
});
