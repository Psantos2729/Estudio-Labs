/** Piezas recién ganadas: las que el servidor da por ganadas y este navegador todavía no mostró. */
// shortcut: lo ya mostrado vive en este navegador; en otro dispositivo lo anterior se marca visto sin aviso.
const key = (user: string) => `logros-vistos-${user}`;

export function newAchievements(user: string, unlocked: string[]): string[] {
  let seen: string[] | null = null;
  try {
    seen = JSON.parse(localStorage.getItem(key(user)) ?? 'null') as string[] | null;
  } catch { /* sin almacenamiento: no se avisa */ }
  if (!seen) {
    markSeen(user, unlocked); // primera vez aquí: lo que ya tenía no es nuevo
    return [];
  }
  return unlocked.filter((id) => !seen.includes(id));
}

export function markSeen(user: string, unlocked: string[]) {
  try { localStorage.setItem(key(user), JSON.stringify(unlocked)); } catch { /* igual */ }
}
