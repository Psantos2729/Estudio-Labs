import { Link } from 'react-router-dom';
import { displayId } from '@/content/types';
import { exercisesOf, lessonsOf } from '@/content/lessons';
import { useReadLessons } from '@/features/lesson/useLessonProgress';
import { LockedNotice } from './LockedNotice';
import { PixelSprite } from '@/ui/primitives/PixelSprite';
import { MINI_BOSSES } from '@/features/game/minibosses';
import { usePracticeSummary } from '@/features/exercise/usePractice';
import { MasteryPath } from './MasteryPath';
import { QuestList, type QuestRow } from './QuestList';
import { pathStates, rowStates } from './questPath';
import type { ModuleView } from './masteryView';
import './detail.css';

export function ModuleDetail({ view }: { view: ModuleView }) {
  const { module: m } = view;
  const boss = MINI_BOSSES[Number(m.id.slice(1))];
  const lessons = lessonsOf(m.id);
  const { read } = useReadLessons();
  const exercises = exercisesOf(m.id);
  const { passed } = usePracticeSummary();
  const lessonRows = rowStates(lessons.map((l) => l.id), read);
  const exRows = rowStates(exercises.map((e) => e.id), passed, (i) => Boolean(exercises[i].challenge));
  const required = exercises.filter((e) => !e.challenge);
  const steps = pathStates(view.open, view.status === 'mastered', lessonRows.every((s) => s === 'done'), required.every((e) => passed.has(e.id)));
  const labs = m.pdfExercises.length > 0 ? m.pdfExercises.join(', ') : 'sin labs del PDF';

  return (
    <main className="detail">
      <header className="detail__head">
        <span className="accent small">módulo {view.label} · {displayId(m.id)}</span>
        <h1 className="display">{m.title}</h1>
        <p className="muted">{m.summary}</p>
      </header>

      {!view.open && <LockedNotice moduleId={m.id} />}

      <MasteryPath states={steps} />

      {lessons.length > 0 && (
        <QuestList
          label="Lecciones"
          locked={!view.open}
          note={view.open ? undefined : 'puedes leerlas ya, pero no cuentan para tu avance'}
          rows={lessons.map((l, i) => ({
            id: l.id,
            title: l.title,
            state: lessonRows[i],
            to: view.open ? `/leccion/${l.id}` : undefined,
            extra: !view.open && <Link to={`/leccion/${l.id}?libre`} className="mission__unlock small">desbloquear lección</Link>,
          }))}
        />
      )}

      {exercises.length > 0 && (
        <QuestList
          label="Práctica guiada"
          locked={!view.open}
          note={exercises.some((e) => e.challenge) ? 'los retos son opcionales: no cuentan para tu avance' : undefined}
          rows={exercises.map((e, i): QuestRow => {
            const isBoss = e.title.startsWith('Jefe');
            return {
              id: e.id,
              // la etiqueta ya dice jefe o reto: no repetirlo en el título
              title: e.title.replace(/^(Jefe|Reto):\s*(.)/, (_, _tag: string, c: string) => c.toUpperCase()),
              state: exRows[i],
              to: view.open ? `/ejercicio/${e.id}` : undefined,
              tag: isBoss ? 'jefe' : e.challenge ? 'reto' : undefined,
              badge: isBoss ? <PixelSprite name={boss.sprite} size={22} title={boss.name} /> : undefined,
            };
          })}
        />
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
          <div className="boss-line">
            <PixelSprite name={boss.sprite} size={40} title={boss.name} />
            <div>
              <p className="warn">{boss.name}: {m.boss.title} <span className="muted small">({m.boss.source})</span></p>
              <p className="muted small">{boss.meaning}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
