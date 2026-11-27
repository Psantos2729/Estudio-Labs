import { pathReach, type StepState } from './questPath';

const STEPS = [
  { name: 'Lección', detail: 'conceptos y preguntas de predicción' },
  { name: 'Práctica guiada', detail: 'ejercicios con pistas' },
  { name: 'Tareas reales', detail: 'tus tareas de Computación y Programación' },
  { name: 'Labs C5', detail: 'ejercicios del PDF de laboratorios' },
  { name: 'Examen de dominio', detail: 'casos ocultos, sin pistas' },
];

const MARK: Record<StepState, string> = { done: '✓', now: '', todo: '', self: '', locked: '×' };
const NOTE: Record<StepState, string> = { done: 'hecho', now: 'aquí vas', todo: 'pendiente', self: 'por tu cuenta', locked: 'bloqueado' };

/** Camino de dominio: nodos unidos por una línea que se ilumina hasta el paso actual. Solo informa, no se presiona. */
export function MasteryPath({ states }: { states: StepState[] }) {
  const reach = pathReach(states);
  return (
    <section className="panel trail" aria-label="Camino de dominio">
      <p className="small">camino de dominio</p>
      <ol className="trail__steps" style={{ '--reach': reach / (STEPS.length - 1) } as React.CSSProperties}>
        {STEPS.map((s, i) => (
          <li key={s.name} className={`trail__step trail__step--${states[i]}`} aria-current={states[i] === 'now' ? 'step' : undefined}>
            <span className="trail__node" aria-hidden="true">{MARK[states[i]] || i + 1}</span>
            <span className="trail__text">
              <span className="trail__name">{s.name}</span>
              <span className="trail__note">{NOTE[states[i]]}</span>
              <span className="muted small">{s.detail}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
