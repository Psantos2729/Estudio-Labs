import { useState } from 'react';
import { Button } from '@/ui/primitives/Button';
import type { RunResult } from '@/features/runner/runner';
import { runCode } from '@/features/pseudo/run';
import { PythonPreview } from '@/features/pseudo/PythonPreview';
import { OutFiles } from '@/features/exercise/FilesPanel';

/** Ejemplo editable de una lección (Python o pseudocódigo): el estudiante lo cambia y lo corre para comprobar su predicción. */
export function RunnableCode({ initial: block, pseudo = false }: { initial: string; pseudo?: boolean }) {
  // Un bloque puede empezar con `// entrada: 4 5`: es la entrada de ejemplo para sus read.
  const [, sample = '', initial = block] = block.match(/^\/\/ entrada: (.*)\n([\s\S]*)$/) ?? [];
  const [code, setCode] = useState(initial);
  const [result, setResult] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);
  const [stdin, setStdin] = useState(sample); // un valor por cada read, separados por espacios

  async function run() {
    setRunning(true);
    setResult(await runCode(code, pseudo ? 'pseudo' : 'python', stdin.trim().split(/\s+/).join('\n') + '\n'));
    setRunning(false);
  }

  return (
    <div className="runnable">
      <textarea
        className="runnable__code"
        aria-label={pseudo ? 'Pseudocódigo de ejemplo (puedes editarlo)' : 'Código de ejemplo (puedes editarlo)'}
        value={code}
        spellCheck={false}
        rows={code.split('\n').length}
        onChange={(e) => setCode(e.target.value)}
      />
      {pseudo && (
        <input className="input runnable__stdin" aria-label="Entrada para read, separada por espacios" placeholder="entrada para read (separada por espacios)" value={stdin} onChange={(e) => setStdin(e.target.value)} />
      )}
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
      {pseudo && <PythonPreview code={code} />}
    </div>
  );
}
