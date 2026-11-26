import { useEffect, useRef, useState } from 'react';
import { Button } from '@/ui/primitives/Button';
import { runPython } from '@/features/runner/runner';
import { buildAnswers } from './answers';
import { ExamProblemCard } from './ExamProblemCard';
import { ExamQuestions } from './ExamQuestions';
import { useSubmitExam } from './useExam';
import { BossBattle } from './BossBattle';
import type { Exam, ExamOutcome } from './types';

interface Draft { code: Record<string, string>; picked: Record<number, number> }

// Borrador en este navegador por si se recarga la página a medio examen.
const key = (exam: Exam) => `examen-${exam.attempt_id}`;
function loadDraft(exam: Exam): Draft {
  try {
    return JSON.parse(localStorage.getItem(key(exam)) ?? '') as Draft;
  } catch {
    return { code: {}, picked: {} };
  }
}

export function ExamRun({ exam, passScore, onDone }: { exam: Exam; passScore: number; onDone: (r: ExamOutcome) => void }) {
  const [draft, setDraft] = useState<Draft>(() => loadDraft(exam));
  const [now, setNow] = useState(Date.now());
  const [running, setRunning] = useState(false);
  const submit = useSubmitExam();
  const sent = useRef(false);
  const autoSent = useRef(false);
  const left = Math.max(0, Math.floor((Date.parse(exam.expires_at) - now) / 1000));
  const answered = Object.keys(draft.picked).length;

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    try { localStorage.setItem(key(exam), JSON.stringify(draft)); } catch { /* sin almacenamiento: no pasa nada */ }
  }, [exam, draft]);

  const deliver = async () => {
    if (sent.current) return;
    sent.current = true;
    setRunning(true);
    const answers = await buildAnswers(exam, draft.code, draft.picked, (c, s, files) => runPython(c, s, { quietPrompts: true, files }));
    setRunning(false);
    submit.mutate({ attemptId: exam.attempt_id, answers, code: draft.code }, {
      onSuccess: (r) => { try { localStorage.removeItem(key(exam)); } catch { /* igual */ } onDone(r); },
      onError: () => { sent.current = false; },
    });
  };

  useEffect(() => {
    // Se acabó el tiempo: entrega lo que haya, una sola vez (si falla, el botón permite reintentar).
    if (left === 0 && !autoSent.current) {
      autoSent.current = true;
      void deliver();
    }
  });

  const busy = running || submit.isPending;
  const points = exam.questions.length + exam.problems.reduce((n, p) => n + p.cases.length, 0);
  return (
    <>
      <BossBattle moduleId={exam.module_id} total={points} passScore={passScore} />
      <div className="exam__bar">
        <span className={`exam__clock ${left < 300 ? 'exam__clock--low' : ''}`} aria-live="off">
          ⏱ {Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}
        </span>
        <span className="muted small">{answered} de {exam.questions.length} preguntas contestadas</span>
      </div>
      {exam.problems.map((p, i) => (
        <ExamProblemCard key={p.id} problem={p} n={i + 1} initial={draft.code[p.id] ?? ''}
          note={`Al entregar, tu código corre con ${p.cases.length} entradas ocultas.`}
          onChange={(c) => setDraft((d) => ({ ...d, code: { ...d.code, [p.id]: c } }))} />
      ))}
      <ExamQuestions questions={exam.questions} picked={draft.picked}
        onPick={(id, o) => setDraft((d) => ({ ...d, picked: { ...d.picked, [id]: o } }))} />
      <section className="panel">
        <p className="muted small">Al entregar, tu código corre con las entradas ocultas aquí mismo y el servidor califica. No hay segunda entrega.</p>
        <Button disabled={busy} onClick={() => void deliver()}>
          {running ? 'corriendo tus programas…' : submit.isPending ? 'calificando…' : 'Entregar'}
        </Button>
        {submit.error && <p className="warn" role="alert">{submit.error.message}</p>}
      </section>
    </>
  );
}
