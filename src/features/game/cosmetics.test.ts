import { describe, expect, it } from 'vitest';
import { PIECES, howOf } from './cosmetics';

const RULES = ['nivel', 'ejercicios', 'repasos', 'modulos', 'islas', 'jefe', 'lecciones', 'curso', 'xp', 'reintentos', 'perfectos', 'rapidos', 'noche', 'seguidas', 'primero', 'fallos', 'retos', 'racha'];

describe('content/cosmeticos.json', () => {
  it('no repite ids', () => {
    expect(new Set(PIECES.map((p) => p.id)).size).toBe(PIECES.length);
  });

  it.each(PIECES.map((p) => [p.id, p] as const))('%s está bien escrita', (_, p) => {
    expect(p.id).toMatch(/^[a-z0-9_]+$/);
    expect(p.name.length).toBeGreaterThan(0);
    expect(RULES).toContain(p.unlock[0]);
    if (p.unlock[0] === 'jefe') expect(p.unlock[1]).toMatch(/^M\d\d$/);
    else expect(Number.isInteger(p.unlock[1]) && Number(p.unlock[1]) > 0).toBe(true);
    expect(['back', 'face', 'top']).toContain(p.layer);
    expect(p.art.length).toBeGreaterThan(0);
    for (const r of p.art) expect(r.slice(0, 4).every((n) => typeof n === 'number') && /^#[0-9a-f]{6}$/i.test(r[4])).toBe(true);
  });

  it('explica cómo se gana', () => {
    expect(howOf(['jefe', 'M03'])).toBe('Vence a Gólem de Musgo');
    expect(howOf(['modulos', 1])).toBe('Domina 1 módulo');
    expect(howOf(['islas', 4])).toBe('Vence a todos los jefes de sector');
    expect(howOf(['jefe', 'M00'])).toBe('Vence a Piedra Eco');
    for (const p of PIECES) expect(howOf(p.unlock)).not.toBe('');
  });
});
