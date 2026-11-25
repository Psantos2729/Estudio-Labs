/** Reglas del juego que se ven en pantalla. El XP en sí lo calcula el servidor (migración 016). */

export const XP_PER_LEVEL = 500;

export const XP_RULES = [
  { label: 'Lección leída', xp: 10 },
  { label: 'Ejercicio resuelto', xp: 25 },
  { label: 'Examen de dominio', xp: 200 },
  { label: 'Repaso aprobado', xp: 100 },
];

/** Las 4 zonas de la ruta. `last` es la posición del último módulo de la zona. */
export const ZONES = [
  { name: 'Bases', last: 3, color: 'var(--green)', gear: 'antena dorada' },
  { name: 'Datos en serie', last: 6, color: 'var(--accent)', gear: 'visor' },
  { name: 'Archivos', last: 9, color: 'var(--purple)', gear: 'capa' },
  { name: 'Estructuras', last: 12, color: 'var(--amber)', gear: 'núcleo dorado' },
];

export const ROBOT_COLORS = ['#19d3ff', '#3ef0a0', '#ffb547', '#ff5470', '#b98cff', '#e2f6ff'];

export function levelOf(xp: number) {
  return { level: Math.floor(xp / XP_PER_LEVEL) + 1, into: xp % XP_PER_LEVEL };
}

/** Accesorios del robot: uno por zona completa, contando módulos dominados en orden. */
export function gearOf(mastered: number): number {
  return ZONES.filter((z) => mastered > z.last).length;
}
