import type { ReactElement, SVGProps } from 'react';
import type { Gear } from '@/features/game/game';

interface Props extends SVGProps<SVGSVGElement> {
  color: string;
  /** Piezas del taller que lleva puestas. */
  gear?: Gear;
  size?: number;
  title?: string;
}

const px = (x: number, y: number, w: number, h: number, fill: string, opacity?: number) => (
  <rect key={`${x}-${y}-${fill}`} x={x} y={y} width={w} height={h} fill={fill} opacity={opacity} />
);

/** Piezas que van detrás del cuerpo, en la cara y encima del cuerpo, por id. */
const BACK: Record<string, ReactElement[]> = { capa: [px(1, 6, 8, 4, '#6f4bd8')] };
const FACE: Record<string, ReactElement[]> = {
  visor: [px(2.5, 3, 5, 1, '#7ce9ff')],
  lentes: [px(2.5, 2.5, 2, 2, '#ffc94a'), px(5.5, 2.5, 2, 2, '#ffc94a'), px(3, 3, 1, 1, '#020a16'), px(6, 3, 1, 1, '#020a16'), px(4.5, 3, 1, 0.5, '#ffc94a')],
  gafas: [px(2, 2.6, 6, 0.5, '#7a4a2a'), px(2.6, 2.8, 1.8, 1.6, '#6ff0ff'), px(5.6, 2.8, 1.8, 1.6, '#6ff0ff')],
};
const TOP: Record<string, ReactElement[]> = {
  hoja: [px(3, 1, 4, 1, '#2f8f45'), px(4, 0, 2, 1, '#5bd46a'), px(6, -0.6, 1, 1, '#5bd46a')],
  marinero: [px(2, 0.6, 6, 1.4, '#f4f6ff'), px(2, 1.6, 6, 0.5, '#3a6fd8')],
  audifonos: [px(2, 1.2, 6, 0.6, '#2a2f45'), px(1.2, 2.6, 1, 2, '#ff5a7a'), px(7.8, 2.6, 1, 2, '#ff5a7a')],
  corona: [px(2.5, 1, 5, 1, '#ffd447'), px(2.5, 0, 1, 1, '#ffd447'), px(4.5, 0, 1, 1, '#ffd447'), px(6.5, 0, 1, 1, '#ffd447'), px(4.5, 1.2, 1, 0.6, '#ff5a5a')],
  bufanda: [px(2.6, 5.8, 4.8, 0.9, '#e2453b'), px(6.4, 6.6, 0.9, 1.8, '#e2453b')],
  capa: [px(4, 7, 2, 1, '#ffe14a')],
  llave: [px(8, 6, 0.6, 3, '#aab3c5'), px(7.6, 5.4, 1.4, 0.8, '#aab3c5')],
  rama: [px(8, 4, 0.6, 5.5, '#8a5a3a'), px(8.4, 3.4, 1.2, 1, '#5bd46a')],
  pergamino: [px(7.8, 6.2, 2, 2.4, '#ead9b5'), px(7.8, 6.2, 2, 0.4, '#b8402f'), px(7.8, 8.2, 2, 0.4, '#b8402f')],
};

/** Personaje de cada estudiante: un robot de píxeles con su color y lo que se puso en el taller. */
export function Robot({ color, gear = {}, size = 32, title, ...rest }: Props) {
  const worn = Object.values(gear);
  const face = gear.cara && FACE[gear.cara];
  return (
    <svg
      viewBox="0 -1 10.5 12"
      width={size}
      height={(size * 12) / 10.5}
      shapeRendering="crispEdges"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {worn.flatMap((id) => BACK[id] ?? [])}
      {!gear.cabeza && px(4.5, 1, 1, 1, '#86a9bf')}
      {px(2, 2, 6, 4, color)}
      {face || [px(3, 3, 1, 1, '#020a16'), px(6, 3, 1, 1, '#020a16')]}
      {px(4, 5, 2, 0.5, '#020a16')}
      {px(3, 6, 4, 3, color, 0.75)}
      {px(4, 7, 2, 1, '#3ef0a0')}
      {px(2, 6.5, 1, 2, color, 0.55)}
      {px(7, 6.5, 1, 2, color, 0.55)}
      {px(3, 9, 1, 1, color, 0.55)}
      {px(6, 9, 1, 1, color, 0.55)}
      {worn.flatMap((id) => TOP[id] ?? [])}
    </svg>
  );
}
