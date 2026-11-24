import { create } from 'zustand';

interface MapState {
  selectedId: string | null;
  select: (id: string) => void;
}

/** Estado de pantalla del mapa (ADR-008): qué módulo está seleccionado. */
export const useMapStore = create<MapState>((set) => ({
  selectedId: null,
  select: (id) => set({ selectedId: id }),
}));
