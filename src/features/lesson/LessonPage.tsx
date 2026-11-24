import { Fragment, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { marked } from 'marked';
import { getLesson, lessonsOf } from '@/content/lessons';
import { displayId } from '@/content/types';
import { useModuleViews } from '@/features/map/useMastery';
import { warmUp } from '@/features/runner/runner';
import { splitBlocks } from './blocks';
import { RunnableCode } from './RunnableCode';
import { ProgressBar } from '@/ui/primitives/ProgressBar';
import { useMarkLessonRead } from './useLessonProgress';
import './lesson.css';

export function LessonPage() {
  const { lessonId = '' } = useParams();
  const lesson = getLesson(lessonId);
  const { views, isLoading } = useModuleViews();
  const markRead = useMarkLessonRead();
  const open = views.find((v) => v.module.id === lesson?.moduleId)?.open ?? false;
  const blocks = useMemo(() => (lesson ? splitBlocks(lesson.body) : []), [lesson]);
  const hasCode = blocks.some((b) => b.kind === 'python');

  useEffect(() => {
    if (open && hasCode) warmUp();
  }, [open, hasCode]);

  if (!lesson) return <p className="center muted">Esa lección no existe. <Link to="/mapa">volver al mapa</Link></p>;
  if (isLoading) return <p className="center muted">cargando progreso…</p>;
  if (!open) return <p className="center warn">Este módulo está bloqueado. <Link to="/mapa">volver al mapa</Link></p>;

  const siblings = lessonsOf(lesson.moduleId);
  const i = siblings.findIndex((l) => l.id === lesson.id);
  const prev = siblings[i - 1];
  const next = siblings[i + 1];

  return (
    <main className="lesson">
      <Link to="/mapa" className="small">← mapa</Link>
      <span className="accent small">{displayId(lesson.moduleId)} · lección {i + 1} de {siblings.length}</span>
      <ProgressBar value={i + 1} max={siblings.length} label="Avance en las lecciones del módulo" />
      <h1 className="display">{lesson.title}</h1>
      <article className="prose">
        {blocks.map((b, k) => (
          <Fragment key={k}>
            {b.kind === 'python' ? (
              <RunnableCode initial={b.code} />
            ) : (
              // El markdown viene de content/ en este repo, no del usuario.
              <div dangerouslySetInnerHTML={{ __html: marked.parse(b.text, { async: false }) }} />
            )}
          </Fragment>
        ))}
      </article>
      <nav className="lesson__nav">
        {prev ? <Link to={`/leccion/${prev.id}`}>← {prev.title}</Link> : <span />}
        {/* Llegar al final y avanzar cuenta como lección leída. */}
        <Link to={next ? `/leccion/${next.id}` : '/'} onClick={() => markRead(lesson.id)}>
          {next ? `${next.title} →` : 'Terminé las lecciones →'}
        </Link>
      </nav>
    </main>
  );
}
