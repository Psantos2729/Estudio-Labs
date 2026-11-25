import { marked } from 'marked';
import type { ExamQuestion } from './types';

/** Preguntas de razonamiento. No dice si acertaste: eso lo califica el servidor al entregar. */
export function ExamQuestions({ questions, picked, onPick }: {
  questions: ExamQuestion[]; picked: Record<number, number>; onPick: (id: number, option: number) => void;
}) {
  return (
    <section className="panel">
      <h2 className="display">Razonamiento</h2>
      {questions.map((q, i) => (
        <fieldset key={q.id} className="predict">
          <legend className="strong">Pregunta {i + 1}</legend>
          <div className="prose" dangerouslySetInnerHTML={{ __html: marked.parse(q.question, { async: false }) }} />
          {q.options.map((o, j) => (
            <label key={j} className="predict__option">
              <input type="radio" name={`eq${q.id}`} checked={picked[q.id] === j} onChange={() => onPick(q.id, j)} />
              <pre className="exam__option">{o}</pre>
            </label>
          ))}
        </fieldset>
      ))}
    </section>
  );
}
