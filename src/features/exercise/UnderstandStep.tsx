import { useState } from 'react';
import { marked } from 'marked';
import type { ExerciseDef } from '@/content/types';
import { Button } from '@/ui/primitives/Button';

/** Paso 1: leer el enunciado y predecir antes de programar. Sigue solo con todas las predicciones bien. */
export function UnderstandStep({ exercise, onDone }: { exercise: ExerciseDef; onDone: () => void }) {
  const [picked, setPicked] = useState<(number | null)[]>(exercise.predict.map(() => null));
  const allRight = exercise.predict.every((q, i) => picked[i] === q.answer);

  return (
    <section className="panel">
      {/* El enunciado viene de content/ en este repo, no del usuario. */}
      <div className="prose" dangerouslySetInnerHTML={{ __html: marked.parse(exercise.statement, { async: false }) }} />
      {exercise.predict.map((q, i) => (
        <fieldset key={i} className="predict">
          <legend dangerouslySetInnerHTML={{ __html: marked.parseInline(q.question, { async: false }) }} />
          {q.options.map((o, j) => (
            <label key={j} className="predict__option">
              <input type="radio" name={`q${i}`} checked={picked[i] === j} onChange={() => setPicked(picked.map((p, k) => (k === i ? j : p)))} />
              <span>{o}</span>
            </label>
          ))}
          {picked[i] !== null && (
            <p className={picked[i] === q.answer ? 'ok' : 'warn'} aria-live="polite">
              {picked[i] === q.answer ? '✓ ' : '✗ Todavía no. '}
              <span dangerouslySetInnerHTML={{ __html: marked.parseInline(picked[i] === q.answer ? q.why : 'Vuelve a leer el código línea por línea.', { async: false }) }} />
            </p>
          )}
        </fieldset>
      ))}
      <Button onClick={onDone} disabled={!allRight}>Entendido, a analizar →</Button>
    </section>
  );
}
