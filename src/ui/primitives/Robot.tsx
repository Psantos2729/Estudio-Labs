import type { SVGProps } from 'react';
import type { Gear } from '@/features/game/game';
import { BACK, FACE, TOP, px } from './gearArt';

interface Props extends SVGProps<SVGSVGElement> {
  color: string;
  /** Piezas del taller que lleva puestas. */
  gear?: Gear;
  size?: number;
  title?: string;
}

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
      {!gear.cabeza && gear.cara !== 'mascara' && px(4.5, 1, 1, 1, '#86a9bf')}
      {px(2, 2, 6, 4, color)}
      {px(4, 5, 2, 0.5, '#020a16')}
      {face || [px(3, 3, 1, 1, '#020a16'), px(6, 3, 1, 1, '#020a16')]}
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
