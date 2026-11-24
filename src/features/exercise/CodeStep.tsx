import { useState } from 'react';
import type { ExerciseDef } from '@/content/types';
import { Button } from '@/ui/primitives/Button';
import { runPython, type RunResult } from '@/features/runner/runner';
import { runTests, type TestResult } from '@/features/runner/check';
import { CodeEditor } from './CodeEditor';
import { TestResults } from './TestResults';

/** Pasos 4 y 5: escribir el código, correrlo con entrada propia y pasar las pruebas públicas. */
interface Props {
  exercise: ExerciseDef;
  initialCode: string;
  onTested: (code: string, results: TestResult[]) => void;
}

export function CodeStep({ exercise, initialCode, onTested }: Props) {
  const [code, setCode] = useState(initialCode);
  const [stdin, setStdin] = useState(exercise.tests[0]?.stdin ?? '');
  const [busy, setBusy] = useState(false);
  const [run, setRun] = useState<RunResult | null>(null);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [hintsShown, setHintsShown] = useState(0);

  const busyWhile = async (work: () => Promise<void>) => {
    setBusy(true);
    await work();
    setBusy(false);
  };

  return (
    <section className="panel">
      <CodeEditor initial={initialCode} onChange={setCode} />
      <label className="field">
        <span className="muted small">entrada para Correr (una línea por cada input())</span>
        <textarea className="input field__text" rows={2} value={stdin} onChange={(e) => setStdin(e.target.value)} />
      </label>
      <div className="runnable__bar">
        <Button variant="ghost" disabled={busy} onClick={() => busyWhile(async () => setRun(await runPython(code, stdin)))}>▶ Correr</Button>
        <Button disabled={busy} onClick={() => busyWhile(async () => {
              const r = await runTests(code, exercise.tests);
              setResults(r);
              onTested(code, r);
            })}>Probar ({exercise.tests.length} pruebas)</Button>
        {busy && <span className="muted small">corriendo…</span>}
      </div>
      {run && (
        <pre className="runnable__out" aria-live="polite">
          {run.stdout}
          {run.error && <span className="runnable__err">{run.error}</span>}
          {!run.stdout && !run.error && <span className="muted">(no imprimió nada)</span>}
        </pre>
      )}
      {results && <TestResults results={results} />}
      <div className="hints">
        {exercise.hints.slice(0, hintsShown).map((h, i) => (
          <p key={i} className="hints__item"><span className="warn">pista {i + 1}:</span> {h}</p>
        ))}
        {hintsShown < exercise.hints.length && (
          <Button variant="ghost" onClick={() => setHintsShown(hintsShown + 1)}>
            ver pista {hintsShown + 1} de {exercise.hints.length}
          </Button>
        )}
      </div>
    </section>
  );
}
