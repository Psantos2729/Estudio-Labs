import type { ModuleDef } from './types';

/** Revisa que la ruta de módulos sea coherente. Devuelve la lista de problemas. */
export function validateModules(modules: ModuleDef[]): string[] {
  const problems: string[] = [];
  const ids = new Set(modules.map((m) => m.id));

  modules.forEach((m, i) => {
    if (m.position !== i) problems.push(`${m.id}: position ${m.position}, se esperaba ${i}`);
    for (const p of m.prerequisites) {
      if (!ids.has(p)) problems.push(`${m.id}: prerrequisito desconocido ${p}`);
      const pre = modules.find((x) => x.id === p);
      if (pre && pre.position >= m.position) problems.push(`${m.id}: ${p} no va antes`);
    }
  });

  const seen = new Map<number, string>();
  for (const m of modules) {
    for (const n of m.pdfExercises) {
      if (seen.has(n)) problems.push(`Ejercicio ${n} repetido en ${seen.get(n)} y ${m.id}`);
      seen.set(n, m.id);
    }
  }
  for (let n = 1; n <= 37; n++) {
    if (!seen.has(n)) problems.push(`Ejercicio ${n} del PDF C5 no está en ningún módulo`);
  }
  return problems;
}
