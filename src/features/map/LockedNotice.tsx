import { Link } from 'react-router-dom';
import { displayId } from '@/content/types';
import { useAttempts } from '@/features/history/useHistory';
import { Panel } from '@/ui/primitives/Panel';
import { examToUnlock, examWaitUntil } from './lockGate';
import { useModuleViews } from './useMastery';

const hour = (ms: number) => new Date(ms).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });

/** Aviso al entrar a un módulo bloqueado: qué examen lo abre y un botón para presentarlo ya. */
export function LockedNotice({ moduleId }: { moduleId: string }) {
  const { views, isGuest } = useModuleViews();
  const { attempts } = useAttempts();
  const target = examToUnlock(views, moduleId);
  if (!target) return null;
  const t = displayId(target.module.id);
  const prev = views[views.findIndex((v) => v.module.id === moduleId) - 1];
  const waitUntil = examWaitUntil(attempts, target.module.id);

  return (
    <Panel as="div" tone="warn" role="status">
      <p className="warn strong">{displayId(moduleId)} está bloqueado</p>
      {prev.module.id === target.module.id ? (
        <p className="small">Para entrar, aprueba el examen de dominio de {t} ({target.module.title}).</p>
      ) : (
        <p className="small">
          {displayId(prev.module.id)} también está bloqueado. Empieza por el examen de {t} ({target.module.title}),
          que es el siguiente que puedes presentar.
        </p>
      )}
      {isGuest ? (
        <p className="muted small"><Link to="/login">Entra</Link> para presentar el examen.</p>
      ) : waitUntil ? (
        <p className="muted small">Reprobaste el examen de {t} hace poco: podrás volver a presentarlo a las {hour(waitUntil)}.</p>
      ) : (
        <Link className="btn btn--primary" to={`/examen/${target.module.id}`}>
          Presentar el examen de {t} →
        </Link>
      )}
    </Panel>
  );
}
