import type { ModuleDef } from './types';

// Vite incluye cada content/*/module.json en el paquete al compilar.
const files = import.meta.glob<ModuleDef>('../../content/*/module.json', {
  eager: true,
  import: 'default',
});

export const MODULES: ModuleDef[] = Object.values(files).sort((a, b) => a.position - b.position);

export function getModule(id: string): ModuleDef | undefined {
  return MODULES.find((m) => m.id === id);
}
