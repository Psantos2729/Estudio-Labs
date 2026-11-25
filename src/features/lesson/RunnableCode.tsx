import { useState } from 'react';
import { Button } from '@/ui/primitives/Button';
import { runPython, type RunResult } from '@/features/runner/runner';
import { OutFiles } from '@/features/exercise/FilesPanel';

/** Ejemplo editable de una lección: el estudiante lo cambia y lo corre para comprobar su predicción. */
export function RunnableCode({ initial }: { initial: string }) {
  const [code, setCode] = useState(initial);
  const [result, setResult] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);

  async function run() {
    setRunning(true);
    setResult(await runPython(code));
    setRunning(false);
  }

  return (
    <div className="runnable">
      <textarea
        className="runnable__code"
        aria-label="Código de ejemplo (puedes editarlo)"
        value={code}
        spellCheck={false}
        rows={code.split('\n').length}
        onChange={(e) => setCode(e.target.value)}
      />
      <div className="runnable__bar">
        <Button onClick={run} disabled={running}>{running ? 'corriendo…' : '▶ Correr'}</Button>
        {code !== initial && <Button variant="ghost" onClick={() => setCode(initial)}>restaurar</Button>}
      </div>
      {result && (
        <pre className="runnable__out" aria-live="polite">
          {result.stdout}
          {result.error && <span className="runnable__err">{result.error}</span>}
          {!result.stdout && !result.error && <span className="muted">(no imprimió nada)</span>}
        </pre>
      )}
      {result && <OutFiles files={result.files} />}
    </div>
  );
}
