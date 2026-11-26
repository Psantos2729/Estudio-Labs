import { Link, useParams } from 'react-router-dom';
import { displayId } from '@/content/types';
import { ProgressBar } from '@/ui/primitives/ProgressBar';
import { Robot } from '@/ui/primitives/Robot';
import { PIECES } from './cosmetics';
import { levelOf, XP_PER_LEVEL } from './game';
import { MedalGrid } from './MedalGrid';
import { useLeaderboard, useProfile } from './useGame';
import './game.css';

/** /perfil/:handle: el robot, nivel y logros de alguien del ranking. */
export function ProfilePage() {
  const { handle = '' } = useParams();
  const { isGuest } = useLeaderboard();
  const { data: p, error, isLoading } = useProfile(handle);
  if (isGuest) return <main className="ranking"><p className="panel muted"><span><Link to="/login">Entra con tu cuenta</Link> para ver perfiles.</span></p></main>;
  if (!p) return <p className="center muted">{error ? <>Ese perfil no existe. <Link to="/ranking">volver al ranking</Link></> : isLoading ? 'cargando…' : ''}</p>;
  const { level, into } = levelOf(p.xp);
  const stats = [
    { value: `Nv ${level}`, label: `${p.xp} XP` },
    { value: p.mastered, label: 'módulos dominados' },
    { value: displayId(p.station), label: 'va en' },
    { value: `🔥 ${p.streak}`, label: `días seguidos · mejor ${p.best}` },
    { value: `${p.unlocked.length}/${PIECES.length}`, label: 'medallas' },
  ];
  return (
    <main className="workshop">
      <Link to="/ranking" className="small">← ranking</Link>
      <section className="panel profile">
        <Robot color={p.color} gear={p.gear} size={120} title={`Robot de ${p.name}`} className="character__robot" />
        <div className="character__info">
          <span className="accent small">{p.is_me ? 'tu perfil público' : 'perfil'}</span>
          <h1 className="display">{p.name}</h1>
          <ProgressBar value={into} max={XP_PER_LEVEL} label="XP del nivel" />
          <div className="profile__stats">
            {stats.map((s) => (
              <div key={s.label} className="stat"><span className="stat__value">{s.value}</span><span className="muted small">{s.label}</span></div>
            ))}
          </div>
          {p.is_me && <p className="muted small">Así te ven los demás. Tu nombre y color se cambian en la <Link to="/">portada</Link>.</p>}
        </div>
      </section>
      <MedalGrid unlocked={p.unlocked} mine={p.is_me} />
    </main>
  );
}
