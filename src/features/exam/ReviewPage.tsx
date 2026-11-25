import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { displayId } from '@/content/types';
import { supabase } from '@/lib/supabase';
import { Button } from '@/ui/primitives/Button';
import { useModuleViews } from '@/features/map/useMastery';
import { daysUntil } from '@/features/map/masteryView';
import { warmUp } from '@/features/runner/runner';
import { ExamResult } from './ExamResult';
import { ExamRun } from './ExamRun';
import { useStartReview } from './useExam';
import type { ExamOutcome } from './types';
import '@/features/lesson/lesson.css';
import '@/features/exercise/exercise.css';
import './exam.css';

/** /repaso/:moduleId: examen corto de un módulo dominado. Lo califica el servidor (migración 013). */
export function ReviewPage() {
  const { moduleId = '' } = useParams();
  const { views, isGuest, isLoading } = useModuleViews();
  const view = views.find((v) => v.module.id === moduleId);
  const start = useStartReview(moduleId);
  const [result, setResult] = useState<ExamOutcome | null>(null);

  if (!view) return <p className="center muted">Ese módulo no existe. <Link to="/repaso">volver a repasos</Link></p>;
  if (isLoading) return <p className="center muted">cargando progreso…</p>;

  const m = view.module;
  const data = start.data;
  const exam = data && !('expired' in data) ? data : null;
  return (
    <main className="lesson">
      <Link to="/repaso" className="small">← repasos</Link>
      <span className="accent small">{displayId(m.id)} · repaso</span>
      <h1 className="display">{m.title}</h1>
      {result && exam ? <ExamResult exam={exam} result={result} />
        : exam ? <ExamRun exam={exam} onDone={setResult} />
        : (
          <section className="panel">
            <ul className="plain">
              <li>· 1 problema con casos ocultos y 3 preguntas de razonamiento: 7 puntos.</li>
              <li>· Necesitas {m.passScore}% o más (6 de 7) para aprobar.</li>
              <li>· Tienes 20 minutos. Sin pistas. Si se acaba el tiempo, se entrega lo que tengas.</li>
              <li>· Si no apruebas, el módulo se reabre y vuelves a dar su examen. Los demás siguen abiertos.</li>
            </ul>
            {data && 'expired' in data ? (
              <p className="warn">
                Se acabó el tiempo de tu repaso anterior y el módulo se reabrió.{' '}
                <Link to={`/examen/${m.id}`}>Ir al examen de dominio →</Link>
              </p>
            ) : !supabase || isGuest ? (
              <p className="warn">Necesitas <Link to="/login">iniciar sesión</Link> para hacer repasos.</p>
            ) : view.review === 'due' ? (
              <Button disabled={start.isPending} onClick={() => { warmUp(); start.mutate(); }}>
                {start.isPending ? 'preparando…' : 'Empezar o continuar el repaso'}
              </Button>
            ) : view.review === 'scheduled' && view.nextReviewAt ? (
              <p className="muted">Tu próximo repaso de este módulo es {daysUntil(view.nextReviewAt)}.</p>
            ) : view.review === 'done' ? (
              <p className="ok">✓ Módulo consolidado: ya aprobaste todos sus repasos.</p>
            ) : (
              <p className="muted">Este módulo no tiene repasos: primero aprueba su <Link to={`/examen/${m.id}`}>examen</Link>.</p>
            )}
            {start.error && <p className="warn" role="alert">{start.error.message}</p>}
          </section>
        )}
    </main>
  );
}
