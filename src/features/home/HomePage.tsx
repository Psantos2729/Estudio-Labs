import { Link } from 'react-router-dom';
import { exercisesOf, lessonsOf } from '@/content/lessons';
import { displayId } from '@/content/types';
import { useAuth } from '@/features/auth/AuthProvider';
import { useModuleViews } from '@/features/map/useMastery';
import { currentModule, dueReviews } from '@/features/map/masteryView';
import { usePracticeSummary } from '@/features/exercise/usePractice';
import { useReadLessons } from '@/features/lesson/useLessonProgress';
import { nextStep } from './nextStep';
import { tipsOfTheDay } from './tips';
import { ProgressRing } from './ProgressRing';
import './home.css';

export function HomePage() {
  const { session } = useAuth();
  const { views, isGuest, isLoading } = useModuleViews();
  const practice = usePracticeSummary();
  const lessonsRead = useReadLessons();
  if (isLoading || practice.isLoading || lessonsRead.isLoading) return <p className="center muted">cargando tu progreso…</p>;

  const current = currentModule(views) ?? views[0];
  const m = current.module;
  const lessons = lessonsOf(m.id);
  const exercises = exercisesOf(m.id).filter((e) => !e.challenge);
  const solvedHere = exercises.filter((e) => practice.passed.has(e.id)).length;
  const readHere = lessons.filter((l) => lessonsRead.read.has(l.id)).length;
  const steps = lessons.length + exercises.length;
  const percent = steps ? Math.round((100 * (readHere + solvedHere)) / steps) : 0;
  const due = dueReviews(views)[0];
  const next = due
    ? { to: `/repaso/${due.module.id}`, kind: 'repaso', title: `Toca repasar ${displayId(due.module.id)} · ${due.module.title}` }
    : nextStep(lessons, exercises, lessonsRead.read, practice.passed);
  const mastered = views.filter((v) => v.status === 'mastered').length;
  const name = (session?.user.user_metadata.full_name as string | undefined)?.split(' ')[0] ?? session?.user.email?.split('@')[0];

  const stats = [
    { value: `${mastered}/${views.length}`, label: 'módulos dominados' },
    { value: lessonsRead.read.size, label: 'lecciones leídas' },
    { value: practice.passed.size, label: 'ejercicios resueltos' },
    { value: practice.attempts, label: 'intentos de práctica' },
  ];

  return (
    <main className="home">
      <section className="panel home__hero">
        <div className="home__intro">
          <span className="accent small">{isGuest ? 'modo invitado' : 'bienvenido de vuelta'}</span>
          <h1 className="display">{name ? `Hola, ${name}` : 'Hola'}</h1>
          <p className="muted">
            Vas en <span className="strong">{displayId(m.id)} · {m.title}</span>. {m.summary}
          </p>
          <div className="home__next">
            <span className="muted small">siguiente: {next.kind}</span>
            <span className="strong">{next.title}</span>
          </div>
          <div className="home__actions">
            <Link to={next.to} className="btn btn--primary">▶ Continuar</Link>
            <Link to="/mapa" className="btn btn--ghost">Ver el mapa</Link>
          </div>
          {isGuest && <p className="muted small">Entra con tu cuenta para guardar tu avance y ver tus estadísticas reales.</p>}
        </div>
        <ProgressRing value={percent} label={displayId(m.id)} sub="del módulo" />
      </section>

      <section className="home__stats" aria-label="Estadísticas">
        {stats.map((s) => (
          <div key={s.label} className="panel stat">
            <span className="stat__value">{s.value}</span>
            <span className="muted small">{s.label}</span>
          </div>
        ))}
      </section>

      <section className="panel" aria-label="Consejos">
        <p className="small accent">consejos del día</p>
        <ul className="tips">
          {tipsOfTheDay(new Date()).map((t) => <li key={t}>{t}</li>)}
        </ul>
      </section>
    </main>
  );
}
