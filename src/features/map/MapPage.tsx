import { useMapStore } from './mapStore';
import { currentModule } from './masteryView';
import { useModuleViews } from './useMastery';
import { ModuleList } from './ModuleList';
import { ModuleDetail } from './ModuleDetail';
import { GateCard } from './GateCard';

export function MapPage() {
  const { views, isGuest, isLoading, error } = useModuleViews();
  const selectedId = useMapStore((s) => s.selectedId);
  const select = useMapStore((s) => s.select);

  if (isLoading) return <p className="center muted">cargando progreso…</p>;
  if (error) return <p className="center warn">No se pudo cargar tu progreso. Intenta de nuevo.</p>;

  const selected = views.find((v) => v.module.id === selectedId) ?? currentModule(views) ?? views[0];

  return (
    <div className="map">
      <ModuleList views={views} selectedId={selected.module.id} onSelect={select} />
      <ModuleDetail view={selected} />
      <GateCard view={selected} isGuest={isGuest} />
    </div>
  );
}
