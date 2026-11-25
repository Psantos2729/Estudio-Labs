import type { SpriteName } from '@/ui/sprites';

export interface Island {
  zone: string;
  name: string;
  /** Posición del primer y último módulo de la isla. */
  first: number;
  last: number;
  color: string;
  mood: string;
  companion: { sprite: SpriteName; name: string };
  boss: { sprite: SpriteName; name: string };
  /** Mini avatar de los jefes de cada módulo de la isla. */
  minion: SpriteName;
}

/** Las 4 zonas de la ruta son islas. El jefe de la isla es el examen de dominio de su último módulo. */
export const ISLANDS: Island[] = [
  { zone: 'Bases', name: 'Bosque de las Ruinas', first: 0, last: 3, color: 'var(--green)', mood: 'bosque',
    companion: { sprite: 'brote', name: 'Brote' }, boss: { sprite: 'golem', name: 'Gólem de Musgo' }, minion: 'piedra' },
  { zone: 'Datos en serie', name: 'Archipiélago del Puerto', first: 4, last: 6, color: 'var(--accent)', mood: 'puerto',
    companion: { sprite: 'nutria', name: 'Nudo' }, boss: { sprite: 'kraken', name: 'Kraken del Orden' }, minion: 'cangrejo' },
  { zone: 'Archivos', name: 'Fortaleza del Archivo', first: 7, last: 9, color: 'var(--purple)', mood: 'fortaleza',
    companion: { sprite: 'pluma', name: 'Pluma' }, boss: { sprite: 'dragon', name: 'Dragón del Archivo' }, minion: 'libro' },
  { zone: 'Estructuras', name: 'Isla de la Tormenta', first: 10, last: 12, color: 'var(--amber)', mood: 'cielo',
    companion: { sprite: 'chispa', name: 'Chispa' }, boss: { sprite: 'sierpe', name: 'Sierpe de Tormenta' }, minion: 'nube' },
];

/** Isla de un módulo por su posición (M00 = 0). */
export function islandOf(index: number): Island {
  return ISLANDS.find((i) => index <= i.last) ?? ISLANDS[ISLANDS.length - 1];
}
