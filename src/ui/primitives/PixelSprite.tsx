import type { SVGProps } from 'react';
import { SPRITES, type SpriteName } from '@/ui/sprites';

interface Props extends SVGProps<SVGSVGElement> {
  name: SpriteName;
  /** Alto en px; el ancho sale de la cuadrícula. */
  size: number;
  title?: string;
}

/** Dibuja un personaje de píxeles de src/ui/sprites.ts. */
export function PixelSprite({ name, size, title, ...rest }: Props) {
  const { pal, g } = SPRITES[name];
  const w = Math.max(...g.map((row) => row.length));
  return (
    <svg
      viewBox={`0 0 ${w} ${g.length}`}
      height={size}
      width={(size * w) / g.length}
      shapeRendering="crispEdges"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {g.flatMap((row, y) => [...row].map((ch, x) => pal[ch] && <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={pal[ch]} />))}
    </svg>
  );
}
