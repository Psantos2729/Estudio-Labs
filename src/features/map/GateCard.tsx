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
          <li>· si repruebas: 24 h de espera y refuerzo</li>
        </ul>
        <p className="muted small">Disponible en la fase 3 del proyecto.</p>
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
