import { useState } from 'react';
import { marked } from 'marked';
import { Button } from '@/ui/primitives/Button';
import { runPython, type RunResult } from '@/features/runner/runner';
import { CodeEditor } from '@/features/exercise/CodeEditor';
import { GivenFiles, OutFiles } from '@/features/exercise/FilesPanel';
import type { ExamProblem } from './types';
import { ErrorExplain } from '@/features/runner/ErrorExplain';

/** Un problema del examen: enunciado, editor y "Correr" con entrada propia. Sin pistas ni pruebas. */
export function ExamProblemCard({ problem, n, initial, onChange, note }: {
  problem: Pick<ExamProblem, 'title' | 'statement'> & { cases?: ExamProblem['cases'] }; n: number; initial: string; onChange?: (code: string) => void; note: string;
}) {
  const [code, setCode] = useState(initial);
  const [first] = useState(initial); // el editor solo toma el texto inicial una vez
  const [stdin, setStdin] = useState('');
  const [run, setRun] = useState<RunResult | null>(null);
  const [files, setFiles] = useState<Record<string, string>>({});
  const usesFiles = problem.cases?.some((c) => c.files);
  const [busy, setBusy] = useState(false);

  return (
    <section className="panel split">
      <div className="split__read">
        <h2 className="display">Problema {n}: {problem.title}</h2>
        {/* El enunciado lo escribimos nosotros en el banco del examen, no viene de otro usuario. */}
        <div className="prose" dangerouslySetInnerHTML={{ __html: marked.parse(problem.statement, { async: false }) }} />
      </div>
      <div className="split__code">
        <CodeEditor initial={first} onChange={(c) => { setCode(c); onChange?.(c); }} />
        <label className="field">
          <span className="muted small">entrada para probar tú mismo (una línea por cada input())</span>
          <textarea className="input field__text" rows={2} value={stdin} onChange={(e) => setStdin(e.target.value)} />
        </label>
        {usesFiles && <GivenFiles files={files} onChange={setFiles} />}
        <div className="runnable__bar">
          <Button variant="ghost" disabled={busy} onClick={async () => {
            setBusy(true);
            setRun(await runPython(code, stdin, { files }));
            setBusy(false);
          }}>▶ Correr</Button>
          <span className="muted small">{note}</span>
        </div>
        {run && (
          <pre className="runnable__out" aria-live="polite">
            {run.stdout}
            {run.error && <span className="runnable__err">{run.error}</span>}
            {!run.stdout && !run.error && <span className="muted">(no imprimió nada)</span>}
          </pre>
        )}
        {run && <ErrorExplain error={run.error} withHint={false} />}
        {run && <OutFiles files={run.files} given={files} />}
      </div>
    </section>
  );
}
