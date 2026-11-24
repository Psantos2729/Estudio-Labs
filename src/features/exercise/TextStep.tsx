import { Button } from '@/ui/primitives/Button';

export interface Field {
  key: string;
  label: string;
  hint: string;
}

interface Props {
  fields: Field[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  next: string;
  onDone: () => void;
}

const MIN_CHARS = 10; // shortcut: solo exige algo escrito; la revisión real del análisis llega con el examen.

/** Pasos de análisis y pseudocódigo: no se avanza hasta llenar cada campo. */
export function TextStep({ fields, values, onChange, next, onDone }: Props) {
  const complete = fields.every((f) => (values[f.key] ?? '').trim().length >= MIN_CHARS);
  return (
    <section className="panel">
      {fields.map((f) => (
        <label key={f.key} className="field">
          <span className="strong">{f.label}</span>
          <span className="muted small">{f.hint}</span>
          <textarea className="input field__text" rows={f.key === 'pseudo' ? 8 : 3} value={values[f.key] ?? ''} onChange={(e) => onChange(f.key, e.target.value)} />
        </label>
      ))}
      <Button onClick={onDone} disabled={!complete}>{next} →</Button>
      {!complete && <p className="muted small">Escribe al menos {MIN_CHARS} caracteres en cada campo para seguir.</p>}
    </section>
  );
}
