import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LockedNotice } from '@/features/map/LockedNotice';
import { useModuleViews } from '@/features/map/useMastery';
import { warmUp } from '@/features/runner/runner';
import { ExerciseFlow } from '@/features/exercise/ExerciseFlow';
import { useLastAttempt } from '@/features/exercise/usePractice';
import { GATE_MODULE, LEVELS, getProblem, whereOf } from './problems';
import '@/features/lesson/lesson.css';
import '@/features/exercise/exercise.css';

/** Un problema de la zona de práctica: los mismos pasos, editor y pruebas que un ejercicio de módulo. */
export function ProblemPage() {
  const { problemId = '' } = useParams();
  const problem = getProblem(problemId);
  const { views, isLoading } = useModuleViews();
  const open = views.find((v) => v.module.id === GATE_MODULE)?.open ?? false;
  const last = useLastAttempt(problemId);

  useEffect(() => {
    if (open && problem) warmUp(); // Python baja mientras el estudiante lee y analiza
  }, [open, problem]);

  if (!problem) return <p className="center muted">Ese problema no existe. <Link to="/practica">volver a la práctica</Link></p>;
  if (isLoading || last.isLoading) return <p className="center muted">cargando progreso…</p>;
  return (
    <main className="lesson">
      <Link to="/practica" className="small">← práctica</Link>
      {open ? (
        <>
          <span className="accent small">{LEVELS[problem.level].label} · {whereOf(problem)} · +{LEVELS[problem.level].xp} xp</span>
          <h1 className="display">{problem.title}</h1>
          <ExerciseFlow key={problem.id} exercise={problem} saved={last.attempt} canSave={last.canSave} />
        </>
      ) : (
        <LockedNotice moduleId={GATE_MODULE} />
      )}
    </main>
  );
}
