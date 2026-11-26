/** Vida del jefe: los puntos mínimos para aprobar (como el servidor: redondea el % y lo compara). */
export function bossLife(total: number, passScore: number) {
  for (let k = 0; k <= total; k++) if (Math.round((100 * k) / total) >= passScore) return Math.max(1, k);
  return Math.max(1, total);
}

/** Puntos acertados y totales de un resultado de submit_exam. */
export function pointsOf(r: { problems: { passed: number; total: number }[]; questions: { passed: number; total: number } }) {
  const all = [...r.problems, r.questions];
  return { hits: all.reduce((s, p) => s + p.passed, 0), total: all.reduce((s, p) => s + p.total, 0) };
}
