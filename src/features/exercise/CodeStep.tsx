import { useState } from 'react';
import { marked } from 'marked';
import type { ExerciseDef } from '@/content/types';
import { Button } from '@/ui/primitives/Button';
import type { RunResult } from '@/features/runner/runner';
import { preview, runCode } from '@/features/pseudo/run';
import { PythonPreview } from '@/features/pseudo/PythonPreview';
import { runTests, type TestResult } from '@/features/runner/check';
import { CodeEditor } from './CodeEditor';
import { TestResults } from './TestResults';
import { GivenFiles, OutFiles } from './FilesPanel';
import { PixelSprite } from '@/ui/primitives/PixelSprite';
import { islandOf } from '@/features/game/islands';

/** Pasos 4 y 5: escribir el código, correrlo con entrada propia y pasar las pruebas públicas. */
interface Props {
  exercise: ExerciseDef;
  initialCode: string;
  onTested: (code: string, results: TestResult[]) => void;
}

export function CodeStep({ exercise, initialCode, onTested }: Props) {
  const [code, setCode] = useState(initialCode);
  const [stdin, setStdin] = useState(exercise.tests[0]?.stdin ?? '');
  const [files, setFiles] = useState(exercise.tests[0]?.files ?? {});
  const usesFiles = exercise.tests.some((t) => t.files);
  const [busy, setBusy] = useState(false);
  const [run, setRun] = useState<RunResult | null>(null);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [hintsShown, setHintsShown] = useState(0);
  const buddy = islandOf(Number(exercise.id.slice(1, 3))).companion;

  const busyWhile = async (work: () => Promise<void>) => {
    setBusy(true);
    await work();
    setBusy(false);
  };

  return (
    <section className="panel split">
      <div className="split__read">
        {/* El enunciado viene de content/ en este repo, no del usuario. */}
        <div className="prose" dangerouslySetInnerHTML={{ __html: marked.parse(exercise.statement, { async: false }) }} />
        <div className="hints">
          {exercise.hints.slice(0, hintsShown).map((h, i) => (
            <p key={i} className="hints__item enter">
              <PixelSprite name={buddy.sprite} size={28} title={buddy.name} />
              <span><span className="warn">{buddy.name} · pista {i + 1}:</span> {h}</span>
            </p>
          ))}
          {hintsShown < exercise.hints.length && (
            <Button variant="ghost" onClick={() => setHintsShown(hintsShown + 1)}>
              ver pista {hintsShown + 1} de {exercise.hints.length}
            </Button>
          )}
        </div>
      </div>
      <div className="split__code">
        <CodeEditor initial={initialCode} onChange={setCode} pseudo={exercise.language === 'pseudo'} />
        <label className="field">
          <span className="muted small">entrada para Correr (una línea por cada {exercise.language === 'pseudo' ? 'read' : 'input()'})</span>
          <textarea className="input field__text" rows={2} value={stdin} onChange={(e) => setStdin(e.target.value)} />
        </label>
        {usesFiles && <GivenFiles files={files} onChange={setFiles} />}
        <div className="runnable__bar">
          <Button variant="ghost" disabled={busy} onClick={() => busyWhile(async () => setRun(await runCode(code, exercise.language, stdin, { files })))}>▶ Correr</Button>
          <Button disabled={busy} onClick={() => busyWhile(async () => {
                // Pseudocódigo que no cierra: un solo aviso con su línea, en vez del mismo error en cada prueba.
                const broken = exercise.language === 'pseudo' ? preview(code).error : undefined;
                if (broken) return (setResults(null), setRun({ stdout: '', error: broken }));
                const r = await runTests(code, exercise.tests, exercise.language);
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
        {run && <OutFiles files={run.files} given={files} />}
        {exercise.language === 'pseudo' && <PythonPreview code={code} />}
        {results && <TestResults results={results} />}
      </div>
    </section>
  );
}
