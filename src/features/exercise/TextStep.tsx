import { useState } from 'react';
import { Button } from '@/ui/primitives/Button';
import { onTabKey } from '@/ui/tabKey';
import { preview } from '@/features/pseudo/run';

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
          <textarea className="input field__text" rows={f.key === 'pseudo' ? 8 : 3} value={values[f.key] ?? ''} onChange={(e) => onChange(f.key, e.target.value)}
            onKeyDown={f.key === 'pseudo' ? (e) => onTabKey(e, (v) => onChange(f.key, v)) : undefined} spellCheck={f.key !== 'pseudo'} />
          {f.key === 'pseudo' && <PseudoCheck code={values[f.key] ?? ''} />}
        </label>
      ))}
      <Button onClick={onDone} disabled={!complete}>{next} →</Button>
      {!complete && <p className="muted small">Escribe al menos {MIN_CHARS} caracteres en cada campo para seguir.</p>}
    </section>
  );
}

/** Revisa estructura y sangría del pseudocódigo con el mismo traductor de los ejercicios. */
function PseudoCheck({ code }: { code: string }) {
  const [shown, setShown] = useState<string | null>(null);
  const check = () => setShown(preview(code).error ?? '✓ La estructura y la sangría están bien.');
  return (
    <span className="small">
      <Button variant="ghost" onClick={check}>revisar pseudocódigo</Button>{' '}
      {shown && <span className={shown.startsWith('✓') ? 'ok' : 'warn'} aria-live="polite">{shown}</span>}
    </span>
  );
}
