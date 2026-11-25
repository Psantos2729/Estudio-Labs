import type { KeyboardEvent } from 'react';
import { displayId } from '@/content/types';
import { Robot } from '@/ui/primitives/Robot';
import { gearOf, ZONES } from '@/features/game/game';
import type { RankRow } from '@/features/game/useGame';
import type { ModuleView } from './masteryView';

/** Posición de cada estación (M00…M12) en el lienzo de 520×400, en 4 cuadrantes = 4 zonas. */
const SPOTS: [number, number][] = [
  [55, 85], [120, 150], [185, 80], [228, 160],
  [305, 95], [375, 155], [455, 85],
  [470, 255], [395, 335], [310, 265],
  [215, 285], [140, 350], [60, 270],
];
const ZONE_BOX = [[10, 10], [265, 10], [265, 200], [10, 200]];

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

/** Sendero de expedición: estaciones = módulos, compuertas = exámenes de dominio, robots = personas. */
export function ExpeditionMap({ views, selectedId, currentId, others, me, onSelect }: Props) {
  const spot = (id: string) => SPOTS[views.findIndex((v) => v.module.id === id)] ?? SPOTS[0];
  const key = (id: string) => (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(id); }
  };
  const cur = currentId ? spot(currentId) : null;

  return (
    <svg viewBox="0 0 520 400" className="panel expedition" role="group" aria-label="Mapa de la ruta de expedición">
      {ZONES.map((z, i) => (
        <g key={z.name}>
          <rect x={ZONE_BOX[i][0]} y={ZONE_BOX[i][1]} width="245" height="190" rx="12" fill="none" stroke={z.color} strokeOpacity="0.3" />
          <text x={ZONE_BOX[i][0] + 12} y={ZONE_BOX[i][1] + 20} fill={z.color} fontSize="10">ZONA {i + 1} · {z.name.toUpperCase()}</text>
        </g>
      ))}

      {views.slice(1).map((v, i) => {
        const [a, b] = [SPOTS[i], SPOTS[i + 1]];
        const prev = views[i];
        const done = prev.status === 'mastered';
        const gate = prev.open && !done;
        const [gx, gy] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        return (
          <g key={v.module.id}>
            <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={done ? 'var(--green)' : 'var(--line-strong)'} strokeWidth="3" strokeDasharray={done ? undefined : '6 6'} />
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
            {sel && <circle cx={x} cy={y} r="21" fill="none" stroke="var(--accent)" strokeOpacity="0.6" />}
            <circle cx={x} cy={y} r="15" fill="var(--bg)" stroke={COLOR[v.status]} strokeWidth={v.open ? 2.5 : 1.5} className={v.module.id === currentId ? 'station--now' : undefined} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fill={v.open ? 'var(--text)' : 'var(--locked)'}>{displayId(v.module.id)}</text>
            {v.review === 'due' && <text x={x + 12} y={y - 10} fontSize="12" fill="var(--amber)">↻</text>}
          </g>
        );
      })}

      {others.map((r, i) => {
        const [x, y] = spot(r.station);
        return <Robot key={`${r.rank}-${r.name}`} color={r.color} gear={gearOf(r.mastered)} size={14} x={x - 26 + (i % 4) * 4} y={y + 10 + Math.floor(i / 4) * 4} opacity={0.85} />;
      })}

      {cur && (
        <g className="me">
          <Robot color={me?.color ?? '#19d3ff'} gear={gearOf(me?.mastered ?? 0)} size={24} x={cur[0] - 12} y={cur[1] - 48} />
          <text x={cur[0] + 14} y={cur[1] - 30} fontSize="10" fill="var(--muted)">tú</text>
        </g>
      )}
    </svg>
  );
}
