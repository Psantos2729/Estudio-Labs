import type { ReactNode } from 'react';
import { caption, type Addr, type Block } from './model';

// Medidas del dibujo, en unidades del viewBox.
const GAP = 46; // espacio vertical entre bloques; ahí va el ＋
const H = 40; // alto de entrada, proceso y salida
const DH = 64; // alto del rombo (decisión) y del hexágono (for)
const SIDE = 26; // margen de las flechas de regreso y salida de un ciclo
const width = (b: Block) => Math.max(b.kind === 'if' || b.kind === 'while' || b.kind === 'for' ? 170 : 130, caption(b).length * 8.2 + 56);

export interface Palette {
  text: string; line: string; plus: string; plusBg: string; yes: string; no: string;
  read: string; write: string; process: string; decision: string; terminal: string; selected: string;
}

/** Lo que el dibujo necesita del editor; en la imagen descargada no hay ＋ ni selección. */
export interface Ctx {
  pal: Palette;
  interactive: boolean;
  selected?: string; // `${addr}|${i}` del bloque elegido
  onPlus: (addr: Addr, i: number) => void;
  onPick: (addr: Addr, i: number) => void;
}

/** Medida de un tramo: cuánto ocupa a la izquierda y derecha del eje, su alto y cómo dibujarlo. */
interface Box { l: number; r: number; h: number; draw: (cx: number, y: number) => ReactNode[] }

export const keyOf = (addr: Addr, i: number) => `${JSON.stringify(addr)}|${i}`;

const arrow = (d: string, ctx: Ctx, k: string, head = true) => (
  <path key={k} d={d} fill="none" stroke={ctx.pal.line} strokeWidth={1.6} markerEnd={head ? 'url(#flow-arrow)' : undefined} />
);

function plus(cx: number, cy: number, ctx: Ctx, addr: Addr, i: number): ReactNode {
  if (!ctx.interactive) return null;
  const go = () => ctx.onPlus(addr, i);
  return (
    <g key={`p${keyOf(addr, i)}`} className="flow__plus" role="button" tabIndex={0} aria-label="agregar un bloque aquí"
      onClick={go} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), go())}>
      <circle cx={cx} cy={cy} r={11} fill={ctx.pal.plusBg} stroke={ctx.pal.plus} strokeWidth={1.4} />
      <path d={`M${cx - 5} ${cy}h10M${cx} ${cy - 5}v10`} stroke={ctx.pal.plus} strokeWidth={1.8} />
    </g>
  );
}

/** Una lista de bloques, uno debajo de otro, con un ＋ antes de cada uno y al final. */
export function seq(list: Block[], addr: Addr, ctx: Ctx): Box {
  const boxes = list.map((b, i) => block(b, addr, i, ctx));
  return {
    l: Math.max(60, ...boxes.map((b) => b.l)),
    r: Math.max(60, ...boxes.map((b) => b.r)),
    h: boxes.reduce((s, b) => s + GAP + b.h, GAP),
    draw: (cx, y) => {
      const out: ReactNode[] = [];
      boxes.forEach((b, i) => {
        out.push(arrow(`M${cx} ${y}v${GAP}`, ctx, `a${keyOf(addr, i)}`), plus(cx, y + GAP / 2, ctx, addr, i), ...b.draw(cx, y + GAP));
        y += GAP + b.h;
      });
      out.push(arrow(`M${cx} ${y}v${GAP}`, ctx, `a${keyOf(addr, list.length)}`, false), plus(cx, y + GAP / 2, ctx, addr, list.length));
      return out;
    },
  };
}

function shape(b: Block, cx: number, y: number, w: number, ctx: Ctx, k: string, onPick: () => void): ReactNode {
  const { pal } = ctx;
  const sel = ctx.selected === k;
  const color = { read: pal.read, write: pal.write, process: pal.process, if: pal.decision, while: pal.decision, for: pal.decision }[b.kind];
  const x0 = cx - w / 2, x1 = cx + w / 2;
  const h = b.kind === 'if' || b.kind === 'while' || b.kind === 'for' ? DH : H;
  const d = {
    read: `M${x0 + 14} ${y}H${x1}l-14 ${H}H${x0}z`,
    write: `M${x0 + 14} ${y}H${x1}l-14 ${H}H${x0}z`,
    process: `M${x0} ${y}H${x1}v${H}H${x0}z`,
    if: `M${cx} ${y}L${x1} ${y + DH / 2}L${cx} ${y + DH}L${x0} ${y + DH / 2}z`,
    while: `M${cx} ${y}L${x1} ${y + DH / 2}L${cx} ${y + DH}L${x0} ${y + DH / 2}z`,
    for: `M${x0 + 18} ${y}H${x1 - 18}L${x1} ${y + DH / 2}L${x1 - 18} ${y + DH}H${x0 + 18}L${x0} ${y + DH / 2}z`,
  }[b.kind];
  return (
    <g key={`s${k}`} className={ctx.interactive ? 'flow__block' : undefined} role={ctx.interactive ? 'button' : undefined}
      tabIndex={ctx.interactive ? 0 : undefined} aria-label={ctx.interactive ? `editar: ${caption(b)}` : undefined} aria-pressed={ctx.interactive ? sel : undefined}
      onClick={ctx.interactive ? onPick : undefined} onKeyDown={ctx.interactive ? (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onPick()) : undefined}>
      <path d={d} fill={color} fillOpacity={sel ? 0.28 : 0.1} stroke={sel ? pal.selected : color} strokeWidth={sel ? 3 : 2} />
      <text x={cx} y={y + h / 2 + 4.5} textAnchor="middle" fill={pal.text} fontSize={13} fontFamily="'JetBrains Mono', monospace">{caption(b)}</text>
    </g>
  );
}

const label = (x: number, y: number, t: string, color: string, k: string) => (
  <text key={k} x={x} y={y} fill={color} fontSize={12} fontFamily="Inter, sans-serif" textAnchor="middle">{t}</text>
);

/** Un bloque y, si es decisión o ciclo, lo que lleva adentro. */
function block(b: Block, addr: Addr, i: number, ctx: Ctx): Box {
  const w = width(b);
  const k = keyOf(addr, i);
  const pick = () => ctx.onPick(addr, i);
  const { pal } = ctx;
  if (b.kind === 'if') {
    const yes = seq(b.yes, [...addr, { i, key: 'yes' }], ctx);
    const no = seq(b.no, [...addr, { i, key: 'no' }], ctx);
    const lx = Math.max(w / 2, yes.r + 20), rx = Math.max(w / 2, no.l + 20); // ejes de cada rama
    const bottom = DH / 2 + Math.max(yes.h, no.h) + 18;
    return {
      l: lx + yes.l, r: rx + no.r, h: bottom,
      draw: (cx, y) => {
        const mid = y + DH / 2, end = y + bottom;
        return [
          shape(b, cx, y, w, ctx, k, pick),
          arrow(`M${cx - w / 2} ${mid}H${cx - lx}`, ctx, `l${k}`, false), arrow(`M${cx + w / 2} ${mid}H${cx + rx}`, ctx, `r${k}`, false),
          label(cx - w / 2 - 14, mid - 7, 'Sí', pal.yes, `ys${k}`), label(cx + w / 2 + 14, mid - 7, 'No', pal.no, `ns${k}`),
          ...yes.draw(cx - lx, mid), ...no.draw(cx + rx, mid),
          arrow(`M${cx - lx} ${mid + yes.h}V${end}H${cx - 6}`, ctx, `jl${k}`), arrow(`M${cx + rx} ${mid + no.h}V${end}H${cx + 6}`, ctx, `jr${k}`),
          <circle key={`j${k}`} cx={cx} cy={end} r={4.5} fill={pal.line} />,
        ];
      },
    };
  }
  if (b.kind === 'while' || b.kind === 'for') {
    const body = seq(b.body, [...addr, { i, key: 'body' }], ctx);
    const l = Math.max(w / 2, body.l) + SIDE, r = Math.max(w / 2, body.r) + SIDE;
    const h = DH + body.h + 22;
    return {
      l, r, h,
      draw: (cx, y) => {
        const mid = y + DH / 2, back = y + DH + body.h;
        return [
          shape(b, cx, y, w, ctx, k, pick),
          label(cx + 14, y + DH + 14, 'Sí', pal.yes, `ys${k}`), label(cx + w / 2 + 12, mid - 7, 'No', pal.no, `ns${k}`),
          ...body.draw(cx, y + DH),
          arrow(`M${cx} ${back}H${cx - l + 6}V${mid}H${cx - w / 2}`, ctx, `b${k}`),
          arrow(`M${cx + w / 2} ${mid}H${cx + r - 6}V${y + h}H${cx}`, ctx, `x${k}`, false),
        ];
      },
    };
  }
  return { l: w / 2, r: w / 2, h: H, draw: (cx, y) => [shape(b, cx, y, w, ctx, k, pick)] };
}
