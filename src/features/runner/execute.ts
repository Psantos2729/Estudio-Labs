import type { PyodideAPI } from 'pyodide';

export interface RunResult {
  stdout: string;
  error?: string; // traceback de Python, solo con las líneas del código del estudiante
  timedOut?: boolean;
}

// input() sin mostrar el mensaje: al calificar no importa si el estudiante escribió "Nombre: " o nada.
const QUIET_INPUT = `
def input(prompt=''):
    import sys
    line = sys.stdin.readline()
    if not line:
        raise EOFError('EOF when reading a line')
    return line.rstrip('\\n')
input`;

/**
 * Corre `code` en un espacio de nombres nuevo; `stdin` alimenta input(), una línea por llamada.
 * Con `quietPrompts`, los mensajes de input("...") no salen en stdout (así se califican las pruebas).
 */
export async function execute(py: PyodideAPI, code: string, stdin: string, quietPrompts = false): Promise<RunResult> {
  let stdout = '';
  const lines = stdin.split('\n');
  if (lines.at(-1) === '') lines.pop();
  py.setStdout({ write: (buf) => ((stdout += new TextDecoder().decode(buf)), buf.length) });
  py.setStdin({ stdin: () => lines.shift() }); // undefined = fin de entrada → EOFError
  const globals = py.globals.get('dict')();
  if (quietPrompts) globals.set('input', py.runPython(QUIET_INPUT, { globals }));
  // Sin esto se pierde lo último impreso sin salto de línea (print(x, end=' ') al final).
  const flush = () => py.runPython('import sys\nsys.stdout.flush()');
  try {
    await py.runPythonAsync(code, { globals, filename: 'programa.py' });
    flush();
    return { stdout };
  } catch (e) {
    flush();
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
