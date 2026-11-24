// Tipos del contenido que vive en /content (ADR-005).
export interface BossChallenge {
  title: string;
  source: string;
}

export interface ModuleDef {
  id: string; // 'M06'
  slug: string;
  position: number;
  title: string;
  summary: string;
  prerequisites: string[];
  concepts: string[];
  pdfExercises: number[]; // números del PDF "Ejercicios preparatorios para Laboratorios de C5"
  realTasks: string[]; // tareas reales de Computación y Programación
  boss: BossChallenge;
  passScore: number; // % mínimo del examen de dominio
  reviewDays: number[]; // días entre repasos programados
}

/** 'M06' → 'M6', para mostrar en pantalla. */
export function displayId(id: string): string {
  return id.replace(/^M0(\d)$/, 'M$1');
}
