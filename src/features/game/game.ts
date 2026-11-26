/** Reglas del juego que se ven en pantalla. El XP y las piezas los calcula el servidor (migraciones 016 a 023). */

export const XP_PER_LEVEL = 500;

export const XP_RULES = [
  { label: 'Lección leída', xp: 10 },
  { label: 'Ejercicio resuelto', xp: 25 },
  { label: 'Examen de dominio', xp: 200 },
  { label: 'Repaso aprobado', xp: 100 },
  { label: 'Misión del día', xp: '15 a 50' },
  { label: 'Misión de la semana', xp: '80 a 120' },
  { label: 'Cada 7 días de racha', xp: 70 },
];

/** Bono de racha (migración 023): +70 XP cada 7 días de estudio seguidos. */
export const STREAK_EVERY = 7;
export const STREAK_BONUS = 70;

export const ROBOT_COLORS = ['#19d3ff', '#3ef0a0', '#ffb547', '#ff5470', '#b98cff', '#e2f6ff'];

export function levelOf(xp: number) {
  return { level: Math.floor(xp / XP_PER_LEVEL) + 1, into: xp % XP_PER_LEVEL };
}

/** Lo que lleva puesto un robot: una pieza por espacio (ver content/cosmeticos.json). */
export type Gear = Partial<Record<string, string>>;
