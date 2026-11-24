import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ExerciseDef } from './types';
import { validateExercise } from './validate';
import { parseLesson } from './lessons';

const root = join(__dirname, '../../content');
const list = (dir: string) => (existsSync(dir) ? readdirSync(dir) : []);

describe('contenido de cada módulo', () => {
  for (const mod of readdirSync(root)) {
    const moduleId = mod.slice(0, 3);
    for (const f of list(join(root, mod, 'lessons'))) {
      it(`${mod}/lessons/${f} tiene nombre y título válidos`, () => {
        const l = parseLesson(`${mod}/lessons/${f}`, readFileSync(join(root, mod, 'lessons', f), 'utf8'));
        expect(l.moduleId).toBe(moduleId);
        expect(l.body).not.toBe('');
      });
    }
    for (const f of list(join(root, mod, 'exercises'))) {
      it(`${mod}/exercises/${f} es válido`, () => {
        const e = JSON.parse(readFileSync(join(root, mod, 'exercises', f), 'utf8')) as ExerciseDef;
        expect(validateExercise(e, moduleId)).toEqual([]);
      });
    }
  }
});

describe('validadores', () => {
  it('parseLesson exige NN-nombre.md y "# Título"', () => {
    expect(parseLesson('M01-x/lessons/02-if.md', '# Si\n\ntexto').id).toBe('M01-L02');
    expect(() => parseLesson('M01-x/lessons/if.md', '# Si')).toThrow();
    expect(() => parseLesson('M01-x/lessons/02-if.md', 'Si')).toThrow();
  });

  it('validateExercise detecta errores', () => {
    const bad = { id: 'M00-1', title: '', statement: '', starter: '', predict: [{ question: '', options: ['a'], answer: 3, why: '' }], hints: [], tests: [] };
    expect(validateExercise(bad, 'M00')).toHaveLength(6);
  });
});
