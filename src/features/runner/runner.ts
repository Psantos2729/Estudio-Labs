import type { RunResult } from './execute';

export type { RunResult };
export const TIME_LIMIT_MS = 5000;

interface Loaded {
  w: Worker;
  ready: Promise<string | undefined>; // undefined = listo; texto = error de carga
}

let current: Loaded | null = null;
let queue: Promise<unknown> = Promise.resolve();

function load(): Loaded {
  if (current) return current;
  const w = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
  const ready = new Promise<string | undefined>((resolve) => {
    w.onmessage = (e: MessageEvent<{ ready: boolean; error?: string }>) => resolve(e.data.ready ? undefined : e.data.error);
    w.onerror = () => resolve('No se pudo iniciar Python en este navegador.');
  });
  current = { w, ready };
  ready.then((err) => err && current?.w === w && (current = null)); // reintentar la próxima vez
  return current;
}

/** Empieza a descargar Python (~10 MB) antes de que el estudiante presione "Correr". */
export function warmUp(): void {
  load();
}

/**
 * Corre Python en el worker, una ejecución a la vez. El límite cuenta desde que Python ya cargó;
 * si se pasa (bucle infinito), mata el worker y el siguiente se crea al volver a correr.
 */
export function runPython(code: string, stdin = '', limitMs = TIME_LIMIT_MS): Promise<RunResult> {
  const run = queue.then(async (): Promise<RunResult> => {
    const { w, ready } = load();
    const loadError = await ready;
    if (loadError) return { stdout: '', error: loadError };
    return new Promise<RunResult>((resolve) => {
      const timer = setTimeout(() => {
        w.terminate();
        if (current?.w === w) current = null;
        resolve({ stdout: '', timedOut: true, error: `Tu programa tardó más de ${limitMs / 1000} s. ¿Hay un ciclo que nunca termina?` });
      }, limitMs);
      w.onmessage = (e: MessageEvent<RunResult>) => {
        clearTimeout(timer);
        resolve(e.data);
      };
      w.postMessage({ code, stdin });
    });
  });
  queue = run.catch(() => undefined);
  return run;
}
