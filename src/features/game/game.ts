/** Reglas del juego que se ven en pantalla. El XP y las piezas los calcula el servidor (migraciones 016 a 018). */

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

export type Slot = 'cabeza' | 'cara' | 'cuerpo' | 'mano' | 'brazo';
/** Lo que lleva puesto un robot: una pieza por espacio. */
export type Gear = Partial<Record<Slot, string>>;

export const SLOTS: Slot[] = ['cabeza', 'cara', 'cuerpo', 'mano', 'brazo'];

/** Materiales de armadura y cuántos módulos dominados piden. */
const ARMOR: [string, number][] = [['cuero', 1], ['malla', 3], ['hierro', 5], ['oro', 7], ['diamante', 10], ['amatista', 13]];

/** Catálogo del taller. Debe coincidir con gear_slot y gear_unlocked de la migraciones 017 y 018. */
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
  { id: 'crack', slot: 'cara', name: 'Lentes de crack', how: 'Llega al nivel 3' },
  { id: 'mascara', slot: 'cara', name: 'Máscara de Majora', how: 'Aprueba 3 repasos' },
  { id: 'estelar', slot: 'cabeza', name: 'Casco de soldado estelar', how: 'Llega al nivel 6' },
  { id: 'fernan', slot: 'cabeza', name: 'Gorro de Fernan', how: 'Resuelve 50 ejercicios' },
  { id: 'espada_diamante', slot: 'mano', name: 'Espada de diamante', how: 'Resuelve 100 ejercicios' },
  { id: 'espada_maestra', slot: 'mano', name: 'Espada maestra', how: 'Vence a los 4 jefes de isla' },
  { id: 'escudo', slot: 'brazo', name: 'Escudo hyliano', how: 'Vence a 2 jefes de isla' },
  ...ARMOR.flatMap(([m, need]) => [
    { id: `casco_${m}`, slot: 'cabeza' as Slot, name: `Casco de ${m}`, how: `Domina ${need} módulo${need > 1 ? 's' : ''}` },
    { id: `peto_${m}`, slot: 'cuerpo' as Slot, name: `Armadura de ${m}`, how: `Domina ${need} módulo${need > 1 ? 's' : ''}` },
  ]),
];
