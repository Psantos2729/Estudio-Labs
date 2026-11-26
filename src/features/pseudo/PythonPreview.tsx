import { preview } from './run';
import './pseudo.css';

/** "Ver en Python": el mismo programa traducido, línea por línea, para comparar ambos lenguajes. */
export function PythonPreview({ code }: { code: string }) {
  const { python, error } = preview(code);
  return (
    <details className="pyview">
      <summary className="small">ver en Python</summary>
      {error ? <p className="runnable__err small">{error}</p> : <pre className="runnable__out">{python}</pre>}
      <p className="muted small">La línea N de tu pseudocódigo es la línea N de este Python. <code>Begin</code> se vuelve <code>def _main():</code> y cada <code>end</code> un <code>pass</code>.</p>
    </details>
  );
}
