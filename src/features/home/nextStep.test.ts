import { describe, expect, it } from 'vitest';
import type { ExerciseDef, LessonDef } from '@/content/types';
import { nextStep } from './nextStep';

const lessons = [{ id: 'M00-L01', title: 'Uno' }] as LessonDef[];
const exercises = [{ id: 'M00-E01', title: 'A' }, { id: 'M00-E02', title: 'B' }] as ExerciseDef[];

describe('nextStep', () => {
  it('sin intentos empieza por la primera lección', () => {
    expect(nextStep(lessons, exercises, new Set(), new Set()).to).toBe('/leccion/M00-L01');
  });
  it('con intentos va al primer ejercicio sin resolver', () => {
    expect(nextStep(lessons, exercises, new Set(['M00-E01']), new Set(['M00-E01'])).to).toBe('/ejercicio/M00-E02');
    expect(nextStep(lessons, exercises, new Set(['M00-E01']), new Set()).to).toBe('/ejercicio/M00-E01');
  });
  it('todo resuelto lleva al mapa', () => {
    const all = new Set(['M00-E01', 'M00-E02']);
    expect(nextStep(lessons, exercises, all, all).kind).toBe('mapa');
  });
});
