/** Reglas del juego que se ven en pantalla. El XP y las piezas los calcula el servidor (migraciones 016 y 017). */

export const XP_PER_LEVEL = 500;

export const XP_RULES = [
  { label: 'Lección leída', xp: 10 },
  { label: 'Ejercicio resuelto', xp: 25 },
  { label: 'Examen de dominio', xp: 200 },
  { label: 'Repaso aprobado', xp: 100 },
];

export const ROBOT_COLORS = ['#19d3ff', '#3ef0a0', '#ffb547', '#ff5470', '#b98cff', '#e2f6ff'];

export function levelOf(xp: number) {
  return { level: Math.floor(xp / XP_PER_LEVEL) + 1, into: xp % XP_PER_LEVEL };
}

export type Slot = 'cabeza' | 'cara' | 'cuerpo' | 'mano';
/** Lo que lleva puesto un robot: una pieza por espacio. */
export type Gear = Partial<Record<Slot, string>>;

export const SLOTS: Slot[] = ['cabeza', 'cara', 'cuerpo', 'mano'];

/** Catálogo del taller. Debe coincidir con gear_slot y gear_unlocked de la migración 017. */
export const PIECES: { id: string; slot: Slot; name: string; how: string }[] = [
  { id: 'hoja', slot: 'cabeza', name: 'Sombrero de hoja', how: 'Vence al Gólem de Musgo' },
  { id: 'marinero', slot: 'cabeza', name: 'Gorra de marinero', how: 'Vence al Kraken del Orden' },
  { id: 'audifonos', slot: 'cabeza', name: 'Audífonos', how: 'Llega al nivel 4' },
  { id: 'corona', slot: 'cabeza', name: 'Corona', how: 'Llega al nivel 8' },
  { id: 'visor', slot: 'cara', name: 'Visor', how: 'Llega al nivel 2' },
  { id: 'lentes', slot: 'cara', name: 'Lentes de búho', how: 'Vence al Dragón del Archivo' },
  { id: 'gafas', slot: 'cara', name: 'Gafas de piloto', how: 'Vence a la Sierpe de Tormenta' },
  { id: 'bufanda', slot: 'cuerpo', name: 'Bufanda roja', how: 'Vence al Kraken del Orden' },
  { id: 'capa', slot: 'cuerpo', name: 'Capa de rayo', how: 'Vence a la Sierpe de Tormenta' },
  { id: 'rama', slot: 'mano', name: 'Bastón de rama', how: 'Vence al Gólem de Musgo' },
  { id: 'pergamino', slot: 'mano', name: 'Pergamino', how: 'Vence al Dragón del Archivo' },
  { id: 'llave', slot: 'mano', name: 'Llave inglesa', how: 'Resuelve 25 ejercicios' },
];
