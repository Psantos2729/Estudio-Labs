import { useEffect, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getLesson, lessonsOf } from '@/content/lessons';
import { displayId } from '@/content/types';
import { LockedNotice } from '@/features/map/LockedNotice';
import { useModuleViews } from '@/features/map/useMastery';
import { warmUp } from '@/features/runner/runner';
import { splitBlocks } from './blocks';
import { LessonBody } from './LessonBody';
import { ProgressBar } from '@/ui/primitives/ProgressBar';
import { useMarkLessonRead } from './useLessonProgress';
import './lesson.css';

export function LessonPage() {
  const { lessonId = '' } = useParams();
  const lesson = getLesson(lessonId);
  const { views, isLoading } = useModuleViews();
  const markRead = useMarkLessonRead();
  const moduleOpen = views.find((v) => v.module.id === lesson?.moduleId)?.open ?? false;
  // "desbloquear lección" en el mapa: se puede leer, pero no cuenta como progreso (el servidor lo rechazaría).
  const free = useSearchParams()[0].has('libre');
  const open = moduleOpen || free;
  const q = moduleOpen ? '' : '?libre';
  const blocks = useMemo(() => (lesson ? splitBlocks(lesson.body) : []), [lesson]);
  const hasCode = blocks.some((b) => b.kind === 'python' || b.kind === 'pseudo');

  useEffect(() => {
    if (open && hasCode) warmUp();
  }, [open, hasCode]);

  if (!lesson) return <p className="center muted">Esa lección no existe. <Link to="/mapa">volver al mapa</Link></p>;
  if (isLoading) return <p className="center muted">cargando progreso…</p>;
  if (!open) return (
    <main className="lesson">
      <Link to="/mapa" className="small">← mapa</Link>
      <LockedNotice moduleId={lesson.moduleId} />
      <p className="small"><Link to={`/leccion/${lesson.id}?libre`}>desbloquear lección</Link> <span className="muted">(puedes leerla, pero no cuenta para tu avance)</span></p>
    </main>
  );

  const siblings = lessonsOf(lesson.moduleId);
  const i = siblings.findIndex((l) => l.id === lesson.id);
  const prev = siblings[i - 1];
  const next = siblings[i + 1];

  return (
    <main className="lesson">
      <Link to="/mapa" className="small">← mapa</Link>
      <span className="accent small">{displayId(lesson.moduleId)} · lección {i + 1} de {siblings.length}{!moduleOpen && ' · desbloqueada (no cuenta para tu avance)'}</span>
      <ProgressBar value={i + 1} max={siblings.length} label="Avance en las lecciones del módulo" />
      <h1 className="display">{lesson.title}</h1>
      <LessonBody blocks={blocks} />
      <nav className="lesson__nav">
        {prev ? <Link to={`/leccion/${prev.id}${q}`}>← {prev.title}</Link> : <span />}
        {/* Llegar al final y avanzar cuenta como lección leída. */}
        <Link to={next ? `/leccion/${next.id}${q}` : '/'} onClick={() => moduleOpen && markRead(lesson.id)}>
          {next ? `${next.title} →` : 'Terminé las lecciones →'}
        </Link>
      </nav>
    </main>
  );
}
