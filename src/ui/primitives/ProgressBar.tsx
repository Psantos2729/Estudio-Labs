/** Barra de avance con brillo. `value` y `max` en las mismas unidades (pasos, lecciones…). */
export function ProgressBar({ value, max, label }: { value: number; max: number; label: string }) {
  return (
    <div className="progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
      <span style={{ width: `${(100 * value) / max}%` }} />
    </div>
  );
}
