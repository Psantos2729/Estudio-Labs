import { describe, expect, it } from 'vitest';
import { DOCK, ROUTE, ROUTE_D, SEA_ISLANDS, SECTORS } from './seaChart';

/** Puntos de la curva del barco, leídos de su trazo SVG. */
function samples(): [number, number][] {
  const [start, ...segs] = ROUTE_D.split(' C');
  let p0 = start.slice(1).split(' ').map(Number);
  return segs.flatMap((seg) => {
    const [x1, y1, x2, y2, x, y] = seg.split(' ').map(Number);
    const pts = Array.from({ length: 25 }, (_, k): [number, number] => {
      const t = k / 24, u = 1 - t;
      const f = (a: number, b: number, c: number, d: number) => u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
      return [f(p0[0], x1, x2, x), f(p0[1], y1, y2, y)];
    });
    p0 = [x, y];
    return pts;
  });
}

describe('carta de navegación', () => {
  it('tiene un muelle por módulo y 4 sectores', () => {
    expect(SEA_ISLANDS).toHaveLength(13);
    expect(DOCK).toHaveLength(13);
    expect(SECTORS).toHaveLength(4);
  });

  it('el barco nunca pasa por encima de una isla (solo atraca a su costado)', () => {
    const docks = DOCK.map((k) => ROUTE[k]);
    const crossings = samples().filter(([x, y]) =>
      SEA_ISLANDS.slice(1).some(({ cx, cy, s, w }) => {
        const onLand = x + 20 > cx - 0.41 * w && x - 20 < cx + 0.41 * w && y + 20 > cy - 52 * s && y - 30 < cy + 18 * s;
        const atDock = docks.some(([dx, dy]) => Math.hypot(dx - x, dy - y) < 40);
        return onLand && !atDock;
      }),
    );
    expect(crossings).toEqual([]);
  });
});
