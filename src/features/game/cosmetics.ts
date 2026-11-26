import raw from '../../../content/cosmeticos.json';
import { ISLANDS } from './islands';
import { MINI_BOSSES } from './minibosses';

/** Un rectángulo del dibujo: x, y, ancho, alto, color (cuadrícula del robot: 10.5 × 12). */
export type Rect = [number, number, number, number, string, number?];

export interface Piece {
  id: string;
  slot: string;
  name: string;
  /** [regla, meta]: jefe lleva el id del módulo; las demás, un número (ver howOf). */
  unlock: [string, string | number];
  /** Texto corto opcional bajo el nombre en el taller. */
  desc?: string;
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
const bossOf = (module: string) =>
  ISLANDS.find((i) => i.last === Number(module.slice(1)))?.boss.name ?? MINI_BOSSES[Number(module.slice(1))]?.name ?? `el jefe de ${module}`;

/** Cómo se gana una pieza, en palabras. */
export function howOf([rule, need]: Piece['unlock']) {
  switch (rule) {
    case 'nivel': return `Llega al nivel ${need}`;
    case 'ejercicios': return `Resuelve ${need} ejercicio${s(need)}`;
    case 'repasos': return `Aprueba ${need} repaso${s(need)}`;
    case 'modulos': return `Domina ${need} módulo${s(need)}`;
    case 'islas': return Number(need) >= ISLANDS.length ? 'Vence a todos los jefes de isla' : `Vence a ${need} jefe${s(need)} de isla`;
    case 'jefe': return `Vence a ${bossOf(String(need))}`;
    case 'lecciones': return Number(need) === 1 ? 'Lee tu primera lección' : `Lee ${need} lecciones`;
    case 'curso': return Number(need) >= 100 ? 'Lee todas las lecciones del curso' : `Lee el ${need} % de las lecciones`;
    case 'xp': return `Junta ${need} XP`;
    case 'reintentos': return Number(need) === 1 ? 'Vuelve a presentar un examen' : `Vuelve a presentar ${need} exámenes`;
    case 'perfectos': return `Saca 100 en ${Number(need) === 1 ? 'un examen' : `${need} exámenes`}`;
    case 'rapidos': return 'Aprueba un examen en menos de la mitad del tiempo';
    case 'noche': return 'Lee una lección de noche (8 p. m. a 6 a. m.)';
    case 'seguidas': return `Lee ${need} lecciones en menos de una hora`;
    case 'primero': return 'Llega al primer lugar del ranking';
    case 'fallos': return Number(need) === 1 ? 'Reprueba un examen' : `Reprueba ${need} exámenes`;
    case 'retos': return Number(need) === 1 ? 'Resuelve un ejercicio reto' : `Resuelve ${need} ejercicios reto`;
    default: return '';
  }
}
