import { displayId } from '@/content/types';
import type { ModuleView } from './masteryView';

interface Props {
  views: ModuleView[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ModuleList({ views, selectedId, onSelect }: Props) {
  const mastered = views.filter((v) => v.status === 'mastered').length;
  return (
    <nav className="panel route" aria-label="Ruta de módulos">
      <p className="muted small">
        $ ls ruta/ <span className="ok">{views.length} módulos · {mastered} dominados</span>
      </p>
      <ol className="route__list">
        {views.map((v) => (
          <li key={v.module.id}>
            <button
              type="button"
              className={`route__item route__item--${v.status}${v.review === 'due' ? ' route__item--due' : ''}`}
              aria-current={v.module.id === selectedId ? 'true' : undefined}
              onClick={() => onSelect(v.module.id)}
            >
              <span className="route__icon" aria-hidden="true">{v.icon}</span>
              <span className="route__id">{displayId(v.module.id)}</span>
              <span className="route__name">{v.module.title}</span>
              <span className="route__score">{v.score !== null && v.review !== 'due' ? `${v.score}%` : v.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
