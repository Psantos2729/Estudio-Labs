import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getExercise } from '@/content/lessons';
import { displayId } from '@/content/types';
import { useModuleViews } from '@/features/map/useMastery';
import { warmUp } from '@/features/runner/runner';
import { UnderstandStep } from './UnderstandStep';
import { TextStep, type Field } from './TextStep';
import { CodeStep } from './CodeStep';
import '@/features/lesson/lesson.css';
import './exercise.css';

const STEPS = ['entender', 'analizar', 'pseudocódigo', 'código y pruebas'];

const ANALYSIS: Field[] = [
  { key: 'input', label: 'Entrada', hint: '¿Qué datos recibe el programa y de qué tipo son?' },
  { key: 'output', label: 'Salida', hint: '¿Qué debe mostrar, exactamente?' },
  { key: 'process', label: 'Proceso', hint: '¿Qué cálculos o decisiones hay entre la entrada y la salida?' },
  { key: 'edge', label: 'Casos especiales', hint: '¿Qué entradas raras podrían romperlo? (cero, negativos, texto vacío…)' },
];
const PSEUDO: Field[] = [{ key: 'pseudo', label: 'Pseudocódigo', hint: 'Los pasos en español, uno por línea: Leer…, Calcular…, Si…, Mostrar…' }];

export function ExercisePage() {
  const { exerciseId = '' } = useParams();
  const exercise = getExercise(exerciseId);
  const moduleId = exerciseId.slice(0, 3);
  const { views, isLoading } = useModuleViews();
  const open = views.find((v) => v.module.id === moduleId)?.open ?? false;
  const [step, setStep] = useState(0);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const note = (k: string, v: string) => setNotes({ ...notes, [k]: v });

  useEffect(() => {
    if (open && exercise) warmUp(); // Python baja mientras el estudiante lee y analiza
  }, [open, exercise]);

  if (!exercise) return <p className="center muted">Ese ejercicio no existe. <Link to="/">volver al mapa</Link></p>;
  if (isLoading) return <p className="center muted">cargando progreso…</p>;
  if (!open) return <p className="center warn">Este módulo está bloqueado. <Link to="/">volver al mapa</Link></p>;

  return (
    <main className="lesson">
      <Link to="/" className="small">← mapa</Link>
      <span className="ok small">{displayId(moduleId)} · ejercicio{exercise.pdf ? ` · PDF C5 #${exercise.pdf}` : ''}</span>
      <h1 className="display">{exercise.title}</h1>
      <ol className="stepper" aria-label="Pasos del ejercicio">
        {STEPS.map((s, i) => (
          <li key={s} className={i === step ? 'stepper__now' : i < step ? 'stepper__done' : ''}>
            {i < step ? (
              <button type="button" className="stepper__back" onClick={() => setStep(i)}>✓ {s}</button>
            ) : (
              <span aria-current={i === step ? 'step' : undefined}>{i + 1}. {s}</span>
            )}
          </li>
        ))}
      </ol>
      {step === 0 && <UnderstandStep exercise={exercise} onDone={() => setStep(1)} />}
      {step === 1 && <TextStep fields={ANALYSIS} values={notes} onChange={note} next="Al pseudocódigo" onDone={() => setStep(2)} />}
      {step === 2 && <TextStep fields={PSEUDO} values={notes} onChange={note} next="Abrir el editor" onDone={() => setStep(3)} />}
      {step === 3 && <CodeStep exercise={exercise} />}
    </main>
  );
}
