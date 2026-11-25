import type { RunResult } from '@/features/runner/runner';
import type { Exam } from './types';

type Run = (code: string, stdin: string) => Promise<RunResult>;

/**
 * Respuestas para submit_exam: la salida del código de cada problema con cada entrada oculta
 * y el índice elegido en cada pregunta. Si el programa falla, se manda lo que alcanzó a imprimir.
 */
export async function buildAnswers(exam: Exam, code: Record<string, string>, picked: Record<number, number>, run: Run) {
  const answers: Record<string, string> = {};
  for (const p of exam.problems) {
    for (const c of p.cases) answers[c.id] = (await run(code[p.id] ?? '', c.stdin)).stdout;
  }
  for (const q of exam.questions) if (picked[q.id] !== undefined) answers[q.id] = String(picked[q.id]);
  return answers;
}
