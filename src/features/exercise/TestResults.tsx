import type { TestResult } from '@/features/runner/check';

/** Cada prueba: qué se escribió, qué se esperaba y qué imprimió el programa. */
export function TestResults({ results }: { results: TestResult[] }) {
  const passed = results.filter((r) => r.passed).length;
  const all = passed === results.length;
  return (
    <div className="tests" aria-live="polite">
      <p className={all ? 'ok strong' : 'warn strong'}>
        {all ? `✓ Pasaste las ${results.length} pruebas públicas.` : `${passed} de ${results.length} pruebas pasan.`}
      </p>
      {results.map((r, i) => (
        <details key={i} className={`tests__case ${r.passed ? 'tests__case--ok' : 'tests__case--bad'}`} open={!r.passed}>
          <summary>{r.passed ? '✓' : '✗'} prueba {i + 1}</summary>
          <div className="tests__grid">
            <span className="muted small">entrada</span><pre>{r.test.stdin || '(nada)'}</pre>
            <span className="muted small">esperado</span><pre>{r.test.stdout}</pre>
            <span className="muted small">obtenido</span>
            <pre>{r.run.stdout}{r.run.error && <span className="runnable__err">{r.run.error}</span>}</pre>
          </div>
        </details>
      ))}
    </div>
  );
}
