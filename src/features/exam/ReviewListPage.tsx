import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { displayId } from '@/content/types';
import { useModuleViews } from '@/features/map/useMastery';
import { daysUntil, dueReviews, type ModuleView } from '@/features/map/masteryView';
import '@/features/lesson/lesson.css';
import './exam.css';

/** /repaso: qué repasos tocan hoy, cuáles vienen y qué módulos se reabrieron. */
export function ReviewListPage() {
  const { views, isGuest, isLoading } = useModuleViews();
  if (isLoading) return <p className="center muted">cargando progreso…</p>;

  const due = dueReviews(views);
  const reopened = views.filter((v) => v.status === 'reopened');
  const later = views.filter((v) => v.review === 'scheduled' || v.review === 'done');
  const row = (v: ModuleView, right: ReactNode) => (
    <li key={v.module.id} className="review__row">
      <span className="accent">{displayId(v.module.id)}</span>
      <span className="review__name">{v.module.title}</span>
      {right}
    </li>
  );

  return (
    <main className="lesson">
      <span className="accent small">repasos espaciados</span>
      <h1 className="display">Repasos</h1>
      <p className="muted">
        Cada módulo que dominas vuelve a los 3, 7, 21 y 60 días con un examen corto. Si fallas uno,
        ese módulo se reabre y vuelves a dar su examen; los demás siguen abiertos.
      </p>
      {isGuest ? (
        <p className="warn"><Link to="/login">Entra</Link> para tener repasos.</p>
      ) : (
        <>
          <section className="panel">
            <p className="strong">toca hoy</p>
            {due.length ? (
              <ul className="plain">{due.map((v) => row(v, <Link className="btn btn--primary" to={`/repaso/${v.module.id}`}>Repasar →</Link>))}</ul>
            ) : (
              <p className="muted small">No tienes repasos pendientes.</p>
            )}
          </section>
          {reopened.length > 0 && (
            <section className="panel panel--warn">
              <p className="warn strong">reabiertos</p>
              <ul className="plain">{reopened.map((v) => row(v, <Link to={`/examen/${v.module.id}`}>dar el examen →</Link>))}</ul>
            </section>
          )}
          <section className="panel">
            <p className="strong">más adelante</p>
            {later.length ? (
              <ul className="plain">
                {later.map((v) => row(v, <span className={v.nextReviewAt ? 'muted small' : 'ok small'}>
                  {v.nextReviewAt ? daysUntil(v.nextReviewAt) : '✓ consolidado'}
                </span>))}
              </ul>
            ) : (
              <p className="muted small">Cuando domines un módulo, aquí verás sus próximos repasos.</p>
            )}
          </section>
        </>
      )}
    </main>
  );
}
