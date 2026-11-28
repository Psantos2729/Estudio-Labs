import { explainError } from './explain';

/** Debajo del traceback: el error en español. `withHint={false}` en el examen, donde no hay pistas. */
export function ErrorExplain({ error, withHint = true }: { error?: string; withHint?: boolean }) {
  const help = error ? explainError(error) : null;
  if (!help) return null;
  return (
    <div className="error-explain" role="note">
      <p className="error-explain__title">
        <strong>{help.name}</strong>{help.line && <span className="muted"> · línea {help.line}</span>}
      </p>
      <p>{help.what}</p>
      {withHint && <p className="error-explain__hint">Pista: {help.hint}</p>}
    </div>
  );
}
