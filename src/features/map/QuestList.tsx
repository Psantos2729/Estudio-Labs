import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { RowState } from './questPath';

export interface QuestRow {
  id: string;
  title: string;
  state: RowState;
  to?: string; // sin destino: fila de un módulo bloqueado
  badge?: ReactNode; // reemplaza el número (sprite del jefe)
  tag?: 'reto' | 'jefe';
  extra?: ReactNode; // acción aparte, fuera de la fila
}

const STATE_TAG: Record<RowState, string | null> = { done: 'hecho', next: 'siguiente', todo: null };

/** Lista de misiones: cada fila es una tarjeta con estado; solo las que llevan a algún lado reaccionan al cursor. */
export function QuestList({ label, note, rows, locked }: { label: string; note?: string; rows: QuestRow[]; locked: boolean }) {
  return (
    <section className="panel" aria-label={label}>
      <p className="small">{label.toLowerCase()}{note && <span className="muted"> · {note}</span>}</p>
      <ol className="missions">
        {rows.map((r, i) => {
          const state = locked ? 'locked' : r.state;
          const body = (
            <>
              <span className="mission__badge" aria-hidden="true">{locked ? '×' : r.state === 'done' ? '✓' : (r.badge ?? i + 1)}</span>
              <span className="mission__title">{r.title}</span>
              {r.tag && <span className={`mission__tag mission__tag--${r.tag}`}>{r.tag}</span>}
              {!locked && STATE_TAG[r.state] && <span className="mission__state">{STATE_TAG[r.state]}</span>}
              {r.to && <span className="mission__go" aria-hidden="true">›</span>}
            </>
          );
          return (
            <li key={r.id} className={`mission mission--${state}${r.tag ? ` mission--${r.tag}` : ''}`}>
              {r.to ? <Link className="mission__card" to={r.to}>{body}</Link> : <div className="mission__card">{body}</div>}
              {r.extra}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
