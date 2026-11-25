import { useState } from 'react';
import { marked } from 'marked';
import { Button } from '@/ui/primitives/Button';
import { runPython, type RunResult } from '@/features/runner/runner';
import { CodeEditor } from '@/features/exercise/CodeEditor';
import type { ExamProblem } from './types';

/** Un problema del examen: enunciado, editor y "Correr" con entrada propia. Sin pistas ni pruebas. */
export function ExamProblemCard({ problem, n, initial, onChange }: {
  problem: ExamProblem; n: number; initial: string; onChange: (code: string) => void;
}) {
  const [code, setCode] = useState(initial);
  const [first] = useState(initial); // el editor solo toma el texto inicial una vez
  const [stdin, setStdin] = useState('');
  const [run, setRun] = useState<RunResult | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <section className="panel">
      <h2 className="display">Problema {n}: {problem.title}</h2>
      {/* El enunciado lo escribimos nosotros en el banco del examen, no viene de otro usuario. */}
      <div className="prose" dangerouslySetInnerHTML={{ __html: marked.parse(problem.statement, { async: false }) }} />
      <CodeEditor initial={first} onChange={(c) => { setCode(c); onChange(c); }} />
      <label className="field">
        <span className="muted small">entrada para probar tú mismo (una línea por cada input())</span>
        <textarea className="input field__text" rows={2} value={stdin} onChange={(e) => setStdin(e.target.value)} />
      </label>
      <div className="runnable__bar">
        <Button variant="ghost" disabled={busy} onClick={async () => {
          setBusy(true);
          setRun(await runPython(code, stdin));
          setBusy(false);
        }}>▶ Correr</Button>
        <span className="muted small">Al entregar, tu código corre con {problem.cases.length} entradas ocultas.</span>
      </div>
      {run && (
        <pre className="runnable__out" aria-live="polite">
          {run.stdout}
          {run.error && <span className="runnable__err">{run.error}</span>}
          {!run.stdout && !run.error && <span className="muted">(no imprimió nada)</span>}
        </pre>
      )}
    </section>
  );
}
