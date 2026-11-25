import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/ui/primitives/Button';
import { Robot } from '@/ui/primitives/Robot';
import type { Gear } from './game';
import { PIECES, SLOTS, howOf } from './cosmetics';
import { useLeaderboard, useMyGear, useSetGear } from './useGame';
import './game.css';

/** Taller: vestir al robot con las piezas ganadas. */
export function WorkshopPage() {
  const { me, isGuest } = useLeaderboard();
  const mine = useMyGear();
  if (isGuest) return <main className="workshop"><p className="panel muted"><span><Link to="/login">Entra con tu cuenta</Link> para tener tu robot y vestirlo.</span></p></main>;
  if (!me || !mine.data) return <p className="center muted">{mine.error ? 'No se pudo cargar el taller. Intenta de nuevo.' : 'cargando…'}</p>;
  return <Workshop color={me.color} unlocked={mine.data.unlocked} initial={mine.data.gear} />;
}

function Workshop({ color, unlocked, initial }: { color: string; unlocked: string[]; initial: Gear }) {
  const [gear, setGear] = useState<Gear>(initial);
  const save = useSetGear();
  const pick = (slot: string, id?: string) => setGear({ ...gear, [slot]: id });
  const changed = JSON.stringify(gear) !== JSON.stringify(initial);

  return (
    <main className="workshop">
      <header className="detail__head">
        <span className="accent small">taller del robot</span>
        <h1 className="display">Viste a tu robot</h1>
        <p className="muted">Cada jefe de isla regala dos piezas de su ambiente; los niveles y las metas dan más. Tu robot sale así en la portada, el mapa y el ranking.</p>
      </header>
      <div className="workshop__grid">
        <section className="panel workshop__preview" aria-label="Vista previa">
          <Robot color={color} gear={gear} size={150} title="Tu robot" />
          <Button disabled={!changed || save.isPending} onClick={() => save.mutate(Object.fromEntries(Object.entries(gear).filter(([, v]) => v)))}>
            {save.isPending ? 'guardando…' : 'Guardar'}
          </Button>
          {save.isSuccess && !changed && <span className="ok small">✓ guardado</span>}
          {save.isError && <span className="warn small">No se pudo guardar. Intenta de nuevo.</span>}
        </section>
        <section className="panel" aria-label="Piezas">
          {SLOTS.map((slot) => (
            <div key={slot} role="radiogroup" aria-label={slot}>
              <p className="muted small">{slot}</p>
              <div className="workshop__row">
                <button type="button" role="radio" aria-checked={!gear[slot]} className="piece" onClick={() => pick(slot)}>
                  <span className="muted">nada</span>
                </button>
                {PIECES.filter((p) => p.slot === slot).map((p) => {
                  const owned = unlocked.includes(p.id);
                  return (
                    <button
                      key={p.id} type="button" role="radio" aria-checked={gear[slot] === p.id} className="piece"
                      disabled={!owned} onClick={() => pick(slot, p.id)}
                    >
                      <Robot color="#5c6a80" gear={{ [slot]: p.id }} size={36} />
                      <span className="strong">{p.name}</span>
                      <span className="muted small">{owned ? 'ganada' : `🔒 ${howOf(p.unlock)}`}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
