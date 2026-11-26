import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import guide from '../../../content/pseudocodigo.md?raw';
import { splitBlocks } from '@/features/lesson/blocks';
import { LessonBody } from '@/features/lesson/LessonBody';
import { warmUp } from '@/features/runner/runner';
import '@/features/lesson/lesson.css';

const [title, ...rest] = guide.split('\n');

/** Guía de pseudocódigo: siempre abierta, sin progreso; las reglas con ejemplos que se corren. */
export function GuidePage() {
  const blocks = useMemo(() => splitBlocks(rest.join('\n')), []);
  useEffect(warmUp, []);
  return (
    <main className="lesson">
      <Link to="/mapa" className="small">← mapa</Link>
      <span className="accent small">guía · siempre abierta</span>
      <h1 className="display">{title.replace(/^# /, '')}</h1>
      <LessonBody blocks={blocks} />
    </main>
  );
}
