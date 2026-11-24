import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getExercise } from '@/content/lessons';
import { displayId } from '@/content/types';
import { useModuleViews } from '@/features/map/useMastery';
import { warmUp } from '@/features/runner/runner';
import { ExerciseFlow } from './ExerciseFlow';
import { useLastAttempt } from './usePractice';
import '@/features/lesson/lesson.css';
import './exercise.css';

export function ExercisePage() {
  const { exerciseId = '' } = useParams();
  const exercise = getExercise(exerciseId);
  const moduleId = exerciseId.slice(0, 3);
  const { views, isLoading } = useModuleViews();
  const open = views.find((v) => v.module.id === moduleId)?.open ?? false;
  const last = useLastAttempt(exerciseId);

  useEffect(() => {
    if (open && exercise) warmUp(); // Python baja mientras el estudiante lee y analiza
  }, [open, exercise]);

  if (!exercise) return <p className="center muted">Ese ejercicio no existe. <Link to="/mapa">volver al mapa</Link></p>;
  if (isLoading || last.isLoading) return <p className="center muted">cargando progreso…</p>;
  if (!open) return <p className="center warn">Este módulo está bloqueado. <Link to="/mapa">volver al mapa</Link></p>;

  return (
    <main className="lesson">
      <Link to="/mapa" className="small">← mapa</Link>
      <span className="accent small">{displayId(moduleId)} · ejercicio{exercise.pdf ? ` · PDF C5 #${exercise.pdf}` : ''}</span>
      <h1 className="display">{exercise.title}</h1>
      <ExerciseFlow key={exercise.id} exercise={exercise} saved={last.attempt} canSave={last.canSave} />
    </main>
  );
}
