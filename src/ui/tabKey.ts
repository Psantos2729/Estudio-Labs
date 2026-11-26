import type { KeyboardEvent } from 'react';

/**
 * Tab en un textarea de código: mete 4 espacios (Shift+Tab los quita al inicio de la línea).
 * Enter conserva la sangría de la línea anterior.
 * Para salir con el teclado: Esc y luego Tab, igual que en el editor de los ejercicios.
 */
export function onTabKey(e: KeyboardEvent<HTMLTextAreaElement>, set: (value: string) => void): void {
  const t = e.currentTarget;
  if (e.key === 'Escape') return void (t.dataset.esc = '1');
  const escaped = t.dataset.esc;
  delete t.dataset.esc;
  const { selectionStart: a, selectionEnd: b, value } = t;
  const lineStart = value.lastIndexOf('\n', a - 1) + 1;
  const put = (next: string, caret: number) => {
    e.preventDefault();
    t.value = next; // ya en el DOM: React no mueve el cursor al final al pintar el mismo valor
    t.setSelectionRange(caret, caret);
    set(next);
  };
  if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
    const lead = `\n${value.slice(lineStart).match(/^[ \t]*/)![0]}`;
    return put(value.slice(0, a) + lead + value.slice(b), a + lead.length);
  }
  if (e.key !== 'Tab' || escaped || e.ctrlKey || e.altKey || e.metaKey) return;
  const removed = e.shiftKey ? value.slice(lineStart, lineStart + 4).match(/^ */)![0].length : 0;
  const next = e.shiftKey ? value.slice(0, lineStart) + value.slice(lineStart + removed) : `${value.slice(0, a)}    ${value.slice(b)}`;
  const caret = e.shiftKey ? Math.max(lineStart, a - removed) : a + 4;
  put(next, caret);
}
