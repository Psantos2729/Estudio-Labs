import { Link } from 'react-router-dom';
import { Panel } from '@/ui/primitives/Panel';
import { daysUntil } from '@/features/map/masteryView';
import type { Exam, ExamOutcome } from './types';

/** Nota y cuántos puntos sacaste en cada parte. No muestra las respuestas ocultas. */
export function ExamResult({ exam, result }: { exam: Exam; result: ExamOutcome }) {
  const titles = Object.fromEntries(exam.problems.map((p) => [p.id, p.title]));
  const review = result.kind === 'review';
  const headline = !review
    ? result.passed ? '✓ Módulo dominado. Ya se abrió el siguiente.' : `Necesitas ${result.pass_score}% para aprobar.`
    : !result.passed ? 'No aprobaste el repaso: el módulo se reabrió.'
    : result.next_review_at ? `✓ Repaso aprobado. El próximo es ${daysUntil(result.next_review_at)}.`
    : '✓ Repaso aprobado. Módulo consolidado: ya no pide más repasos.';
  return (
    <Panel tone={result.passed ? 'default' : 'warn'}>
      <p className={`exam__score ${result.passed ? 'ok' : 'warn'}`}>{result.score}%</p>
      <p className="strong">{headline}</p>
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
      {review && !result.passed && (
        <p className="muted small">
          Los demás módulos siguen abiertos. Repasa las lecciones y vuelve a dar el{' '}
          <Link to={`/examen/${exam.module_id}`}>examen de dominio</Link> cuando quieras; no hay espera.
        </p>
      )}
      {!review && result.passed && <p className="muted small">El primer repaso de este módulo será en 3 días.</p>}
      <Link to="/mapa">← volver al mapa</Link>
    </Panel>
  );
}
