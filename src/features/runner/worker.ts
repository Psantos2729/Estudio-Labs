/// <reference lib="webworker" />
import { loadPyodide, version } from 'pyodide';
import { execute } from './execute';

// Los ~10 MB de Python (wasm + biblioteca estándar) vienen del CDN de la misma versión (ADR-002).
const ready = loadPyodide({ indexURL: `https://cdn.jsdelivr.net/pyodide/v${version}/full/` });
ready.then(
  () => self.postMessage({ ready: true }),
  (err) => self.postMessage({ ready: false, error: `No se pudo cargar Python: ${String(err)}` }),
);

self.onmessage = async (e: MessageEvent<{ code: string; stdin: string; quietPrompts: boolean; files: Record<string, string>; preload?: boolean }>) => {
  const py = await ready;
  if (e.data.preload) {
    // Descarga paquetes (pandas) antes de que corra el límite de tiempo; si falla, el import lo dirá.
    const pkgs = await py.loadPackagesFromImports(e.data.code, { messageCallback: () => {} }).catch(() => []);
    // El primer `import pandas` tarda unos segundos: se hace aquí para que no cuente en el límite.
    for (const { name } of pkgs) if (name === 'numpy' || name === 'pandas') py.runPython(`import ${name}`);
    self.postMessage({ preloaded: true });
    return;
  }
  self.postMessage(await execute(py, e.data.code, e.data.stdin, e.data.quietPrompts, e.data.files));
};
