import { NavLink } from 'react-router-dom';
import { ProgressBar } from '@/ui/primitives/ProgressBar';
import { Robot } from '@/ui/primitives/Robot';
import { gearOf, levelOf, XP_PER_LEVEL } from './game';
import { useLeaderboard } from './useGame';
import './game.css';

/** Robot, nivel y XP en la barra superior; lleva al ranking. */
export function XpBadge() {
  const { me } = useLeaderboard();
  if (!me) return null;
  const { level, into } = levelOf(me.xp);
  return (
    <NavLink to="/ranking" className="xpbadge" aria-label={`Nivel ${level}, ${me.xp} XP. Ver ranking`}>
      <Robot color={me.color} gear={gearOf(me.mastered)} size={22} />
      <span className="xpbadge__lvl">Nv {level}</span>
      <ProgressBar value={into} max={XP_PER_LEVEL} label="XP del nivel" />
      <span className="muted small">{me.xp} XP</span>
    </NavLink>
  );
}
