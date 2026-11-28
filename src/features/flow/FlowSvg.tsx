import type { Block } from './model';
import { seq, type Ctx, type Palette } from './layout';

export const DARK: Palette = {
  text: '#eef1ff', line: '#8e96b8', plus: '#6f9bff', plusBg: '#0d1226', yes: '#45e3ad', no: '#ff5a7a',
  read: '#6f9bff', write: '#45e3ad', process: '#b48cff', decision: '#ff9257', terminal: '#45e3ad', selected: '#a9c2ff',
};
// Para la imagen descargada: fondo blanco, que se imprime y se pega bien en la entrega.
export const LIGHT: Palette = {
  text: '#111522', line: '#4a5068', plus: '#2f5bd8', plusBg: '#fff', yes: '#13804f', no: '#c2264a',
  read: '#2f5bd8', write: '#13804f', process: '#7a45d8', decision: '#d4621f', terminal: '#13804f', selected: '#2f5bd8',
};

const PAD = 24;
const OVAL = { w: 120, h: 40 };

/** El diagrama completo: Begin, los bloques y End. Con `ctx.interactive` muestra los ＋ y se puede elegir un bloque. */
export function FlowSvg({ blocks, ctx, background }: { blocks: Block[]; ctx: Ctx; background?: string }) {
  const body = seq(blocks, [], ctx);
  const cx = PAD + Math.max(body.l, OVAL.w / 2);
  const w = cx + Math.max(body.r, OVAL.w / 2) + PAD, h = PAD * 2 + OVAL.h * 2 + body.h;
  const endY = PAD + OVAL.h + body.h;
  const oval = (y: number, t: string) => (
    <g>
      <rect x={cx - OVAL.w / 2} y={y} width={OVAL.w} height={OVAL.h} rx={OVAL.h / 2} fill={ctx.pal.terminal} fillOpacity={0.1} stroke={ctx.pal.terminal} strokeWidth={2} />
      <text x={cx} y={y + 25} textAnchor="middle" fill={ctx.pal.text} fontSize={13} fontFamily="'JetBrains Mono', monospace">{t}</text>
    </g>
  );
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="flow__svg" role="group" aria-label="diagrama de flujo">
      <defs>
        <marker id="flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0L10 5L0 10z" fill={ctx.pal.line} />
        </marker>
      </defs>
      {background && <rect width={w} height={h} fill={background} />}
      {oval(PAD, 'Begin')}
      {body.draw(cx, PAD + OVAL.h)}
      <path d={`M${cx} ${endY - 8}v8`} stroke={ctx.pal.line} strokeWidth={1.6} markerEnd="url(#flow-arrow)" />
      {oval(endY, 'End')}
    </svg>
  );
}
