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

/** Curva suave (Catmull-Rom a Bézier) que pasa por todos los puntos de la ruta: [inicio, control 1, control 2, fin]. */
const SEGMENTS = ROUTE.slice(1).map((c, k): [Pt, Pt, Pt, Pt] => {
  const i = k + 1;
  const a = ROUTE[i - 2] ?? ROUTE[i - 1], b = ROUTE[i - 1], e = ROUTE[i + 1] ?? c;
  return [b, [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6], [c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6], c];
});

/**
 * La curva se muestrea una sola vez aquí, con su largo acumulado.
 * Antes se le pedían miles de puntos a un <path> SVG y en teléfonos el mapa se congelaba ~20 s.
 */
const STEPS = 24;
const bez = (a: number, b: number, c: number, d: number, t: number) => {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
};
export const SAMPLES: Pt[] = [ROUTE[0]];
for (const [p0, p1, p2, p3] of SEGMENTS) {
  for (let k = 1; k <= STEPS; k++) SAMPLES.push([bez(p0[0], p1[0], p2[0], p3[0], k / STEPS), bez(p0[1], p1[1], p2[1], p3[1], k / STEPS)]);
}
const CUM = SAMPLES.map(() => 0);
for (let k = 1; k < SAMPLES.length; k++) CUM[k] = CUM[k - 1] + Math.hypot(SAMPLES[k][0] - SAMPLES[k - 1][0], SAMPLES[k][1] - SAMPLES[k - 1][1]);

/** Largo de la curva hasta cada punto de la ruta (cada tramo termina en un punto de ROUTE). */
export const ROUTE_LEN = ROUTE.map((_, i) => CUM[i * STEPS]);

/** Punto de la curva a `l` píxeles del inicio. */
export function pointAt(l: number): Pt {
  let lo = 0, hi = CUM.length - 1;
  if (l >= CUM[hi]) return SAMPLES[hi];
  while (hi - lo > 1) { const m = (lo + hi) >> 1; if (CUM[m] <= l) lo = m; else hi = m; }
  const t = (l - CUM[lo]) / (CUM[hi] - CUM[lo] || 1), [a, b] = [SAMPLES[lo], SAMPLES[hi]];
  return [a[0] + (b[0] - a[0]) * Math.max(0, t), a[1] + (b[1] - a[1]) * Math.max(0, t)];
}

/** Sectores = las 4 zonas de siempre. Su jefe cuida el estrecho entre una zona y la siguiente. */
const edge = (z: number) => (z === 0 ? 0 : (SEA_ISLANDS[ISLANDS[z - 1].last].cx + SEA_ISLANDS[ISLANDS[z].first].cx) / 2 + 20);
export const SECTORS = ISLANDS.map((zone, z) => {
  const x = edge(z), right = z === ISLANDS.length - 1 ? WORLD.w : edge(z + 1);
  const last = SEA_ISLANDS[zone.last];
  return { zone, x, w: right - x, medal: (z === ISLANDS.length - 1 ? [3440, 470] : [right, last.low ? 560 : 90]) as Pt };
});
