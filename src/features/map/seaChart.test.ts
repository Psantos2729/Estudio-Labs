import { describe, expect, it } from 'vitest';
import { DOCK, ROUTE, ROUTE_LEN, SAMPLES, SEA_ISLANDS, SECTORS, pointAt } from './seaChart';

describe('carta de navegación', () => {
  it('tiene un muelle por módulo y 4 sectores', () => {
    expect(SEA_ISLANDS).toHaveLength(13);
    expect(DOCK).toHaveLength(13);
    expect(SECTORS).toHaveLength(4);
  });

  it('el barco nunca pasa por encima de una isla (solo atraca a su costado)', () => {
    const docks = DOCK.map((k) => ROUTE[k]);
    const crossings = SAMPLES.filter(([x, y]) =>
      SEA_ISLANDS.slice(1).some(({ cx, cy, s, w }) => {
        const onLand = x + 20 > cx - 0.41 * w && x - 20 < cx + 0.41 * w && y + 20 > cy - 52 * s && y - 30 < cy + 18 * s;
        const atDock = docks.some(([dx, dy]) => Math.hypot(dx - x, dy - y) < 40);
        return onLand && !atDock;
      }),
    );
    expect(crossings).toEqual([]);
  });

  it('cada largo de la ruta cae justo en su punto y crece hacia adelante', () => {
    ROUTE.forEach((p, i) => {
      const [x, y] = pointAt(ROUTE_LEN[i]);
      expect(Math.hypot(x - p[0], y - p[1])).toBeLessThan(0.01);
      if (i) expect(ROUTE_LEN[i]).toBeGreaterThan(ROUTE_LEN[i - 1]);
    });
  });
});
