import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { PracticeLevel } from '@/content/types';
import { ISLANDS } from '@/features/game/islands';
import { usePracticeSummary } from '@/features/exercise/usePractice';
import { LockedNotice } from '@/features/map/LockedNotice';
import { useModuleViews } from '@/features/map/useMastery';
import { GATE_MODULE, LEVELS, PROBLEMS, whereOf } from './problems';
import '@/features/lesson/lesson.css';
import '@/features/map/detail.css';
import './practice.css';

type Zone = 'todas' | 'extra' | number;
type State = 'todos' | 'pendientes' | 'resueltos';

function Chips<T extends string | number>({ label, value, options, onPick }: { label: string; value: T; options: [T, string][]; onPick: (v: T) => void }) {
  return (
    <div className="chips" role="group" aria-label={label}>
      {options.map(([v, text]) => (
        <button key={String(v)} type="button" className="chip" aria-pressed={v === value} onClick={() => onPick(v)}>{text}</button>
      ))}
    </div>
  );
}

/** Zona de práctica general: problemas sueltos para cuando ya venciste la primera zona del mapa. */
export function PracticePage() {
  const { views, isLoading } = useModuleViews();
  const { passed } = usePracticeSummary();
  const [level, setLevel] = useState<'todos' | PracticeLevel>('todos');
  const [zone, setZone] = useState<Zone>('todas');
  const [state, setState] = useState<State>('todos');
  const open = views.find((v) => v.module.id === GATE_MODULE)?.open ?? false;

  if (isLoading) return <p className="center muted">cargando progreso…</p>;
  const shown = PROBLEMS.filter((p) =>
    (level === 'todos' || p.level === level) &&
    (zone === 'todas' || (zone === 'extra' ? !p.zone : p.zone === zone)) &&
    (state === 'todos' || passed.has(p.id) === (state === 'resueltos')));

  return (
    <main className="lesson practice">
      <span className="accent small">práctica general · {passed.size ? `${PROBLEMS.filter((p) => passed.has(p.id)).length} de ` : ''}{PROBLEMS.length} problemas</span>
      <h1 className="display">Zona de práctica</h1>
      <p className="muted">Problemas sueltos de nivel medio a muy difícil, como los de los labs. Cada uno dice con qué zona del mapa se relaciona, o qué tema extra practica. Dan XP la primera vez que pasas todas sus pruebas.</p>
      {!open && (
        <>
          <p className="small">Se abre al vencer al {ISLANDS[0].boss.name}, el jefe del {ISLANDS[0].name} (examen de dominio de M3).</p>
          <LockedNotice moduleId={GATE_MODULE} />
        </>
      )}
      <Chips label="Nivel" value={level} onPick={setLevel} options={[['todos', 'todos'], ...Object.entries(LEVELS).map(([k, l]) => [k as PracticeLevel, l.label] as [PracticeLevel, string])]} />
      <Chips<Zone> label="Zona" value={zone} onPick={setZone} options={[['todas', 'todas las zonas'], ...ISLANDS.map((s, i) => [i + 1, `zona ${i + 1} · ${s.zone.toLowerCase()}`] as [number, string]), ['extra', 'temas extra']]} />
      <Chips<State> label="Estado" value={state} onPick={setState} options={[['todos', 'todos'], ['pendientes', 'sin resolver'], ['resueltos', 'resueltos']]} />
      <ol className="missions">
        {shown.map((p) => {
          const done = passed.has(p.id);
          const body = (
            <>
              <span className="mission__badge" aria-hidden="true">{!open ? '×' : done ? '✓' : p.id.slice(1)}</span>
              <span className="mission__title">
                {p.title}
                <span className="practice__where muted small">{whereOf(p)}</span>
              </span>
              <span className={`mission__tag practice__level practice__level--${p.level}`}>{LEVELS[p.level].label}</span>
              {open && <span className="mission__state">{done ? 'hecho' : `+${LEVELS[p.level].xp} xp`}</span>}
              {open && <span className="mission__go" aria-hidden="true">›</span>}
            </>
          );
          return (
            <li key={p.id} className={`mission mission--${!open ? 'locked' : done ? 'done' : 'todo'}`}>
              {open ? <Link className="mission__card" to={`/practica/${p.id}`}>{body}</Link> : <div className="mission__card">{body}</div>}
            </li>
          );
        })}
      </ol>
      {!shown.length && <p className="muted center">Ningún problema con esos filtros.</p>}
    </main>
  );
}
