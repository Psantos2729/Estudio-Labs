import { useState } from 'react';
import { marked } from 'marked';
import type { ExerciseDef } from '@/content/types';
import { Button } from '@/ui/primitives/Button';
import { runTests, type TestResult } from '@/features/runner/check';
import { preview } from '@/features/pseudo/run';
import { TestResults } from '@/features/exercise/TestResults';
import { blockAt, editList, newBlock, parseFlow, samePseudo, toPseudo, type Addr, type Block } from './model';
import { keyOf } from './layout';
import { DARK, FlowSvg } from './FlowSvg';
import { AddPanel, EditPanel } from './BlockPanel';
import { downloadPng } from './exportPng';
import './flow.css';

interface Props {
  exercise: ExerciseDef;
  value: string | undefined; // notes.flow: el diagrama en JSON
  onChange: (json: string) => void;
  pseudo?: string; // lo que escribió en el paso de pseudocódigo, para comparar
  next: string;
  onDone: () => void;
}

type Focus = { mode: 'add' | 'edit'; addr: Addr; i: number } | null;

/** Paso opcional: armar el diagrama de flujo con bloques y probarlo con las pruebas del ejercicio. */
export function FlowStep({ exercise, value, onChange, pseudo, next, onDone }: Props) {
  const [blocks, setBlocks] = useState<Block[]>(() => parseFlow(value));
  const [focus, setFocus] = useState<Focus>(null);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [busy, setBusy] = useState(false);
  const code = toPseudo(blocks);
  const error = preview(code).error;
  const update = (b: Block[]) => (setBlocks(b), setResults(null), onChange(JSON.stringify(b)));
  const editing = focus?.mode === 'edit' ? blockAt(blocks, focus.addr, focus.i) : undefined;

  const ctx = {
    pal: DARK, interactive: true,
    selected: focus?.mode === 'edit' ? keyOf(focus.addr, focus.i) : undefined,
    onPlus: (addr: Addr, i: number) => setFocus({ mode: 'add', addr, i }),
    onPick: (addr: Addr, i: number) => setFocus({ mode: 'edit', addr, i }),
  };
  const add = (k: Block['kind']) => {
    if (!focus) return;
    update(editList(blocks, focus.addr, (l) => l.splice(focus.i, 0, newBlock(k))));
    setFocus({ mode: 'edit', addr: focus.addr, i: focus.i });
  };
  const move = (d: -1 | 1) => {
    if (!focus) return;
    const j = focus.i + d;
    if (j < 0 || !blockAt(blocks, focus.addr, j)) return;
    update(editList(blocks, focus.addr, (l) => {
      [l[focus.i], l[j]] = [l[j], l[focus.i]];
    }));
    setFocus({ ...focus, i: j });
  };
  const test = async () => {
    setBusy(true);
    setResults(await runTests(code, exercise.tests, 'pseudo'));
    setBusy(false);
  };

  return (
    <section className="panel split flow-split">
      <div className="split__code flow">
        <p className="muted small">Toca un <b>＋</b> para agregar un bloque y toca un bloque para editarlo. Las flechas se acomodan solas.</p>
        {focus?.mode === 'add' && <AddPanel onAdd={add} onCancel={() => setFocus(null)} />}
        {editing && focus && (
          <EditPanel block={editing} onClose={() => setFocus(null)} onMove={move}
            onText={(t) => update(editList(blocks, focus.addr, (l) => { l[focus.i].text = t; }))}
            onRemove={() => (update(editList(blocks, focus.addr, (l) => l.splice(focus.i, 1))), setFocus(null))} />
        )}
        <div className="flow__canvas"><FlowSvg blocks={blocks} ctx={ctx} /></div>
      </div>
      <div className="split__read">
        <details className="flow__statement">
          <summary className="muted small">ver el enunciado</summary>
          {/* El enunciado viene de content/ en este repo, no del usuario. */}
          <div className="prose" dangerouslySetInnerHTML={{ __html: marked.parse(exercise.statement, { async: false }) }} />
        </details>
        <span className="strong">Lo que dice tu diagrama</span>
        <pre className="runnable__out">{code}</pre>
        {error && <p className="warn small" aria-live="polite">{error}</p>}
        {pseudo?.trim() && !error && blocks.length > 0 && (
          <p className="small">{samePseudo(code, pseudo)
            ? <span className="ok">✓ Coincide con tu pseudocódigo del paso anterior.</span>
            : <span className="muted">Es distinto de tu pseudocódigo del paso anterior. No pasa nada si los dos funcionan: compáralos.</span>}</p>
        )}
        <div className="runnable__bar">
          <Button disabled={busy || !!error || !blocks.length} onClick={test}>Probar el diagrama ({exercise.tests.length} pruebas)</Button>
          <Button variant="ghost" disabled={!blocks.length} onClick={() => downloadPng(blocks, `diagrama-${exercise.id}`)}>Descargar imagen</Button>
          {busy && <span className="muted small">corriendo…</span>}
        </div>
        {results && <TestResults results={results} />}
        <Button variant={results?.every((r) => r.passed) ? 'primary' : 'ghost'} onClick={onDone}>
          {blocks.length ? next : `Saltar: ${next.toLowerCase()}`} →
        </Button>
      </div>
    </section>
  );
}
