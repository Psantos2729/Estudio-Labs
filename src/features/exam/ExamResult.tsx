import { Link } from 'react-router-dom';
import { Panel } from '@/ui/primitives/Panel';
import type { Exam, ExamOutcome } from './types';

/** Nota y cuántos puntos sacaste en cada parte. No muestra las respuestas ocultas. */
export function ExamResult({ exam, result }: { exam: Exam; result: ExamOutcome }) {
  const titles = Object.fromEntries(exam.problems.map((p) => [p.id, p.title]));
  return (
    <Panel tone={result.passed ? 'default' : 'warn'}>
      <p className={`exam__score ${result.passed ? 'ok' : 'warn'}`}>{result.score}%</p>
      <p className="strong">
        {result.passed ? '✓ Módulo dominado. Ya se abrió el siguiente.' : `Necesitas ${result.pass_score}% para aprobar.`}
      </p>
      <ul className="plain small">
        {result.problems.map((p) => (
          <li key={p.id}>· {titles[p.id] ?? p.id}: {p.passed} de {p.total} casos ocultos</li>
        ))}
        <li>· Razonamiento: {result.questions.passed} de {result.questions.total} preguntas</li>
      </ul>
      {result.retry_at && (
        <p className="muted small">
          Repasa lo que falló y vuelve a intentarlo desde las{' '}
          {new Date(result.retry_at).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}.
          Te tocarán otras preguntas.
        </p>
      )}
      {result.passed && <p className="muted small">El primer repaso de este módulo será en 3 días.</p>}
      <Link to="/mapa">← volver al mapa</Link>
    </Panel>
  );
}
