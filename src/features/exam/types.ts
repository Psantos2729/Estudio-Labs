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

/** Lo que devuelve submit_exam (migraciones 010 y 013): solo conteos. */
export interface ExamOutcome {
  kind?: 'exam' | 'review';
  next_review_at?: string | null;
  score: number;
  passed: boolean;
  pass_score: number;
  retry_at: string | null;
  problems: { id: string; passed: number; total: number }[];
  questions: { passed: number; total: number };
}

/** Lo que devuelve exam_review (migración 014): tu entrega con ✓/×, sin respuestas correctas. */
export interface ExamReview {
  attempt_id: number;
  module_id: string;
  kind: 'exam' | 'review';
  started_at: string;
  score: number;
  passed: boolean;
  problems: (Omit<ExamProblem, 'cases'> & { code: string | null; cases: (ExamCase & { given: string | null; good: boolean })[] })[];
  questions: (ExamQuestion & { picked: string | null; good: boolean })[];
}
