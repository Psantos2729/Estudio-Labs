import type { PyodideAPI } from 'pyodide';

export interface RunResult {
  stdout: string;
  error?: string; // traceback de Python, solo con las líneas del código del estudiante
  timedOut?: boolean;
}

/** Corre `code` en un espacio de nombres nuevo; `stdin` alimenta input(), una línea por llamada. */
export async function execute(py: PyodideAPI, code: string, stdin: string): Promise<RunResult> {
  let stdout = '';
  const lines = stdin.split('\n');
  if (lines.at(-1) === '') lines.pop();
  py.setStdout({ write: (buf) => ((stdout += new TextDecoder().decode(buf)), buf.length) });
  py.setStdin({ stdin: () => lines.shift() }); // undefined = fin de entrada → EOFError
  const globals = py.globals.get('dict')();
  try {
    await py.runPythonAsync(code, { globals, filename: 'programa.py' });
    return { stdout };
  } catch (e) {
    return { stdout, error: cleanTraceback(String((e as Error).message ?? e)) };
  } finally {
    globals.destroy();
  }
}

/** Quita los marcos internos de Pyodide: deja el encabezado y lo que pasa en programa.py. */
export function cleanTraceback(tb: string): string {
  const lines = tb.trimEnd().split('\n');
  const start = lines.findIndex((l) => l.includes('"programa.py"'));
  return start < 0 ? lines.at(-1) ?? tb : ['Traceback (most recent call last):', ...lines.slice(start)].join('\n');
}
