import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/ui/primitives/Button';
import { ProgressBar } from '@/ui/primitives/ProgressBar';
import { Robot } from '@/ui/primitives/Robot';
import { levelOf, ROBOT_COLORS, XP_PER_LEVEL } from './game';
import { useUpdateCharacter, type RankRow } from './useGame';

/** Tarjeta del personaje en la portada: robot, nivel y edición de nombre y color. */
export function CharacterCard({ me }: { me: RankRow }) {
  const [name, setName] = useState(me.name === 'Estudiante' ? '' : me.name);
  const [color, setColor] = useState(me.color);
  const save = useUpdateCharacter();
  const { level, into } = levelOf(me.xp);
  const changed = name.trim() !== (me.name === 'Estudiante' ? '' : me.name) || color !== me.color;

  return (
    <section className="panel character" aria-label="Tu personaje">
      <Robot color={color} gear={me.gear} size={96} title="Tu robot" className="character__robot" />
      <div className="character__info">
        <p className="small accent">tu personaje · Nv {level}</p>
        <ProgressBar value={into} max={XP_PER_LEVEL} label="XP del nivel" />
        <p className="muted small">{me.xp} XP · faltan {XP_PER_LEVEL - into} para el nivel {level + 1} · <Link to="/ranking">puesto #{me.rank}</Link></p>
        <form
          className="character__form"
          onSubmit={(e) => { e.preventDefault(); save.mutate({ display_name: name.trim(), avatar_color: color }); }}
        >
          <label className="small muted" htmlFor="robot-name">nombre en el ranking</label>
          <input id="robot-name" className="input" value={name} maxLength={60} placeholder="tu nombre" onChange={(e) => setName(e.target.value)} />
          <div className="character__colors" role="radiogroup" aria-label="Color del robot">
            {ROBOT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={c === color}
                aria-label={`color ${c}`}
                className="swatch"
                style={{ background: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
          <Button type="submit" variant="ghost" disabled={!changed || save.isPending}>
            {save.isPending ? 'guardando…' : 'guardar'}
          </Button>
          {save.isError && <span className="warn small">No se pudo guardar. Intenta de nuevo.</span>}
        </form>
        <p className="small"><Link to="/taller">vestir a tu robot en el taller →</Link></p>
      </div>
    </section>
  );
}
