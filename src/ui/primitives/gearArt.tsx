import type { ReactElement } from 'react';
import { PIECES, type Rect } from '@/features/game/cosmetics';

/** Un píxel (o bloque) del robot. */
export const px = (x: number, y: number, w: number, h: number, fill: string, opacity?: number) => (
  <rect key={`${x}-${y}-${w}-${fill}`} x={x} y={y} width={w} height={h} fill={fill} opacity={opacity} />
);

const layer = (name: string) =>
  Object.fromEntries(PIECES.filter((p) => p.layer === name).map((p) => [p.id, p.art.map((r: Rect) => px(...r))])) as Record<string, ReactElement[]>;

/** Dibujos de content/cosmeticos.json por capa: detrás del cuerpo, en la cara y encima de todo. */
export const BACK = layer('back');
export const FACE = layer('face');
export const TOP = layer('top');
