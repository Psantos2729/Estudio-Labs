import type { ReactElement } from 'react';

/** Un píxel (o bloque) del robot. */
export const px = (x: number, y: number, w: number, h: number, fill: string, opacity?: number) => (
  <rect key={`${x}-${y}-${w}-${fill}`} x={x} y={y} width={w} height={h} fill={fill} opacity={opacity} />
);

const K = '#14161f';
const W = '#f4f6ff';

/** Armaduras: [claro, oscuro] por material. */
const METALS: Record<string, [string, string]> = {
  cuero: ['#a8693a', '#6b3b1e'], malla: ['#9aa3ad', '#5d646c'], hierro: ['#e1e5ea', '#9aa1a8'],
  oro: ['#ffd447', '#c99a1a'], diamante: ['#5ff0ea', '#1f9fa5'], amatista: ['#9d6bff', '#4b2a99'],
};
const armor = Object.entries(METALS).flatMap(([m, [c, d]]) => [
  [`casco_${m}`, [px(1.7, 1.5, 6.6, 1.2, c), px(1.7, 2.5, 6.6, 0.3, d), px(1.7, 2.8, 0.7, 2.4, c), px(7.6, 2.8, 0.7, 2.4, c)]],
  [`peto_${m}`, [
    px(2.7, 6, 4.6, 2.2, c), px(1.8, 6.2, 1.3, 1.5, c), px(6.9, 6.2, 1.3, 1.5, c), px(4.7, 6, 0.6, 2.2, d),
    px(3, 8.2, 4, 0.8, d), px(2.8, 9, 1.4, 1, c), px(5.8, 9, 1.4, 1, c),
  ]],
]) as [string, ReactElement[]][];

/** Piezas que van detrás del cuerpo. */
export const BACK: Record<string, ReactElement[]> = { capa: [px(1, 6, 8, 4, '#6f4bd8')] };

/** Piezas de la cara: reemplazan los ojos. */
export const FACE: Record<string, ReactElement[]> = {
  visor: [px(2.5, 3, 5, 1, '#7ce9ff')],
  lentes: [px(2.5, 2.5, 2, 2, '#ffc94a'), px(5.5, 2.5, 2, 2, '#ffc94a'), px(3, 3, 1, 1, '#020a16'), px(6, 3, 1, 1, '#020a16'), px(4.5, 3, 1, 0.5, '#ffc94a')],
  gafas: [px(2, 2.6, 6, 0.5, '#7a4a2a'), px(2.6, 2.8, 1.8, 1.6, '#6ff0ff'), px(5.6, 2.8, 1.8, 1.6, '#6ff0ff')],
  crack: [px(1.8, 2.8, 6.4, 0.6, K), px(2.2, 3.4, 2.2, 1, K), px(5.6, 3.4, 2.2, 1, K), px(2.5, 3.5, 0.5, 0.4, W), px(5.9, 3.5, 0.5, 0.4, W)],
  mascara: [
    px(1.4, 2, 7.2, 3.6, '#b0306f'), px(2.4, 5.6, 5.2, 0.8, '#b0306f'), px(3.6, 6.4, 2.8, 0.6, '#b0306f'),
    px(4.6, 2, 0.8, 3.6, '#ff8a2e'), px(2.2, 4.8, 5.6, 0.4, '#3a6fd8'),
    px(1.4, 1.2, 0.6, 0.8, '#ffd447'), px(3, 1.2, 0.6, 0.8, '#ffd447'), px(6.4, 1.2, 0.6, 0.8, '#ffd447'), px(8, 1.2, 0.6, 0.8, '#ffd447'),
    px(0.6, 2.6, 0.8, 0.6, '#ffd447'), px(8.6, 2.6, 0.8, 0.6, '#ffd447'),
    px(2.4, 2.8, 1.8, 1.6, '#ffe14a'), px(5.8, 2.8, 1.8, 1.6, '#ffe14a'), px(3, 3.3, 0.7, 0.7, '#2fb36d'), px(6.4, 3.3, 0.7, 0.7, '#2fb36d'),
  ],
};

/** Piezas que van encima de todo. */
export const TOP: Record<string, ReactElement[]> = {
  hoja: [px(3, 1, 4, 1, '#2f8f45'), px(4, 0, 2, 1, '#5bd46a'), px(6, -0.6, 1, 1, '#5bd46a')],
  marinero: [px(2, 0.6, 6, 1.4, W), px(2, 1.6, 6, 0.5, '#3a6fd8')],
  audifonos: [px(2, 1.2, 6, 0.6, '#2a2f45'), px(1.2, 2.6, 1, 2, '#ff5a7a'), px(7.8, 2.6, 1, 2, '#ff5a7a')],
  corona: [px(2.5, 1, 5, 1, '#ffd447'), px(2.5, 0, 1, 1, '#ffd447'), px(4.5, 0, 1, 1, '#ffd447'), px(6.5, 0, 1, 1, '#ffd447'), px(4.5, 1.2, 1, 0.6, '#ff5a5a')],
  estelar: [
    px(2.2, 0.6, 5.6, 0.8, W), px(1.6, 1.2, 6.8, 4.8, W), px(2.2, 2.2, 5.6, 0.3, '#9aa3ad'),
    px(2.4, 2.6, 2, 1.2, K), px(5.6, 2.6, 2, 1.2, K), px(4.4, 3.8, 1.2, 1, '#9aa3ad'),
    px(2, 4.4, 1, 1.2, '#c9ced8'), px(7, 4.4, 1, 1.2, '#c9ced8'), px(3.2, 4.9, 3.6, 0.6, K),
  ],
  fernan: [
    px(1.4, 0.6, 7.2, 4.8, K), px(1.8, 1, 6.4, 4, '#3fae4a'), px(2.4, 1.4, 1.4, 0.5, '#7be07f'),
    px(2.4, 2.6, 5.2, 1.6, K), px(2.8, 3, 1, 0.8, W), px(4.5, 3, 1, 0.8, W), px(6.2, 3, 1, 0.8, W),
  ],
  bufanda: [px(2.6, 5.8, 4.8, 0.9, '#e2453b'), px(6.4, 6.6, 0.9, 1.8, '#e2453b')],
  capa: [px(4, 7, 2, 1, '#ffe14a')],
  llave: [px(8, 6, 0.6, 3, '#aab3c5'), px(7.6, 5.4, 1.4, 0.8, '#aab3c5')],
  rama: [px(8, 4, 0.6, 5.5, '#8a5a3a'), px(8.4, 3.4, 1.2, 1, '#5bd46a')],
  pergamino: [px(7.8, 6.2, 2, 2.4, '#ead9b5'), px(7.8, 6.2, 2, 0.4, '#b8402f'), px(7.8, 8.2, 2, 0.4, '#b8402f')],
  espada_diamante: [
    px(8.2, 0.8, 0.4, 0.6, '#5ff0ea'), px(8, 1.4, 0.8, 5, '#5ff0ea'), px(8, 1.4, 0.3, 5, '#c8fbf8'),
    px(7.4, 6.4, 2, 0.6, '#1f9fa5'), px(8.1, 7, 0.6, 1.6, '#7a4a2a'),
  ],
  espada_maestra: [
    px(8.2, 0.5, 0.4, 0.6, '#cfd6e0'), px(8, 1, 0.8, 5.2, '#cfd6e0'), px(8, 1, 0.3, 5.2, W),
    px(7.2, 6.2, 2.4, 0.6, '#3a5bd8'), px(8.2, 6.2, 0.4, 0.6, '#ffd447'), px(8.1, 6.8, 0.6, 1.6, '#2c3f9e'), px(8, 8.4, 0.8, 0.4, '#3a5bd8'),
  ],
  escudo: [
    px(0, 5.6, 2.6, 3.6, '#c9ced8'), px(0.3, 5.9, 2, 3, '#2c4fb8'), px(0.6, 9.2, 1.4, 0.4, '#c9ced8'),
    px(1, 6.2, 0.6, 0.4, '#ffd447'), px(0.7, 6.6, 1.2, 0.3, '#ffd447'),
    px(0.6, 7.7, 1.4, 0.5, '#e2453b'), px(1.1, 7.3, 0.4, 1.3, '#e2453b'),
  ],
  ...Object.fromEntries(armor),
};
