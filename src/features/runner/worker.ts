/// <reference lib="webworker" />
import { loadPyodide, version } from 'pyodide';
import { execute } from './execute';

// Los ~10 MB de Python (wasm + biblioteca estándar) vienen del CDN de la misma versión (ADR-002).
const ready = loadPyodide({ indexURL: `https://cdn.jsdelivr.net/pyodide/v${version}/full/` });
ready.then(
  () => self.postMessage({ ready: true }),
  (err) => self.postMessage({ ready: false, error: `No se pudo cargar Python: ${String(err)}` }),
);

self.onmessage = async (e: MessageEvent<{ code: string; stdin: string; quietPrompts: boolean; files: Record<string, string> }>) => {
  self.postMessage(await execute(await ready, e.data.code, e.data.stdin, e.data.quietPrompts, e.data.files));
};
