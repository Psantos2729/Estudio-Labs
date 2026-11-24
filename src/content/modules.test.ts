import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ModuleDef } from './types';
import { displayId } from './types';
import { validateModules } from './validate';

const root = join(__dirname, '../../content');
const modules: ModuleDef[] = readdirSync(root)
  .map((dir) => JSON.parse(readFileSync(join(root, dir, 'module.json'), 'utf8')) as ModuleDef)
  .sort((a, b) => a.position - b.position);

describe('ruta de módulos', () => {
  it('tiene 13 módulos, de M00 a M12', () => {
    expect(modules.map((m) => m.id)).toEqual(
      Array.from({ length: 13 }, (_, i) => `M${String(i).padStart(2, '0')}`),
    );
  });

  it('es coherente y cubre los 37 ejercicios del PDF C5 una sola vez', () => {
    expect(validateModules(modules)).toEqual([]);
  });

  it('detecta un ejercicio repetido', () => {
    const broken = modules.map((m) => ({ ...m, pdfExercises: [...m.pdfExercises] }));
    broken[0].pdfExercises.push(1);
    expect(validateModules(broken)).toContain('Ejercicio 1 repetido en M00 y M01');
  });
});

describe('displayId', () => {
  it('quita el cero a la izquierda', () => {
    expect(displayId('M06')).toBe('M6');
    expect(displayId('M12')).toBe('M12');
  });
});
