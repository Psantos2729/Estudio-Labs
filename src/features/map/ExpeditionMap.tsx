import { displayId } from '@/content/types';
import { Robot } from '@/ui/primitives/Robot';
import { PixelSprite } from '@/ui/primitives/PixelSprite';
import type { RankRow } from '@/features/game/useGame';
import type { ModuleView } from './masteryView';
import { BOAT_ART, DOCK, ROUTE, SEA_ISLANDS, SECTORS, WORLD } from './seaChart';
import { useSail } from './useSail';

interface Props {
  views: ModuleView[];
  selectedId: string;
  currentId: string | undefined;
  others: RankRow[];
  me: RankRow | undefined;
  onSelect: (id: string) => void;
}

/** Carta de navegación: cada módulo es una isla; tu barco atraca en la isla del módulo en curso. */
export function ExpeditionMap({ views, selectedId, currentId, others, me, onSelect }: Props) {
  const allDone = views.length > 0 && views.every((v) => v.status === 'mastered');
  const at = allDone ? views.length - 1 : Math.max(0, views.findIndex((v) => v.module.id === currentId));
  const next = allDone ? -1 : at + 1;
  const { boat, viewRef } = useSail(at);
  const beaten = SECTORS.filter((s) => views[s.zone.last]?.status === 'mastered');
  const dockOf = (id: string) => ROUTE[DOCK[Math.max(0, views.findIndex((v) => v.module.id === id))]];

  return (
    <div className="panel chart" ref={viewRef} role="group" aria-label="Carta de navegación: 12 islas y el puerto">
      <div className="chart__world" style={{ width: WORLD.w, height: WORLD.h }}>
        <svg className="chart__sea" width={WORLD.w} height={WORLD.h} aria-hidden="true">
          <defs>
            <pattern id="sea-a" width="46" height="22" patternUnits="userSpaceOnUse">
              <path d="M2 14 q6 -6 12 0 t12 0" stroke="#6f9bff" strokeOpacity="0.12" fill="none" strokeWidth="1.4" />
              <animateTransform attributeName="patternTransform" type="translate" from="0 0" to="46 0" dur="6.4s" repeatCount="indefinite" />
            </pattern>
            <pattern id="sea-b" width="92" height="44" patternUnits="userSpaceOnUse">
              <path d="M20 30 q8 -7 16 0 t16 0" stroke="#a9c2ff" strokeOpacity="0.07" fill="none" strokeWidth="1.6" />
              <animateTransform attributeName="patternTransform" type="translate" values="0 0; 0 -3; 0 0" dur="3.2s" repeatCount="indefinite" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sea-a)" />
          <rect width="100%" height="100%" fill="url(#sea-b)" />
        </svg>

        {SECTORS.map(({ zone, x, w }, z) => (
          <div key={zone.name} className="chart__sector" style={{ left: x, width: w, color: zone.color }}>
            <span>SECTOR {z + 1} · {zone.zone.toUpperCase()} · {zone.name}</span>
            {at < zone.first && <div className="chart__fog" />}
          </div>
        ))}

        {views.map((v, i) => {
          const isl = SEA_ISLANDS[i];
          if (!isl) return null;
          const near = v.status === 'mastered' || i === at || i === next || v.module.id === selectedId;
          const tone = v.status === 'mastered' ? 'done' : v.status === 'reopened' ? 'reopened' : i === at ? 'now' : i === next ? 'next' : 'far';
          const top = isl.cy - 60 * isl.s;
          return (
            <div key={v.module.id}>
              {i === next && <div className="isle__glow" style={{ left: isl.cx - isl.w * 0.6, top: isl.cy - isl.h * 0.55, width: isl.w * 1.2, height: isl.h * 0.9 }} />}
              <button
                type="button"
                className={`isle${near ? '' : ' isle--far'}`}
                style={{ left: isl.cx - isl.w / 2, top, width: isl.w, height: isl.h }}
                aria-label={`${displayId(v.module.id)} ${isl.name}: ${v.module.title}, ${v.label}`}
                aria-current={v.module.id === selectedId ? 'true' : undefined}
                onClick={() => onSelect(v.module.id)}
              >
                <img src={isl.art} alt="" />
              </button>
              <div className={`isle__label isle__label--${tone}`} style={{ left: isl.cx - 90, top: isl.cy + 32 * isl.s + 3 }}>
                {displayId(v.module.id)} · {isl.name}{v.status === 'mastered' ? ' ✓' : ''}{v.review === 'due' ? ' ↻' : ''}
              </div>
              {i === next && <div className="isle__next" style={{ left: isl.cx - 50, top: top - 24 }}>SIGUIENTE ▼</div>}
            </div>
          );
        })}

        {SECTORS.map(({ zone, medal: [mx, my] }) => {
          const won = beaten.some((b) => b.zone === zone);
          return (
            <div key={zone.boss.name} className={`chart__boss${won ? ' chart__boss--won' : ''}`} style={{ left: mx - 60, top: my - 26, color: zone.color }}>
              <PixelSprite name={zone.boss.sprite} size={40} title={`Jefe del sector: ${zone.boss.name}${won ? ' (vencido)' : ''}`} />
              <span>{zone.boss.name}{won ? ' ✓' : ''}</span>
            </div>
          );
        })}

        {others.map((r, i) => {
          const [x, y] = dockOf(r.station);
          return (
            <div key={`${r.rank}-${r.name}`} className="chart__other" style={{ left: x - 50 - (i % 3) * 14, top: y + 6 + Math.floor(i / 3) * 10 }} title={r.name}>
              <img src={BOAT_ART} alt="" />
              <Robot color={r.color} gear={r.gear} size={9} className="chart__other-robot" />
            </div>
          );
        })}

        <div className="boat" style={{ transform: `translate(${boat.x - 37}px, ${boat.y - 46}px) rotate(${boat.a}deg)` }}>
          <div className={`boat__in${boat.moving ? ' boat__in--moving' : ''}`}>
            {boat.moving && <><span className="boat__wake" /><span className="boat__wake boat__wake--2" /></>}
            <img src={BOAT_ART} alt="" className="boat__art" />
            <Robot color={me?.color ?? '#19d3ff'} gear={me?.gear} size={14} className="boat__robot" title="Tu barco" />
            <span className="boat__flags">
              {beaten.map((b) => <span key={b.zone.name} style={{ background: b.zone.color }} />)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
