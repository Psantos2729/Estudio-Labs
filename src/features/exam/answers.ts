import type { RunResult } from '@/features/runner/runner';
import type { Exam } from './types';

type Run = (code: string, stdin: string, files: Record<string, string>) => Promise<RunResult>;

/**
 * Respuestas para submit_exam: la salida del código de cada problema con cada entrada oculta
 * y el índice elegido en cada pregunta. Si el programa falla, se manda lo que alcanzó a imprimir.
 * Si 2 casos de un problema se pasan del límite de tiempo, los siguientes de ese problema no se corren.
 */
export async function buildAnswers(exam: Exam, code: Record<string, string>, picked: Record<number, number>, run: Run) {
  const answers: Record<string, string> = {};
  for (const p of exam.problems) {
    // Tras 2 casos que se pasaron de tiempo, los demás van vacíos: correrlos gastaría el minuto de gracia.
    let timeouts = 0;
    for (const c of p.cases) {
      const r = timeouts >= 2 ? { stdout: '' } : await run(code[p.id] ?? '', c.stdin, c.files ?? {});
      if (r.timedOut) timeouts++;
      answers[c.id] = r.stdout;
    }
  }
  for (const q of exam.questions) if (picked[q.id] !== undefined) answers[q.id] = String(picked[q.id]);
  return answers;
}
