import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/ui/primitives/Button';
import type { GridStep, Step } from './blocks';

const LEGEND: Record<string, string> = { c: 'comparando', i: 'intercambio', o: 'en su lugar', k: 'clave o encontrado', x: 'descartado' };
const GRID_LEGEND: Record<string, string> = { c: 'se lee', i: 'se escribe', o: 'listo', k: 'resultado', x: 'no se usa' };

/** Recorre un algoritmo paso a paso: cada valor es una barra (o una casilla si es texto) con su posición debajo. */
export function StepViewer({ steps }: { steps: Step[] }) {
  const nums = steps.flatMap((s) => s.values.map(Number));
  const numeric = nums.every((n) => !Number.isNaN(n));
  const max = Math.max(1, ...nums.map(Math.abs));
  return (
    <Walk notes={steps.map((s) => s.note)} legend={LEGEND} used={steps.flatMap((s) => Object.values(s.marks))}>
      {(i) => (
        <div className={`walk__row${numeric ? '' : ' walk__row--text'}`}>
          {steps[i].values.map((v, k) => (
            <div key={k} className={`walk__cell walk__cell--${steps[i].marks[k] ?? 'n'}`}>
              {numeric && <span className="walk__bar" style={{ height: `${8 + (Math.abs(Number(v)) / max) * 92}%` }} />}
              <span className="walk__val">{v}</span>
              <span className="walk__idx">{k}</span>
            </div>
          ))}
        </div>
      )}
    </Walk>
  );
}

/** Igual, con una o varias matrices lado a lado (por ejemplo A × B = C); fila y columna en los bordes. */
export function GridViewer({ steps }: { steps: GridStep[] }) {
  return (
    <Walk notes={steps.map((s) => s.note)} legend={GRID_LEGEND} used={steps.flatMap((s) => Object.values(s.marks))}>
      {(i) => (
        <div className="walk__grids">
          {steps[i].grids.map((g, m) => (
            <div key={m} className="walk__grid">
              {g.label && <span className="accent small">{g.label}</span>}
              <table>
                <thead><tr><th />{g.rows[0]?.map((_, c) => <th key={c} className="walk__idx">{c}</th>)}</tr></thead>
                <tbody>
                  {g.rows.map((row, r) => (
                    <tr key={r}>
                      <th className="walk__idx">{r}</th>
                      {row.map((v, c) => (
                        <td key={c} className={`walk__cell--${steps[i].marks[`${m}:${r}.${c}`] ?? 'n'}`}><span className="walk__val">{v}</span></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </Walk>
  );
}

/** Controles comunes: anterior, siguiente, reproducir, la nota del paso y la leyenda de colores. */
function Walk({ notes, legend, used, children }: {
  notes: string[]; legend: Record<string, string>; used: string[]; children: (i: number) => ReactNode;
}) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const last = notes.length - 1;
  const marks = [...new Set(used)].filter((m) => legend[m]);

  useEffect(() => {
    if (!playing) return;
    if (i >= last) return setPlaying(false);
    const t = setTimeout(() => setI(i + 1), 1100);
    return () => clearTimeout(t);
  }, [playing, i, last]);

  return (
    <figure className="walk" aria-label="Recorrido paso a paso">
      {children(i)}
      <figcaption className="walk__note" aria-live="polite">
        <span className="accent">paso {i + 1} de {notes.length}</span> {notes[i]}
      </figcaption>
      <div className="walk__bar-ui">
        <Button variant="ghost" aria-label="volver al inicio" onClick={() => { setPlaying(false); setI(0); }} disabled={i === 0}>⟲</Button>
        <Button variant="ghost" onClick={() => { setPlaying(false); setI(i - 1); }} disabled={i === 0}>← anterior</Button>
        <Button onClick={() => { setPlaying(false); setI(i + 1); }} disabled={i === last}>siguiente →</Button>
        <Button variant="ghost" onClick={() => { if (i === last) setI(0); setPlaying(!playing); }}>{playing ? '❚❚ pausa' : '▶ reproducir'}</Button>
      </div>
      {marks.length > 0 && (
        <p className="walk__legend small muted">
          {marks.map((m) => <span key={m}><i className={`walk__dot walk__cell--${m}`} />{legend[m]}</span>)}
        </p>
      )}
    </figure>
  );
}
