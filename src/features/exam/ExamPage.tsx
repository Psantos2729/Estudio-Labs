import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { displayId } from '@/content/types';
import { supabase } from '@/lib/supabase';
import { Button } from '@/ui/primitives/Button';
import { LockedNotice } from '@/features/map/LockedNotice';
import { useModuleViews } from '@/features/map/useMastery';
import { warmUp } from '@/features/runner/runner';
import { ExamResult } from './ExamResult';
import { ExamRun } from './ExamRun';
import { useStartExam } from './useExam';
import type { ExamOutcome } from './types';
import '@/features/lesson/lesson.css';
import '@/features/exercise/exercise.css';
import './exam.css';

/** /examen/:moduleId: reglas → examen con tiempo → nota. Todo se califica en el servidor (ADR-004). */
export function ExamPage() {
  const { moduleId = '' } = useParams();
  const { views, isGuest, isLoading } = useModuleViews();
  const view = views.find((v) => v.module.id === moduleId);
  const start = useStartExam(moduleId);
  const [result, setResult] = useState<ExamOutcome | null>(null);

  if (!view) return <p className="center muted">Ese módulo no existe. <Link to="/mapa">volver al mapa</Link></p>;
  if (isLoading) return <p className="center muted">cargando progreso…</p>;

  const m = view.module;
  const exam = start.data;
  return (
    <main className="lesson">
      <Link to="/mapa" className="small">← mapa</Link>
      <span className="accent small">{displayId(m.id)} · examen de dominio</span>
      <h1 className="display">{m.title}</h1>
      {result && exam ? <ExamResult exam={exam} result={result} />
        : exam ? <ExamRun exam={exam} passScore={m.passScore} onDone={setResult} />
        : (
          <section className="panel">
            <ul className="plain">
              <li>· 2 problemas nuevos que se califican con casos ocultos y 4 preguntas de razonamiento: 12 puntos.</li>
              <li>· Necesitas {m.passScore}% o más (11 de 12) para dominar el módulo y abrir el siguiente.</li>
              <li>· Tienes 45 minutos. Sin pistas. Si se acaba el tiempo, se entrega lo que tengas.</li>
              <li>· Si no apruebas, puedes repetirlo en 1 hora, con otras preguntas.</li>
            </ul>
            {view.status === 'reopened' && (
              <p className="warn small">Este módulo se reabrió porque fallaste un repaso. Al aprobar, los repasos empiezan de nuevo.</p>
            )}
            {!supabase || isGuest ? (
              <p className="warn">Necesitas <Link to="/login">iniciar sesión</Link> para presentar el examen.</p>
            ) : view.status === 'mastered' ? (
              <p className="ok">✓ Ya dominaste este módulo.</p>
            ) : !view.open ? (
              <LockedNotice moduleId={m.id} />
            ) : (
              <Button disabled={start.isPending} onClick={() => { warmUp(); start.mutate(); }}>
                {start.isPending ? 'preparando…' : view.status === 'in_progress' ? 'Empezar o continuar el examen' : 'Empezar examen'}
              </Button>
            )}
            {start.error && <p className="warn" role="alert">{start.error.message}</p>}
          </section>
        )}
    </main>
  );
}
