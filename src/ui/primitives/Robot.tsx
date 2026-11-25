import type { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  color: string;
  /** Accesorios ganados (uno por zona dominada): 1 antena dorada, 2 visor, 3 capa, 4 núcleo dorado. */
  gear?: number;
  size?: number;
  title?: string;
}

/** Personaje de cada estudiante: un robot de píxeles con el color que eligió. */
export function Robot({ color, gear = 0, size = 32, title, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 10 11"
      width={size}
      height={size * 1.1}
      shapeRendering="crispEdges"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {gear >= 3 && <rect x="1" y="6" width="8" height="4" fill="#b98cff" opacity="0.8" />}
      {gear >= 1 && <rect x="4" y="0" width="2" height="1" fill="#ffb547" />}
      <rect x="4.5" y="1" width="1" height="1" fill="#86a9bf" />
      <rect x="2" y="2" width="6" height="4" fill={color} />
      {gear >= 2
        ? <rect x="2.5" y="3" width="5" height="1" fill="#7ce9ff" />
        : <><rect x="3" y="3" width="1" height="1" fill="#020a16" /><rect x="6" y="3" width="1" height="1" fill="#020a16" /></>}
      <rect x="4" y="5" width="2" height="0.5" fill="#020a16" />
      <rect x="3" y="6" width="4" height="3" fill={color} opacity="0.75" />
      <rect x="4" y="7" width="2" height="1" fill={gear >= 4 ? '#ffb547' : '#3ef0a0'} />
      <rect x="2" y="6.5" width="1" height="2" fill={color} opacity="0.55" />
      <rect x="7" y="6.5" width="1" height="2" fill={color} opacity="0.55" />
      <rect x="3" y="9" width="1" height="1" fill={color} opacity="0.55" />
      <rect x="6" y="9" width="1" height="1" fill={color} opacity="0.55" />
    </svg>
  );
}
