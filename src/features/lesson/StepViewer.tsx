import { useEffect, useState } from 'react';
import { Button } from '@/ui/primitives/Button';
import type { Step } from './blocks';

const LEGEND: Record<string, string> = { c: 'comparando', i: 'intercambio', o: 'en su lugar', k: 'clave o encontrado', x: 'descartado' };

/** Recorre un algoritmo paso a paso: cada valor es una barra (o una casilla si es texto) con su posición debajo. */
export function StepViewer({ steps }: { steps: Step[] }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const last = steps.length - 1;
  const step = steps[i];
  const nums = steps.flatMap((s) => s.values.map(Number));
  const numeric = nums.every((n) => !Number.isNaN(n));
  const max = Math.max(1, ...nums.map(Math.abs));
  const used = [...new Set(steps.flatMap((s) => Object.values(s.marks)))].filter((m) => LEGEND[m]);

  useEffect(() => {
    if (!playing) return;
    if (i >= last) return setPlaying(false);
    const t = setTimeout(() => setI(i + 1), 1100);
    return () => clearTimeout(t);
  }, [playing, i, last]);

  return (
    <figure className="walk" aria-label="Recorrido paso a paso">
      <div className={`walk__row${numeric ? '' : ' walk__row--text'}`}>
        {step.values.map((v, k) => (
          <div key={k} className={`walk__cell walk__cell--${step.marks[k] ?? 'n'}`}>
            {numeric && <span className="walk__bar" style={{ height: `${8 + (Math.abs(Number(v)) / max) * 92}%` }} />}
            <span className="walk__val">{v}</span>
            <span className="walk__idx">{k}</span>
          </div>
        ))}
      </div>
      <figcaption className="walk__note" aria-live="polite">
        <span className="accent">paso {i + 1} de {steps.length}</span> {step.note}
      </figcaption>
      <div className="walk__bar-ui">
        <Button variant="ghost" aria-label="volver al inicio" onClick={() => { setPlaying(false); setI(0); }} disabled={i === 0}>⟲</Button>
        <Button variant="ghost" onClick={() => { setPlaying(false); setI(i - 1); }} disabled={i === 0}>← anterior</Button>
        <Button onClick={() => { setPlaying(false); setI(i + 1); }} disabled={i === last}>siguiente →</Button>
        <Button variant="ghost" onClick={() => { if (i === last) setI(0); setPlaying(!playing); }}>{playing ? '❚❚ pausa' : '▶ reproducir'}</Button>
      </div>
      {used.length > 0 && (
        <p className="walk__legend small muted">
          {used.map((m) => <span key={m}><i className={`walk__dot walk__cell--${m}`} />{LEGEND[m]}</span>)}
        </p>
      )}
    </figure>
  );
}
