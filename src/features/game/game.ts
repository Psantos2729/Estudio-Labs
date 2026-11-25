/** Reglas del juego que se ven en pantalla. El XP y las piezas los calcula el servidor (migraciones 016 a 019). */

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

/** Lo que lleva puesto un robot: una pieza por espacio (ver content/cosmeticos.json). */
export type Gear = Partial<Record<string, string>>;
