import { useEffect, useState } from 'react';
import { Robot } from '@/ui/primitives/Robot';
import { PixelSprite } from '@/ui/primitives/PixelSprite';
import { MINI_BOSSES } from '@/features/game/minibosses';
import { islandOf } from '@/features/game/islands';
import { useLeaderboard } from '@/features/game/useGame';
import { bossLife } from './battle';

interface Props {
  moduleId: string;
  /** Puntos del examen (casos ocultos + preguntas) y % para aprobar. */
  total: number;
  passScore: number;
  /** Puntos acertados; sin esto la pelea todavía no empieza (durante el examen). */
  hits?: number;
  passed?: boolean;
}

const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** El examen como pelea: cada punto acertado le quita 1 de vida al jefe del módulo. */
export function BossBattle({ moduleId, total, passScore, hits, passed }: Props) {
  const { me } = useLeaderboard();
  const index = Number(moduleId.slice(1));
  const island = islandOf(index);
  // El último módulo de cada isla lo cuida el jefe de la isla; los demás, su mini jefe.
  const boss = island.last === index ? island.boss : MINI_BOSSES[index];
  const life = bossLife(total, passScore);
  const [shown, setShown] = useState(() => (hits !== undefined && reduced() ? hits : 0));

  useEffect(() => {
    if (hits === undefined || shown >= hits) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 600 : 260);
    return () => clearTimeout(t);
  }, [hits, shown]);

  const left = Math.max(0, life - shown);
  const over = hits !== undefined && shown >= hits;
  const won = over && passed;
  const state = hits === undefined ? '' : won ? ' battle--won' : over ? ' battle--lost' : ' battle--fight';

  return (
    <div className={`scene battle${state}`}>
      <div className="scene__me">
        {won && <span className="scene__bubble" role="status">¡Jefe vencido!</span>}
        <Robot color={me?.color ?? '#19d3ff'} gear={me?.gear} size={56} title="Tu robot" className="scene__robot battle__robot" />
      </div>
      <div className="battle__hud">
        <p className="small"><span className="warn strong">{boss.name}</span> <span className="muted">· vida {left} de {life}</span></p>
        <div className="battle__life" role="meter" aria-label={`Vida de ${boss.name}`} aria-valuemin={0} aria-valuemax={life} aria-valuenow={left}>
          <span style={{ width: `${(100 * left) / life}%` }} />
        </div>
        <p className="small muted" aria-live="polite">
          {hits === undefined
            ? `Cada punto que aciertes le quita 1 de vida. Al entregar se ve la pelea: necesitas ${life} de ${total} golpes.`
            : !over ? `golpe ${shown} de ${hits}…`
            : won ? `Le diste ${hits} golpes de ${total}${hits > life ? `: ${hits - life} de sobra` : ''}.`
            : `Le diste ${hits} de ${total} golpes. Resiste con ${left} de vida: le faltaron ${life - hits}.`}
        </p>
      </div>
      <div className="battle__boss">
        {hits !== undefined && shown > 0 && !over && <span key={shown} className="battle__hit" aria-hidden="true">−1</span>}
        <PixelSprite key={shown} name={boss.sprite} size={64} title={boss.name} className="scene__boss battle__sprite" />
      </div>
    </div>
  );
}
