import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { marked } from 'marked';
import { displayId } from '@/content/types';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/features/auth/AuthProvider';
import { ExamProblemCard } from '@/features/exam/ExamProblemCard';
import type { ExamReview } from '@/features/exam/types';
import '@/features/lesson/lesson.css';
import '@/features/exercise/exercise.css';
import '@/features/exam/exam.css';
import './history.css';

const mark = (good: boolean) => <span className={good ? 'ok' : 'warn'}>{good ? '✓' : '×'}</span>;

/** /historial/:attemptId: tu entrega de un examen o repaso. No muestra salidas esperadas ni la opción correcta. */
export function AttemptReviewPage() {
  const { attemptId = '' } = useParams();
  const userId = useAuth().session?.user.id;
  const query = useQuery({
    queryKey: ['exam_review', userId, attemptId],
    enabled: Boolean(supabase && userId),
    queryFn: async (): Promise<ExamReview | null> => {
      const { data, error } = await supabase!.rpc('exam_review', { p_attempt_id: Number(attemptId) });
      if (error) throw error;
      return data as ExamReview | null;
    },
  });

  if (!userId) return <p className="center muted"><Link to="/login">Entra</Link> para revisar tus exámenes.</p>;
  if (query.isLoading) return <p className="center muted">cargando tu entrega…</p>;
  if (query.error) return <p className="center warn" role="alert">No se pudo cargar: {query.error.message}</p>;
  const r = query.data;
  if (!r) {
    return (
      <p className="center muted">
        Este intento no tiene entrega guardada (es de antes de que se guardaran, o no se entregó).{' '}
        <Link to="/historial">volver al historial</Link>
      </p>
    );
  }

  return (
    <main className="lesson">
      <Link to="/historial" className="small">← historial</Link>
      <span className="accent small">
        {displayId(r.module_id)} · {r.kind === 'review' ? 'repaso' : 'examen'} del{' '}
        {new Date(r.started_at).toLocaleString('es', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
      </span>
      <h1 className="display">
        <span className={r.passed ? 'ok' : 'warn'}>{r.score}%</span> · {r.passed ? 'aprobado' : 'reprobado'}
      </h1>
      <p className="muted small">
        Aquí ves tu código y qué imprimió con cada entrada oculta. Las salidas esperadas y las respuestas
        correctas no se muestran porque esas preguntas vuelven a salir. Copia una entrada que falló en
        "entrada para probar" y corre tu código para encontrar el error.
      </p>

      {r.problems.map((p, i) => (
        <div key={p.id} className="history__problem">
          <ExamProblemCard problem={p} n={i + 1} initial={p.code ?? ''} note="Puedes cambiar tu código y correrlo; esto ya no se califica." />
          <section className="panel">
            <p className="strong">casos ocultos: {p.cases.filter((c) => c.good).length} de {p.cases.length}</p>
            <table className="history__table">
              <thead><tr><th></th><th>entrada</th><th>lo que imprimió tu programa</th></tr></thead>
              <tbody>
                {p.cases.map((c) => (
                  <tr key={c.id}>
                    <td>{mark(c.good)}</td>
                    <td><pre className="history__pre">{c.stdin}{Object.entries(c.files ?? {}).map(([n, t]) => `\n── ${n} ──\n${t}`).join('')}</pre></td>
                    <td><pre className="history__pre">{c.given || '(nada)'}</pre></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      ))}

      <section className="panel">
        <h2 className="display">Razonamiento: {r.questions.filter((q) => q.good).length} de {r.questions.length}</h2>
        {r.questions.map((q, i) => (
          <div key={q.id} className="predict">
            <p className="strong">{mark(q.good)} Pregunta {i + 1}</p>
            <div className="prose" dangerouslySetInnerHTML={{ __html: marked.parse(q.question, { async: false }) }} />
            {q.options.map((o, j) => (
              <p key={j} className={`history__option ${String(j) === q.picked ? 'history__option--picked' : ''}`}>
                <span aria-hidden="true">{String(j) === q.picked ? '●' : '○'}</span>
                <pre className="exam__option">{o}</pre>
              </p>
            ))}
            {q.picked === null && <p className="warn small">No contestaste esta pregunta.</p>}
          </div>
        ))}
      </section>
    </main>
  );
}
