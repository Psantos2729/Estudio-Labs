import type { KeyboardEvent } from 'react';
import { displayId } from '@/content/types';
import { Robot } from '@/ui/primitives/Robot';
import { PixelSprite } from '@/ui/primitives/PixelSprite';
import { ISLANDS } from '@/features/game/islands';
import type { RankRow } from '@/features/game/useGame';
import type { ModuleView } from './masteryView';
import { IslandArt } from './IslandArt';

/** Centro de cada isla flotante en el lienzo de 900×400. */
const CENTERS: [number, number][] = [[125, 235], [345, 190], [565, 240], [780, 185]];
const W = 200;
/** Estaciones (M00…M12) repartidas sobre el borde frontal de su isla. */
const SPOTS: [number, number][] = ISLANDS.flatMap((isl, z) => {
  const n = isl.last - isl.first + 1;
  const [cx, cy] = CENTERS[z];
  return Array.from({ length: n }, (_, k): [number, number] => [cx - W * 0.36 + (k * W * 0.72) / (n - 1), cy + 10 + (k % 2) * 10]);
});

const COLOR: Record<ModuleView['status'], string> = {
  locked: 'var(--locked)',
  available: 'var(--accent)',
  in_progress: 'var(--accent)',
  mastered: 'var(--green)',
  reopened: 'var(--red)',
};

interface Props {
  views: ModuleView[];
  selectedId: string;
  currentId: string | undefined;
  others: RankRow[];
  me: RankRow | undefined;
  onSelect: (id: string) => void;
}

/** Cuatro islas: estaciones = módulos, compuertas = exámenes de dominio, robots = personas. */
export function ExpeditionMap({ views, selectedId, currentId, others, me, onSelect }: Props) {
  const spot = (id: string) => SPOTS[views.findIndex((v) => v.module.id === id)] ?? SPOTS[0];
  const key = (id: string) => (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(id); }
  };
  const cur = currentId ? spot(currentId) : null;

  return (
    <svg viewBox="0 60 900 290" className="panel expedition" role="group" aria-label="Mapa de las cuatro islas">
      <defs>
        <linearGradient id="island-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.1" />
          <stop offset="1" stopColor="#070a14" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      {ISLANDS.map((isl, z) => {
        const [cx, cy] = CENTERS[z];
        const beaten = views[isl.last]?.status === 'mastered';
        return (
          <g key={isl.name}>
            <IslandArt island={isl} cx={cx} cy={cy} w={W} />
            <text x={cx} y={cy + 92} textAnchor="middle" fill={isl.color} fontSize="11" letterSpacing="1.4">ISLA {z + 1} · {isl.zone.toUpperCase()}</text>
            <PixelSprite name={isl.companion.sprite} size={30} x={cx - W / 2 - 18} y={cy - 40} title={`Compañero: ${isl.companion.name}`} />
            <PixelSprite
              name={isl.boss.sprite} size={44} x={cx + W * 0.2} y={cy - 104} opacity={beaten ? 0.35 : 1}
              title={`Jefe de la isla: ${isl.boss.name}${beaten ? ' (vencido)' : ''}`}
              style={{ filter: beaten ? 'grayscale(1)' : `drop-shadow(0 0 6px ${isl.color})` }}
            />
          </g>
        );
      })}

      {views.slice(1).map((v, i) => {
        const [a, b] = [SPOTS[i], SPOTS[i + 1]];
        const prev = views[i];
        const done = prev.status === 'mastered';
        const gate = prev.open && !done;
        const [gx, gy] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        return (
          <g key={v.module.id}>
            <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={done ? 'var(--green)' : 'var(--line-strong)'} strokeWidth="2.5" strokeLinecap="round" strokeDasharray={done ? undefined : '2 7'} />
            <rect
              x={gx - 6} y={gy - 6} width="12" height="12" transform={`rotate(45 ${gx} ${gy})`}
              fill="var(--bg)" stroke={done ? 'var(--green)' : gate ? 'var(--amber)' : 'var(--locked)'} strokeWidth="2"
            >
              <title>Compuerta: examen de dominio {displayId(prev.module.id)}</title>
            </rect>
          </g>
        );
      })}

      {views.map((v, i) => {
        const [x, y] = SPOTS[i];
        const sel = v.module.id === selectedId;
        return (
          <g
            key={v.module.id}
            role="button"
            tabIndex={0}
            className="station"
            aria-label={`${displayId(v.module.id)} ${v.module.title}, ${v.label}`}
            aria-current={sel ? 'true' : undefined}
            onClick={() => onSelect(v.module.id)}
            onKeyDown={key(v.module.id)}
          >
            {sel && <circle cx={x} cy={y} r="19" fill="none" stroke="var(--accent)" strokeOpacity="0.6" />}
            <circle cx={x} cy={y} r="13" fill="var(--bg)" stroke={COLOR[v.status]} strokeWidth={v.open ? 2.5 : 1.5} className={v.module.id === currentId ? 'station--now' : undefined} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fill={v.open ? 'var(--text)' : 'var(--locked)'}>{displayId(v.module.id)}</text>
            {v.review === 'due' && <text x={x + 12} y={y - 10} fontSize="12" fill="var(--amber)">↻</text>}
          </g>
        );
      })}

      {others.map((r, i) => {
        const [x, y] = spot(r.station);
        return <Robot key={`${r.rank}-${r.name}`} color={r.color} gear={r.gear} size={14} x={x - 26 + (i % 4) * 4} y={y + 10 + Math.floor(i / 4) * 4} opacity={0.85} />;
      })}

      {cur && (
        <g className="me">
          <Robot color={me?.color ?? '#19d3ff'} gear={me?.gear} size={24} x={cur[0] - 12} y={cur[1] - 48} />
          <text x={cur[0] + 14} y={cur[1] - 30} fontSize="10" fill="var(--muted)">tú</text>
        </g>
      )}
    </svg>
  );
}
