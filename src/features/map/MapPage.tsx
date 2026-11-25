import { useMapStore } from './mapStore';
import { currentModule } from './masteryView';
import { useModuleViews } from './useMastery';
import { useLeaderboard } from '@/features/game/useGame';
import { ExpeditionMap } from './ExpeditionMap';
import { ModuleList } from './ModuleList';
import { ModuleDetail } from './ModuleDetail';
import { GateCard } from './GateCard';

export function MapPage() {
  const { views, isGuest, isLoading, error } = useModuleViews();
  const board = useLeaderboard();
  const selectedId = useMapStore((s) => s.selectedId);
  const select = useMapStore((s) => s.select);

  if (isLoading) return <p className="center muted">cargando progreso…</p>;
  if (error) return <p className="center warn">No se pudo cargar tu progreso. Intenta de nuevo.</p>;

  const current = currentModule(views);
  const selected = views.find((v) => v.module.id === selectedId) ?? current ?? views[0];

  return (
    <div className="map">
      <ExpeditionMap
        views={views}
        selectedId={selected.module.id}
        currentId={current?.module.id}
        others={board.rows.filter((r) => !r.is_me)}
        me={board.me}
        onSelect={select}
      />
      {/* En el celular las estaciones quedan chicas para tocarlas: debajo va la lista de siempre */}
      <ModuleList views={views} selectedId={selected.module.id} onSelect={select} />
      <ModuleDetail view={selected} />
      <GateCard view={selected} isGuest={isGuest} />
    </div>
  );
}
