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

/** Pregunta de opción múltiple: "¿qué imprime este código?" antes de escribir. */
export interface PredictQuestion {
  question: string;
  options: string[];
  answer: number; // índice de la opción correcta
  why: string; // el razonamiento, no solo la respuesta
}

/** Caso de prueba público. Los ocultos viven solo en la base de datos (fase 3). */
export interface TestCase {
  stdin: string; // lo que se escribe en input(), una línea por llamada
  stdout: string; // lo que debe imprimir el programa
  files?: Record<string, string>; // archivos de texto que ya están en la carpeta al empezar (M08)
}

export interface ExerciseDef {
  id: string; // 'M01-E01'
  title: string;
  statement: string; // markdown
  pdf?: number; // número del ejercicio en el PDF C5, si viene de ahí
  challenge?: boolean; // reto opcional: aparece en la lista, pero no cuenta para el avance ni para Continuar
  language?: 'pseudo'; // se escribe en pseudocódigo (se traduce a Python para probarlo)
  starter: string; // código inicial del editor
  predict: PredictQuestion[];
  hints: string[]; // de la más vaga a la más concreta
  tests: TestCase[];
}

/** Lección en markdown; el título es su primera línea `# ...`. */
export interface LessonDef {
  id: string; // 'M00-L01', del nombre del archivo
  moduleId: string;
  title: string;
  body: string;
}

export type PracticeLevel = 'medio' | 'dificil' | 'muy-dificil';

/** Problema suelto de la zona de práctica general (content/practica/PNN.json). */
export interface PracticeDef extends ExerciseDef {
  level: PracticeLevel;
  zone?: number; // 1–4: sector del mapa con el que se relaciona; sin zona, es un tema extra
  topic: string;
}
