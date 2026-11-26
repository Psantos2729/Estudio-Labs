import { ISLANDS } from '@/features/game/islands';

/** Carta de navegación: 12 islas (M01–M12) y el puerto (M00) en un mar que se desliza de lado. */
export const WORLD = { w: 3500, h: 620 };

const ART = import.meta.glob('./art/*.png', { eager: true, import: 'default' }) as Record<string, string>;
export const BOAT_ART = ART['./art/barco.png'];

/** Centro (x, y) y tamaño de cada isla, por posición del módulo. Arriba y abajo se alternan sin patrón fijo. */
const LAYOUT: [number, number, number, string][] = [
  [70, 320, 1.0, 'Puerto'],
  [340, 440, 1.2, 'Isla del Cruce'],
  [590, 200, 1.4, 'Isla del Remolino'],
  [840, 420, 1.1, 'Isla de las Ruinas'],
  [1110, 220, 1.3, 'Isla de las Conchas'],
  [1380, 440, 1.5, 'Arrecife Indexado'],
  [1650, 190, 1.2, 'Laguna Burbuja'],
  [1920, 410, 1.3, 'Isla Muralla'],
  [2180, 220, 1.25, 'Isla Biblioteca'],
  [2440, 440, 1.2, 'Isla del Cofre'],
  [2710, 210, 1.3, 'Isla de las Nubes'],
  [2980, 430, 1.3, 'Peñón del Cuervo'],
  [3260, 240, 1.6, 'Isla del Trueno'],
];

export interface SeaIsland { cx: number; cy: number; s: number; name: string; art: string; w: number; h: number; low: boolean }

export const SEA_ISLANDS: SeaIsland[] = LAYOUT.map(([cx, cy, s, name], i) => ({
  cx, cy, s, name, art: ART[`./art/m${String(i).padStart(2, '0')}.png`], w: 128 * s, h: 92 * s, low: cy > 330,
}));

type Pt = [number, number];

/** Muelle: el barco atraca al costado izquierdo de la isla, a la altura de su playa. */
function dockOf(i: number): Pt {
  const { cx, cy, s } = SEA_ISLANDS[i];
  return i === 0 ? [160, 330] : [cx - 52 * s - 36, cy + 2];
}

/** Para seguir, el barco rodea la isla por arriba (si está abajo) o por abajo (si está arriba). */
function around(i: number): Pt[] {
  const { cx, cy, s, low } = SEA_ISLANDS[i];
  const y = low ? cy - 60 * s - 32 : cy + 32 * s + 46;
  return [[cx - 52 * s - 30, y], [cx + 40 * s, y]];
}

/** Puntos por los que pasa el barco y, para cada módulo, el índice de su muelle. */
export const ROUTE: Pt[] = [dockOf(0)];
export const DOCK: number[] = [0];
for (let i = 1; i < SEA_ISLANDS.length; i++) {
  DOCK.push(ROUTE.length);
  ROUTE.push(dockOf(i));
  if (i < SEA_ISLANDS.length - 1) ROUTE.push(...around(i));
}

/** Curva suave (Catmull-Rom a Bézier) que pasa por todos los puntos de la ruta. */
export const ROUTE_D = ROUTE.slice(1).reduce((d, c, k) => {
  const i = k + 1;
  const a = ROUTE[i - 2] ?? ROUTE[i - 1], b = ROUTE[i - 1], e = ROUTE[i + 1] ?? c;
  const c1 = [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6];
  const c2 = [c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6];
  return `${d} C${c1.join(' ')} ${c2.join(' ')} ${c.join(' ')}`;
}, `M${ROUTE[0].join(' ')}`);

/** Sectores = las 4 zonas de siempre. Su jefe cuida el estrecho entre una zona y la siguiente. */
const edge = (z: number) => (z === 0 ? 0 : (SEA_ISLANDS[ISLANDS[z - 1].last].cx + SEA_ISLANDS[ISLANDS[z].first].cx) / 2 + 20);
export const SECTORS = ISLANDS.map((zone, z) => {
  const x = edge(z), right = z === ISLANDS.length - 1 ? WORLD.w : edge(z + 1);
  const last = SEA_ISLANDS[zone.last];
  return { zone, x, w: right - x, medal: (z === ISLANDS.length - 1 ? [3440, 470] : [right, last.low ? 560 : 90]) as Pt };
});
