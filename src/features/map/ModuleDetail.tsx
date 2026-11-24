import { Link } from 'react-router-dom';
import { displayId } from '@/content/types';
import { exercisesOf, lessonsOf } from '@/content/lessons';
import { useReadLessons } from '@/features/lesson/useLessonProgress';
import type { ModuleView } from './masteryView';

const STEPS = [
  { name: 'Lección', detail: 'conceptos y preguntas de predicción' },
  { name: 'Práctica guiada', detail: 'ejercicios con pistas' },
  { name: 'Tareas reales', detail: 'tus tareas de Computación y Programación' },
  { name: 'Labs C5', detail: 'ejercicios del PDF de laboratorios' },
  { name: 'Examen de dominio', detail: 'casos ocultos, sin pistas' },
];

export function ModuleDetail({ view }: { view: ModuleView }) {
  const { module: m } = view;
  const lessons = lessonsOf(m.id);
  const { read } = useReadLessons();
  const exercises = exercisesOf(m.id);
  const labs = m.pdfExercises.length > 0 ? m.pdfExercises.join(', ') : 'sin labs del PDF';

  return (
    <main className="detail">
      <header className="detail__head">
        <span className="accent small">módulo {view.label} · {displayId(m.id)}</span>
        <h1 className="display">{m.title}</h1>
        <p className="muted">{m.summary}</p>
      </header>

      <section className="panel" aria-label="Camino de dominio">
        <p className="small">camino de dominio</p>
        <ol className="steps">
          {STEPS.map((s) => (
            <li key={s.name} className={`steps__item ${view.open ? '' : 'steps__item--locked'}`}>
              <span className="steps__name">{s.name}</span>
              <span className="muted small">{s.detail}</span>
            </li>
          ))}
        </ol>
      </section>

      {lessons.length > 0 && (
        <section className="panel" aria-label="Lecciones">
          <p className="small">lecciones{!view.open && ' · vista previa: se abren al dominar el módulo anterior'}</p>
          <ol className="plain">
            {lessons.map((l, i) => (
              <li key={l.id}>{view.open
                ? <Link to={`/leccion/${l.id}`}>{read.has(l.id) ? '✓' : `${i + 1}.`} {l.title}</Link>
                : <span className="muted">{i + 1}. {l.title}</span>}</li>
            ))}
          </ol>
        </section>
      )}

      {exercises.length > 0 && (
        <section className="panel" aria-label="Práctica guiada">
          <p className="small">práctica guiada</p>
          <ol className="plain">
            {exercises.map((e, i) => (
              <li key={e.id}>{view.open
                ? <Link to={`/ejercicio/${e.id}`}>{i + 1}. {e.title}</Link>
                : <span className="muted">{i + 1}. {e.title}</span>}</li>
            ))}
          </ol>
        </section>
      )}

      <div className="detail__grid">
        <section className="panel">
          <p className="muted small">conceptos</p>
          <ul className="plain">
            {m.concepts.map((c) => <li key={c}>· {c}</li>)}
          </ul>
        </section>
        <section className="panel">
          <p className="muted small">labs del PDF C5</p>
          <p>{labs}</p>
          <p className="muted small">tareas reales</p>
          <ul className="plain">
            {m.realTasks.length > 0 ? m.realTasks.map((t) => <li key={t}>· {t}</li>) : <li>· ejercicios propios</li>}
          </ul>
          <p className="muted small">jefe final</p>
          <p className="warn">{m.boss.title} <span className="muted small">({m.boss.source})</span></p>
        </section>
      </div>
    </main>
  );
}
