import { Link } from 'react-router-dom';
import { ProgressBar } from '@/ui/primitives/ProgressBar';
import { PIECES } from './cosmetics';
import { MedalGrid } from './MedalGrid';
import { useLeaderboard, useMyGear } from './useGame';
import './game.css';

/** /logros: vitrina con todas las medallas, las ganadas y las que faltan. */
export function AchievementsPage() {
  const { isGuest } = useLeaderboard();
  const mine = useMyGear();
  if (isGuest) return <main className="ranking"><p className="panel muted"><span><Link to="/login">Entra con tu cuenta</Link> para ganar medallas.</span></p></main>;
  if (!mine.data) return <p className="center muted">{mine.error ? 'No se pudo cargar la vitrina. Intenta de nuevo.' : 'cargando…'}</p>;
  const got = mine.data.unlocked.length;
  return (
    <main className="workshop">
      <header className="detail__head">
        <span className="accent small">vitrina de logros</span>
        <h1 className="display">{got} de {PIECES.length} medallas</h1>
        <ProgressBar value={got} max={PIECES.length} label="Medallas ganadas" />
        <p className="muted">Cada medalla trae una pieza para tu robot. Póntela en el <Link to="/taller">taller</Link>.</p>
      </header>
      <MedalGrid unlocked={mine.data.unlocked} stats={mine.data.stats} />
    </main>
  );
}
