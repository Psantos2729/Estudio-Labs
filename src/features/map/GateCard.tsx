import { Link } from 'react-router-dom';
import { displayId } from '@/content/types';
import { Panel } from '@/ui/primitives/Panel';
import type { ModuleView } from './masteryView';

export function GateCard({ view, isGuest }: { view: ModuleView; isGuest: boolean }) {
  const m = view.module;
  return (
    <aside className="gate">
      <Panel as="div" tone="warn">
        <p className="warn strong">examen de dominio {displayId(m.id)}</p>
        <p className="muted small">Para desbloquear el siguiente módulo necesitas:</p>
        <ul className="plain small">
          <li>· {m.passScore}% o más en casos ocultos</li>
          <li>· aprobar las preguntas de razonamiento</li>
          <li>· sin pistas y con tiempo límite</li>
          <li>· si repruebas: 1 hora de espera y otras preguntas</li>
        </ul>
        {view.status === 'mastered' ? (
          <p className="ok small">✓ dominado{view.score !== null ? ` con ${view.score}%` : ''}</p>
        ) : isGuest ? (
          <p className="muted small"><Link to="/login">Entra</Link> para presentar el examen.</p>
        ) : view.open ? (
          <Link className="btn btn--primary" to={`/examen/${m.id}`}>Presentar examen →</Link>
        ) : (
          <p className="muted small">Se abre al dominar el módulo anterior.</p>
        )}
      </Panel>
      <Panel as="div">
        <p className="strong">repasos</p>
        <p className="muted small">
          Cada módulo dominado vuelve a los {m.reviewDays.join(', ')} días. Si fallas un repaso, el
          módulo se reabre.
        </p>
      </Panel>
      {isGuest && (
        <Panel as="div">
          <p className="strong">modo invitado</p>
          <p className="muted small">Solo M0 está abierto. Entra para guardar tu progreso.</p>
        </Panel>
      )}
    </aside>
  );
}
