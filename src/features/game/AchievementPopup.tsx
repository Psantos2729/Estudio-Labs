import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthProvider';
import { Button } from '@/ui/primitives/Button';
import { Robot } from '@/ui/primitives/Robot';
import { PIECE_BY_ID, howOf } from './cosmetics';
import { markSeen, newAchievements } from './newAchievements';
import { useLeaderboard, useMyGear, useSetGear } from './useGame';

/** Pantalla «¡Logro completado!» con las piezas recién ganadas; se pueden poner ahí mismo. */
export function AchievementPopup() {
  const userId = useAuth().session?.user.id;
  const { data } = useMyGear();
  const { me } = useLeaderboard();
  const { pathname } = useLocation();
  const [fresh, setFresh] = useState<string[]>([]);
  const [worn, setWorn] = useState<string[]>([]);
  const save = useSetGear();
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!userId || !data) return;
    const found = newAchievements(userId, data.unlocked).filter((id) => PIECE_BY_ID[id]);
    if (!found.length) return;
    // En el examen espera a que termine la pelea con el jefe.
    const t = setTimeout(() => setFresh(found), /^\/(examen|repaso)\//.test(pathname) ? 4500 : 900);
    return () => clearTimeout(t);
  }, [userId, data, pathname]);

  useEffect(() => {
    if (!fresh.length) return;
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && done();
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  });

  if (!fresh.length || !data || !userId) return null;
  const done = () => { markSeen(userId, data.unlocked); setFresh([]); setWorn([]); };
  const wear = (id: string) => {
    const p = PIECE_BY_ID[id];
    save.mutate({ ...data.gear, [p.slot]: id }, { onSuccess: () => setWorn((w) => [...w, id]) });
  };

  return (
    <div className="achv" role="presentation" onClick={(e) => e.target === e.currentTarget && done()}>
      <section className="panel achv__card" role="dialog" aria-modal="true" aria-labelledby="achv-title">
        <span className="achv__burst" aria-hidden="true" />
        <p className="small accent">{fresh.length === 1 ? 'pieza nueva' : `${fresh.length} piezas nuevas`}</p>
        <h2 id="achv-title" className="display achv__title">¡Logro completado!</h2>
        <ul className="achv__list">
          {fresh.map((id) => {
            const p = PIECE_BY_ID[id];
            return (
              <li key={id} className="achv__item">
                <Robot color={me?.color ?? '#19d3ff'} gear={{ ...data.gear, [p.slot]: id }} size={84} title={p.name} className="achv__robot" />
                <span className="strong">{p.name}</span>
                <span className="muted small">{howOf(p.unlock)}</span>
                {worn.includes(id)
                  ? <span className="ok small">✓ puesta</span>
                  : <Button variant="ghost" disabled={save.isPending} onClick={() => wear(id)}>Ponérmela</Button>}
              </li>
            );
          })}
        </ul>
        {save.isError && <p className="warn small">No se pudo poner. Intenta desde el taller.</p>}
        <div className="achv__actions">
          <Button ref={close} onClick={done}>¡Genial!</Button>
          <Link to="/logros" className="small" onClick={done}>ver la vitrina →</Link>
        </div>
      </section>
    </div>
  );
}
