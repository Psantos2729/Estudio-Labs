import type { SpriteName } from '@/ui/sprites';

export interface Island {
  zone: string;
  name: string;
  /** Posición del primer y último módulo del sector. */
  first: number;
  last: number;
  color: string;
  companion: { sprite: SpriteName; name: string };
  boss: { sprite: SpriteName; name: string };
}

/** Las 4 zonas de la ruta son sectores del mar (3 islas cada uno). El jefe del sector es el examen de dominio de su último módulo. */
export const ISLANDS: Island[] = [
  { zone: 'Bases', name: 'Bosque de las Ruinas', first: 0, last: 3, color: 'var(--green)',
    companion: { sprite: 'brote', name: 'Brote' }, boss: { sprite: 'golem', name: 'Gólem de Musgo' } },
  { zone: 'Datos en serie', name: 'Archipiélago del Puerto', first: 4, last: 6, color: 'var(--accent)',
    companion: { sprite: 'nutria', name: 'Nudo' }, boss: { sprite: 'kraken', name: 'Kraken del Orden' } },
  { zone: 'Archivos', name: 'Fortaleza del Archivo', first: 7, last: 9, color: 'var(--purple)',
    companion: { sprite: 'pluma', name: 'Pluma' }, boss: { sprite: 'dragon', name: 'Dragón del Archivo' } },
  { zone: 'Estructuras', name: 'Mar de la Tormenta', first: 10, last: 12, color: 'var(--amber)',
    companion: { sprite: 'chispa', name: 'Chispa' }, boss: { sprite: 'sierpe', name: 'Sierpe de Tormenta' } },
];

/** Sector de un módulo por su posición (M00 = 0). */
export function islandOf(index: number): Island {
  return ISLANDS.find((i) => index <= i.last) ?? ISLANDS[ISLANDS.length - 1];
}
