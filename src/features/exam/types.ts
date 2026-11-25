/** Lo que devuelve start_exam: entradas y preguntas, nunca las respuestas (migración 009). */
export interface ExamCase { id: number; stdin: string }
export interface ExamProblem { id: string; title: string; statement: string; cases: ExamCase[] }
export interface ExamQuestion { id: number; question: string; options: string[] }
export interface Exam {
  attempt_id: number;
  module_id: string;
  expires_at: string;
  problems: ExamProblem[];
  questions: ExamQuestion[];
}

/** Lo que devuelve submit_exam (migración 010): solo conteos. */
export interface ExamOutcome {
  score: number;
  passed: boolean;
  pass_score: number;
  retry_at: string | null;
  problems: { id: string; passed: number; total: number }[];
  questions: { passed: number; total: number };
}
