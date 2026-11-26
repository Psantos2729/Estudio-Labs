import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Robot } from '@/ui/primitives/Robot';
import { levelOf, XP_RULES } from './game';
import { useLeaderboard, type Period } from './useGame';
import './game.css';

const TABS: { id: Period; label: string }[] = [
  { id: 'week', label: 'esta semana' },
  { id: 'all', label: 'desde siempre' },
];

export function RankingPage() {
  const [period, setPeriod] = useState<Period>('week');
  const { rows, isGuest, isLoading, error } = useLeaderboard(period);

  return (
    <main className="ranking">
      <header className="detail__head">
        <span className="accent small">$ ranking --xp</span>
        <h1 className="display">Ranking</h1>
        <p className="muted">Quienes más XP ganaron. El XP lo calcula el servidor y solo cuenta la primera vez de cada logro.</p>
      </header>

      {isGuest ? (
        <p className="panel muted"><span><Link to="/login">Entra con tu cuenta</Link> para tener tu robot y aparecer en el ranking.</span></p>
      ) : (
        <section className="panel" aria-label="Tabla de posiciones">
          <div className="ranking__tabs" role="tablist">
            {TABS.map((t) => (
              <button key={t.id} type="button" role="tab" aria-selected={period === t.id} className="ranking__tab" onClick={() => setPeriod(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
          <p className="muted small">
            {period === 'week' ? 'XP ganado desde el lunes. Se reinicia cada lunes a medianoche (hora de Guatemala), así cualquiera puede quedar primero.' : 'Todo el XP desde que empezaste.'}
            {' '}Toca a alguien para ver su perfil.
          </p>
          {isLoading && <p className="muted">cargando…</p>}
          {error && <p className="warn">No se pudo cargar el ranking. Intenta de nuevo.</p>}
          <ol className="board">
            {rows.map((r) => (
              <li key={r.handle}>
                <Link to={`/perfil/${r.handle}`} className={`board__row${r.is_me ? ' board__row--me' : ''}`}>
                  <span className={r.rank <= 3 ? 'warn strong' : 'muted'}>{r.rank}</span>
                  <Robot color={r.color} gear={r.gear} size={26} />
                  <span className="board__name">{r.name}{r.is_me && <span className="muted small"> · tú</span>}</span>
                  <span className="muted small">Nv {levelOf(r.total_xp ?? r.xp).level} · {r.station}</span>
                  <span className="board__xp">{r.xp} XP</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="panel" aria-label="Cómo se gana XP">
        <p className="small accent">cómo se gana XP</p>
        <ul className="xp-rules">
          {XP_RULES.map((r) => <li key={r.label}><span>{r.label}</span><span className="ok">+{r.xp}</span></li>)}
        </ul>
        <p className="muted small">Cada 500 XP subes un nivel. Al vencer al jefe de cada sector y al subir de nivel ganas piezas para vestir a tu robot en el <Link to="/taller">taller</Link>.</p>
      </section>
    </main>
  );
}
