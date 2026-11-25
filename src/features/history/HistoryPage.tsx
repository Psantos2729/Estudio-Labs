import { Link } from 'react-router-dom';
import { displayId } from '@/content/types';
import { useModuleViews } from '@/features/map/useMastery';
import { daysUntil } from '@/features/map/masteryView';
import { attemptResult } from './attempts';
import { useAttempts } from './useHistory';
import '@/features/lesson/lesson.css';
import './history.css';

const when = (iso: string) => new Date(iso).toLocaleString('es', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

/** /historial: estado de cada módulo empezado y todos los exámenes y repasos. Solo lectura. */
export function HistoryPage() {
  const { views, isGuest, isLoading } = useModuleViews();
  const { attempts, isLoading: loadingAttempts, error } = useAttempts();
  if (isGuest) return <p className="center muted"><Link to="/login">Entra</Link> para ver tu historial.</p>;
  if (isLoading || loadingAttempts) return <p className="center muted">cargando historial…</p>;

  const started = views.filter((v) => v.status !== 'locked');
  const title = Object.fromEntries(views.map((v) => [v.module.id, v.module.title]));
  return (
    <main className="lesson history">
      <span className="accent small">tu avance</span>
      <h1 className="display">Historial</h1>

      <section className="panel">
        <p className="strong">módulos</p>
        <table className="history__table">
          <thead><tr><th>módulo</th><th>estado</th><th>mejor nota</th><th>próximo repaso</th></tr></thead>
          <tbody>
            {started.map((v) => (
              <tr key={v.module.id}>
                <td><span className="accent">{displayId(v.module.id)}</span> {v.module.title}</td>
                <td className={`route__item--${v.status}${v.review === 'due' ? ' route__item--due' : ''}`}><span className="route__icon">{v.icon}</span> {v.label}</td>
                <td>{v.score !== null ? `${v.score}%` : '—'}</td>
                <td>
                  {v.review === 'due' ? <Link to={`/repaso/${v.module.id}`}>hoy →</Link>
                    : v.review === 'scheduled' && v.nextReviewAt ? daysUntil(v.nextReviewAt)
                    : v.review === 'done' ? <span className="ok">✓ consolidado</span> : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <p className="strong">exámenes y repasos</p>
        {error ? (
          <p className="warn small" role="alert">No se pudo leer el historial: {error.message}</p>
        ) : attempts.length === 0 ? (
          <p className="muted small">Todavía no presentas ningún examen.</p>
        ) : (
          <table className="history__table">
            <thead><tr><th>fecha</th><th>módulo</th><th>tipo</th><th>nota</th><th>resultado</th><th></th></tr></thead>
            <tbody>
              {attempts.map((a) => {
                const r = attemptResult(a);
                return (
                  <tr key={a.id}>
                    <td className="muted">{when(a.started_at)}</td>
                    <td><span className="accent">{displayId(a.module_id)}</span> {title[a.module_id]}</td>
                    <td>{a.kind === 'review' ? 'repaso' : 'examen'}</td>
                    <td>{a.score !== null ? `${a.score}%` : '—'}</td>
                    <td className={r.tone}>{r.label}</td>
                    <td>{a.submitted_at && <Link to={`/historial/${a.id}`}>revisar →</Link>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
