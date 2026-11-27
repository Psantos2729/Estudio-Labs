import { describe, expect, it } from 'vitest';
import { exerciseInfosOf, lessonInfosOf } from './catalog';
import { exercisesOf, lessonsOf } from './lessons';
import { MODULES } from './modules';

describe('índice liviano del contenido', () => {
  it('tiene las mismas lecciones y ejercicios, en el mismo orden, que el contenido completo', () => {
    for (const { id } of MODULES) {
      expect(lessonInfosOf(id)).toEqual(lessonsOf(id).map(({ id, moduleId, title }) => ({ id, moduleId, title })));
      expect(exerciseInfosOf(id)).toEqual(exercisesOf(id).map(({ id, title, challenge }) => ({ id, title, ...(challenge && { challenge }) })));
    }
  });
});
