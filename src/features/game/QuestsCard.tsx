import { ProgressBar } from '@/ui/primitives/ProgressBar';
import { Robot } from '@/ui/primitives/Robot';
import { PIECES } from './cosmetics';
import { STREAK_BONUS, STREAK_EVERY } from './game';
import { useQuests } from './useGame';

/** Portada: días seguidos estudiando y las 3 misiones de hoy. */
export function QuestsCard() {
  const { data } = useQuests();
  if (!data) return null;
  const { streak, best, today, missions } = data;
  const toBonus = STREAK_EVERY - (streak % STREAK_EVERY);
  const prize = PIECES.find((p) => p.unlock[0] === 'racha' && best < Number(p.unlock[1]));
  const allDone = missions.every((m) => m.done >= m.goal);

  return (
    <section className="quests" aria-label="Racha y misiones">
      <div className={`panel streak${today ? ' streak--lit' : ''}`}>
        <span className="streak__flame" aria-hidden="true">🔥</span>
        <p className="streak__days"><span className="stat__value">{streak}</span> {streak === 1 ? 'día seguido' : 'días seguidos'}</p>
        <p className="muted small">
          {today ? 'Hoy ya cuenta.' : streak ? 'Estudia hoy para no perderla.' : 'Lee una lección o resuelve un ejercicio para empezarla.'}
          {' '}Faltan {toBonus} {toBonus === 1 ? 'día' : 'días'} para +{STREAK_BONUS} XP · mejor racha: {best}
        </p>
        {prize && (
          <p className="streak__prize small">
            <Robot color="#5c6a80" gear={{ [prize.slot]: prize.id }} size={30} />
            <span>a los {prize.unlock[1]} días: <span className="strong">{prize.name}</span></span>
          </p>
        )}
      </div>
      <div className="panel missions">
        <p className="small accent">misiones de hoy {allDone && <span className="ok">· ✓ todas cumplidas</span>}</p>
        <ul className="plain missions__list">
          {missions.map((m) => {
            const done = m.done >= m.goal;
            return (
              <li key={m.id} className={`mission${done ? ' mission--done' : ''}`}>
                <span className={done ? 'ok' : 'muted'} aria-hidden="true">{done ? '✓' : '○'}</span>
                <span className="mission__label">{m.label}</span>
                <span className="mission__xp">+{m.xp} XP</span>
                <ProgressBar value={m.done} max={m.goal} label={`${m.label}: ${m.done} de ${m.goal}`} />
              </li>
            );
          })}
        </ul>
        <p className="muted small">Cambian a medianoche (hora de Guatemala). La tercera rota cada día.</p>
      </div>
    </section>
  );
}
