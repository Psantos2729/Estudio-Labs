import raw from '../../../content/cosmeticos.json';
import { ISLANDS } from './islands';

/** Un rectángulo del dibujo: x, y, ancho, alto, color (cuadrícula del robot: 10.5 × 12). */
export type Rect = [number, number, number, number, string, number?];

export interface Piece {
  id: string;
  slot: string;
  name: string;
  /** [regla, meta]: nivel, ejercicios, repasos, modulos, islas (número) o jefe (id del módulo). */
  unlock: [string, string | number];
  /** back: detrás del cuerpo · face: reemplaza los ojos · top: encima de todo. */
  layer: 'back' | 'face' | 'top';
  hidesAntenna?: boolean;
  art: Rect[];
}

/** Catálogo del taller: content/cosmeticos.json (el seed lo copia a la tabla gear_items). */
export const PIECES = raw as Piece[];
export const PIECE_BY_ID = Object.fromEntries(PIECES.map((p) => [p.id, p]));
export const SLOTS = [...new Set(PIECES.map((p) => p.slot))];

const s = (n: number | string) => (Number(n) === 1 ? '' : 's');
const bossOf = (module: string) => ISLANDS.find((i) => i.last === Number(module.slice(1)))?.boss.name ?? `el jefe de ${module}`;

/** Cómo se gana una pieza, en palabras. */
export function howOf([rule, need]: Piece['unlock']) {
  switch (rule) {
    case 'nivel': return `Llega al nivel ${need}`;
    case 'ejercicios': return `Resuelve ${need} ejercicio${s(need)}`;
    case 'repasos': return `Aprueba ${need} repaso${s(need)}`;
    case 'modulos': return `Domina ${need} módulo${s(need)}`;
    case 'islas': return Number(need) >= ISLANDS.length ? 'Vence a todos los jefes de isla' : `Vence a ${need} jefe${s(need)} de isla`;
    case 'jefe': return `Vence a ${bossOf(String(need))}`;
    default: return '';
  }
}
