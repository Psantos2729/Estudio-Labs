import { Button } from '@/ui/primitives/Button';
import { LABEL, caption, type Block, type Kind } from './model';

const KINDS: Kind[] = ['read', 'process', 'write', 'if', 'while', 'for'];
const HINT: Record<Kind, string> = {
  read: 'la variable que se lee, p. ej. n',
  process: 'una asignación con ←, p. ej. s ← s + i',
  write: 'lo que se muestra, p. ej. "Total: ", s',
  if: 'la condición, p. ej. n mod 2 = 0',
  while: 'la condición del ciclo, p. ej. n > 0',
  for: 'variable ← inicio to final, p. ej. i ← 1 to n',
};

/** Elegir qué bloque va en un ＋. */
export function AddPanel({ onAdd, onCancel }: { onAdd: (k: Kind) => void; onCancel: () => void }) {
  return (
    <div className="flow__panel enter">
      <span className="muted small">¿Qué va aquí?</span>
      <div className="flow__kinds">
        {KINDS.map((k) => (
          <button key={k} type="button" className={`flow__kind flow__kind--${k}`} onClick={() => onAdd(k)}>{LABEL[k]}</button>
        ))}
      </div>
      <Button variant="ghost" onClick={onCancel}>cancelar</Button>
    </div>
  );
}

interface EditProps {
  block: Block;
  onText: (t: string) => void;
  onMove: (d: -1 | 1) => void;
  onRemove: () => void;
  onClose: () => void;
}

/** Editar el bloque elegido: su texto, moverlo dentro de su lista o quitarlo. */
export function EditPanel({ block, onText, onMove, onRemove, onClose }: EditProps) {
  const inner = block.kind === 'if' ? block.yes.length + block.no.length : 'body' in block ? block.body.length : 0;
  return (
    <div className="flow__panel enter">
      <label className="field">
        <span className="muted small">{LABEL[block.kind]} · {HINT[block.kind]}</span>
        <input className="input flow__input" value={block.text} autoFocus spellCheck={false}
          onChange={(e) => onText(e.target.value.replace('<-', '←'))} onKeyDown={(e) => e.key === 'Enter' && onClose()} />
      </label>
      <span className="muted small">se ve así: <code>{caption(block)}</code></span>
      <div className="runnable__bar">
        <Button variant="ghost" onClick={() => onMove(-1)} aria-label="subir">↑ subir</Button>
        <Button variant="ghost" onClick={() => onMove(1)} aria-label="bajar">↓ bajar</Button>
        <Button variant="ghost" onClick={onRemove}>quitar{inner ? ` (y sus ${inner} bloques)` : ''}</Button>
        <Button onClick={onClose}>listo</Button>
      </div>
    </div>
  );
}
