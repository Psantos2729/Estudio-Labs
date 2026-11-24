import type { ExerciseDef, ModuleDef } from './types';

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

/** Revisa un ejercicio del módulo `moduleId`. Devuelve la lista de problemas. */
export function validateExercise(e: ExerciseDef, moduleId: string): string[] {
  const p: string[] = [];
  if (!new RegExp(`^${moduleId}-E\\d{2}$`).test(e.id)) p.push(`${e.id}: id debe ser ${moduleId}-ENN`);
  if (!e.title?.trim() || !e.statement?.trim()) p.push(`${e.id}: falta título o enunciado`);
  if (typeof e.starter !== 'string') p.push(`${e.id}: falta starter`);
  if (!e.hints?.length) p.push(`${e.id}: necesita al menos una pista`);
  if (!e.tests?.length) p.push(`${e.id}: necesita al menos una prueba pública`);
  e.tests?.forEach((t, i) => {
    if (typeof t.stdin !== 'string' || typeof t.stdout !== 'string') p.push(`${e.id}: prueba ${i} mal formada`);
  });
  e.predict?.forEach((q, i) => {
    if (!(q.answer >= 0 && q.answer < q.options.length)) p.push(`${e.id}: predicción ${i} sin respuesta válida`);
    if (!q.why?.trim()) p.push(`${e.id}: predicción ${i} sin explicación`);
  });
  return p;
}
