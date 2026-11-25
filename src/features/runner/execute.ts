import type { PyodideAPI } from 'pyodide';

/** Archivo de la carpeta de trabajo al terminar; los binarios se muestran como bytes en hexadecimal. */
export interface OutFile { name: string; text: string; binary?: boolean }

export interface RunResult {
  stdout: string;
  files?: OutFile[]; // solo si la carpeta de trabajo quedó con archivos
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

let runs = 0;

/**
 * Corre `code` en un espacio de nombres nuevo; `stdin` alimenta input(), una línea por llamada.
 * Con `quietPrompts`, los mensajes de input("...") no salen en stdout (así se califican las pruebas).
 * Cada corrida usa una carpeta vacía con los archivos dados (`files`): nada queda de la anterior.
 */
export async function execute(
  py: PyodideAPI, code: string, stdin: string, quietPrompts = false, files: Record<string, string> = {},
): Promise<RunResult> {
  let stdout = '';
  const lines = stdin.split('\n');
  if (lines.at(-1) === '') lines.pop();
  py.setStdout({ write: (buf) => ((stdout += new TextDecoder().decode(buf)), buf.length) });
  py.setStdin({ stdin: () => lines.shift() }); // undefined = fin de entrada → EOFError
  const globals = py.globals.get('dict')();
  if (quietPrompts) globals.set('input', py.runPython(QUIET_INPUT, { globals }));
  // Sin esto se pierde lo último impreso sin salto de línea (print(x, end=' ') al final).
  const flush = () => py.runPython('import sys\nsys.stdout.flush()');
  const dir = `/trabajo/${++runs}`;
  py.FS.mkdirTree(dir);
  py.FS.chdir(dir);
  for (const [name, text] of Object.entries(files)) py.FS.writeFile(name, text);
  // pandas y numpy (M12) se descargan la primera vez que el código los importa; luego quedan cargados.
  await py.loadPackagesFromImports(code, { messageCallback: () => {} }).catch(() => undefined); // error de sintaxis: lo reporta la corrida
  const done = (r: RunResult): RunResult => {
    const out = collect(py, dir);
    return out.length ? { ...r, files: out } : r;
  };
  try {
    await py.runPythonAsync(code, { globals, filename: 'programa.py' });
    flush();
    return done({ stdout });
  } catch (e) {
    flush();
    return done({ stdout, error: cleanTraceback(String((e as Error).message ?? e)) });
  } finally {
    globals.destroy();
  }
}

/** Lee y borra los archivos que quedaron en `dir`. Las subcarpetas que cree el programa se ignoran. */
function collect(py: PyodideAPI, dir: string): OutFile[] {
  const files: OutFile[] = [];
  for (const name of (py.FS.readdir(dir) as string[]).sort()) {
    const path = `${dir}/${name}`;
    if (name === '.' || name === '..' || !py.FS.isFile(py.FS.stat(path).mode)) continue;
    const bytes = py.FS.readFile(path) as Uint8Array;
    py.FS.unlink(path);
    let text: string | null = null;
    try { text = new TextDecoder('utf-8', { fatal: true }).decode(bytes); } catch { /* no es UTF-8 */ }
    // Un registro con enteros pequeños puede ser UTF-8 válido: si trae caracteres de control, es binario.
    const control = bytes.some((b) => b < 32 && b !== 9 && b !== 10 && b !== 13);
    if (text === null || control) files.push({ name, text: hex(bytes), binary: true });
    else files.push({ name, text });
  }
  py.FS.chdir('/');
  try { py.FS.rmdir(dir); } catch { /* quedó una subcarpeta: no importa */ }
  return files;
}

/** `00 1a ff …`, 16 bytes por línea, para ver un archivo binario. */
function hex(bytes: Uint8Array): string {
  const rows: string[] = [];
  for (let i = 0; i < bytes.length; i += 16) {
    rows.push([...bytes.slice(i, i + 16)].map((b) => b.toString(16).padStart(2, '0')).join(' '));
  }
  return rows.join('\n');
}

/** Quita los marcos internos de Pyodide: deja el encabezado y lo que pasa en programa.py. */
export function cleanTraceback(tb: string): string {
  const lines = tb.trimEnd().split('\n');
  const start = lines.findIndex((l) => l.includes('"programa.py"'));
  return start < 0 ? lines.at(-1) ?? tb : ['Traceback (most recent call last):', ...lines.slice(start)].join('\n');
}
