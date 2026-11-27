import { describe, expect, it } from 'vitest';
import { pathReach, pathStates, rowStates } from './questPath';

describe('questPath', () => {
  it('módulo bloqueado: todo bloqueado', () => {
    expect(pathStates(false, false, true, true)).toEqual(Array(5).fill('locked'));
  });

  it('el paso actual es el primero registrado sin terminar', () => {
    expect(pathStates(true, false, false, false)).toEqual(['now', 'todo', 'self', 'self', 'todo']);
    expect(pathStates(true, false, true, false)).toEqual(['done', 'now', 'self', 'self', 'todo']);
    const ready = pathStates(true, false, true, true);
    expect(ready).toEqual(['done', 'done', 'self', 'self', 'now']);
    expect(pathReach(ready)).toBe(4);
  });

  it('dominado: todo hecho y la línea llega al final', () => {
    const s = pathStates(true, true, false, false);
    expect(s).toEqual(Array(5).fill('done'));
    expect(pathReach(s)).toBe(4);
  });

  it('la siguiente fila salta los retos opcionales', () => {
    const ids = ['a', 'b', 'c', 'd'];
    expect(rowStates(ids, new Set(['a']), (i) => i === 1)).toEqual(['done', 'todo', 'next', 'todo']);
    expect(rowStates(ids, new Set(ids))).toEqual(['done', 'done', 'done', 'done']);
  });
});
