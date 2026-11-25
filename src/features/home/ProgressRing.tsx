/** Anillo de avance con su órbita de marcas. `value` de 0 a 100. */
export function ProgressRing({ value, label, sub }: { value: number; label: string; sub: string }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  return (
    <div className="ring" role="img" aria-label={`${label}: ${value}% ${sub}`}>
      <svg viewBox="0 0 180 180" aria-hidden="true">
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5b8cff" /><stop offset="1" stopColor="#b48cff" /></linearGradient>
        </defs>
        <circle className="ring__ticks" cx="90" cy="90" r="84" />
        <circle className="ring__track" cx="90" cy="90" r={r} />
        <circle className="ring__fill" cx="90" cy="90" r={r} strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
      </svg>
      <div className="ring__center">
        <span className="ring__label">{label}</span>
        <span className="ring__value">{value}%</span>
        <span className="muted small">{sub}</span>
      </div>
    </div>
  );
}
