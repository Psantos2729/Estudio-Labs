import { useState } from 'react';
import { Link } from 'react-router-dom';
import { exercisesOf } from '@/content/lessons';
import type { ExerciseDef } from '@/content/types';
import type { TestResult } from '@/features/runner/check';
import { UnderstandStep } from './UnderstandStep';
import { TextStep, type Field } from './TextStep';
import { CodeStep } from './CodeStep';
import { useSavePractice, type Attempt } from './usePractice';
import { ProgressBar } from '@/ui/primitives/ProgressBar';

const STEPS = ['entender', 'analizar', 'pseudocódigo', 'código y pruebas'];
// En un ejercicio de pseudocódigo, el pseudocódigo ES el código: se escribe y se prueba en el editor.
const PSEUDO_STEPS = ['entender', 'analizar', 'pseudocódigo y pruebas'];

const ANALYSIS: Field[] = [
  { key: 'input', label: 'Entrada', hint: '¿Qué datos recibe el programa y de qué tipo son?' },
  { key: 'output', label: 'Salida', hint: '¿Qué debe mostrar, exactamente?' },
  { key: 'process', label: 'Proceso', hint: '¿Qué cálculos o decisiones hay entre la entrada y la salida?' },
  { key: 'edge', label: 'Casos especiales', hint: '¿Qué entradas raras podrían romperlo? (cero, negativos, texto vacío…)' },
];
const PSEUDO: Field[] = [{ key: 'pseudo', label: 'Pseudocódigo', hint: 'Como en los labs, en inglés: Begin, read n, if … end if, for i ← 0 to n-1 … end for, write …, End. Las reglas están en la guía de pseudocódigo.' }];

interface Props {
  exercise: ExerciseDef;
  saved: Attempt | null; // si ya lo intentó, retoma en el editor con su código y su análisis
  canSave: boolean;
}

/** Los pasos del ejercicio (diseño D1). Al probar, guarda el intento si hay sesión. */
export function ExerciseFlow({ exercise, saved, canSave }: Props) {
  const steps = exercise.language === 'pseudo' ? PSEUDO_STEPS : STEPS;
  const codeStep = steps.length - 1;
  const [step, setStep] = useState(saved ? codeStep : 0);
  const [notes, setNotes] = useState<Record<string, string>>(saved?.notes ?? {});
  const note = (k: string, v: string) => setNotes({ ...notes, [k]: v });
  const save = useSavePractice(exercise.id);
  const [passed, setPassed] = useState(false);
  const siblings = exercisesOf(exercise.id.slice(0, 3));
  const after = siblings.slice(siblings.findIndex((e) => e.id === exercise.id) + 1);
  // Desde un ejercicio normal, Continuar salta los retos; el reto que sigue se ofrece aparte.
  const next = exercise.challenge ? after[0] : after.find((e) => !e.challenge);
  const reto = !exercise.challenge && after[0]?.challenge ? after[0] : undefined;

  const onTested = (code: string, results: TestResult[]) => {
    setPassed(results.every((r) => r.passed));
    if (!canSave) return;
    save.mutate({ code, notes, tests_passed: results.filter((r) => r.passed).length, tests_total: results.length });
  };

  return (
    <>
      <ProgressBar value={passed ? steps.length : step} max={steps.length} label="Pasos completados del ejercicio" />
      <ol className="stepper" aria-label="Pasos del ejercicio">
        {steps.map((s, i) => (
          <li key={s} className={i === step ? 'stepper__now' : i < step ? 'stepper__done' : ''}>
            {i < step ? (
              <button type="button" className="stepper__back" onClick={() => setStep(i)}>✓ {s}</button>
            ) : (
              <span aria-current={i === step ? 'step' : undefined}>{i + 1}. {s}</span>
            )}
          </li>
        ))}
      </ol>
      <div className="step-panel" key={step}>
        {step === 0 && <UnderstandStep exercise={exercise} onDone={() => setStep(1)} />}
        {step === 1 && <TextStep fields={ANALYSIS} values={notes} onChange={note} next={codeStep === 2 ? 'Abrir el editor' : 'Al pseudocódigo'} onDone={() => setStep(2)} />}
        {step === 2 && step !== codeStep && <TextStep fields={PSEUDO} values={notes} onChange={note} next="Abrir el editor" onDone={() => setStep(3)} />}
        {step === codeStep && <CodeStep exercise={exercise} initialCode={saved?.code ?? exercise.starter} onTested={onTested} />}
      </div>
      {passed && (
        <Link className="btn btn--primary enter" to={next ? `/ejercicio/${next.id}` : '/'}>
          {next ? `Continuar: ${next.title} →` : 'Terminé los ejercicios →'}
        </Link>
      )}
      {passed && reto && <Link className="btn btn--ghost" to={`/ejercicio/${reto.id}`}>o intenta el reto: {reto.title}</Link>}
      <p className="muted small" aria-live="polite">
        {!canSave && 'Modo invitado: tu trabajo no se guarda. Entra para guardarlo.'}
        {save.isPending && 'guardando…'}
        {save.isSuccess && '✓ intento guardado'}
        {save.isError && <span className="warn">No se pudo guardar el intento. Tu código sigue aquí; vuelve a probar.</span>}
      </p>
    </>
  );
}
