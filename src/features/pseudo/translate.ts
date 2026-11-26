import { PseudoError, arrowAt, expr, splitArgs, tokens } from './expr';
import { PRELUDE } from './prelude';

export { PseudoError };
type Kind = 'begin' | 'function' | 'if' | 'for' | 'while';
interface Open { kind: Kind; line: number; hasBody: boolean; hasElse?: boolean }

const CLOSER: Record<Kind, string> = {
  begin: 'end', function: 'end function', if: 'end if', for: 'end for', while: 'end while',
};

/** Hábitos de Python que no van en pseudocódigo, con lo que se escribe en su lugar. */
const HABITS: [RegExp, string][] = [
  [/^(print)\s*\(/i, 'para mostrar se usa `write` (no `print`)'],
  [/^\w+\s*=\s*input\s*\(|^input\s*\(/i, 'para pedir datos se usa `read variable` (no `input`)'],
  [/^(def|elif)\b/i, 'eso es Python: usa `Function nombre(…)` o `else if`'],
  [/:$/, 'en pseudocódigo no van dos puntos al final; el bloque se cierra con su `end`'],
  [/\brange\s*\(/i, 'el for se escribe `for i ← inicio to final` (sin `range`)'],
];

/**
 * Traduce el pseudocódigo de los labs a Python, una línea por línea: la línea N de uno es la
 * línea N del otro. Lanza PseudoError (en español, con la línea) si la estructura no cierra.
 */
export function toPython(src: string): string {
  const lines = src.replace(/\r/g, '').split('\n');
  const open: Open[] = [];
  let hasMain = false;
  let hasFunction = false;
  const out = lines.map((raw, i) => {
    const n = i + 1;
    const text = stripComment(raw).trim();
    if (!text) return '';
    const pad = '    '.repeat(open.length);
    const top = open.at(-1);
    const word = text.toLowerCase().replace(/\s+/g, ' ');

    if (word === 'begin') {
      if (top) return `${pad}pass`; // `begin` después de while/for/if: opcional
      if (hasMain) throw new PseudoError(n, 'solo puede haber un `Begin` (el programa principal)');
      hasMain = true;
      open.push({ kind: 'begin', line: n, hasBody: false });
      return 'def _main():';
    }
    const fn = text.match(/^function\s+([\wáéíóúñ]+)\s*\((.*)\)$/i);
    if (fn) {
      if (top) throw new PseudoError(n, `una Function no puede ir dentro de otro bloque: antes cierra el \`${top.kind}\` de la línea ${top.line}`);
      hasFunction = true;
      open.push({ kind: 'function', line: n, hasBody: false });
      return `def ${fn[1].toLowerCase()}(${splitArgs(fn[2]).map((p) => expr(p, n)).join(', ')}):`;
    }
    if (/^function\b/i.test(text)) throw new PseudoError(n, 'una función se escribe `Function nombre(parámetros)`');
    const end = word.match(/^end ?(if|for|while|function|begin)?$/);
    if (end) return close(open, end[1] as Kind | undefined, n);
    if (!top) throw new PseudoError(n, 'esta línea está fuera del programa: todo va entre `Begin` y `End` (o dentro de una Function)');
    for (const [re, msg] of HABITS) if (re.test(text)) throw new PseudoError(n, msg);

    const elseIf = text.match(/^else\s*if\s+(.+?)(\s+then)?$/i);
    if (elseIf || word === 'else') {
      if (top.kind !== 'if') throw new PseudoError(n, '`else` sin su `if`');
      if (!top.hasBody) throw new PseudoError(n, `el \`if\` de la línea ${top.line} no tiene acciones antes de este \`else\``);
      if (top.hasElse) throw new PseudoError(n, 'después de `else` ya no puede ir otro `else`');
      top.hasElse = !elseIf;
      top.hasBody = false;
      return elseIf ? `${pad.slice(4)}elif ${expr(elseIf[1], n)}:` : `${pad.slice(4)}else:`;
    }
    top.hasBody = true;
    return pad + statement(text, n, open);
  });
  const last = open.at(-1);
  if (last) throw new PseudoError(last.line, `falta \`${CLOSER[last.kind]}\` para cerrar este \`${last.kind === 'begin' ? 'Begin' : last.kind}\``);
  if (!hasMain && !hasFunction) throw new PseudoError(1, 'el programa empieza con `Begin` o con `Function nombre(parámetros)`');
  return `${out.join('\n')}\n${PRELUDE}${hasMain ? '\n_main()\n' : ''}`;
}

/** `end`, `end if`, `endfor`…: debe cerrar el bloque abierto más reciente. */
function close(open: Open[], kind: Kind | undefined, n: number): string {
  const top = open.at(-1);
  if (!top) throw new PseudoError(n, 'este `end` no cierra nada');
  const ok = kind ? kind === top.kind || (kind === 'begin' && top.kind === 'begin') : top.kind === 'begin' || top.kind === 'function';
  if (!ok) {
    const what = top.kind === 'begin' ? 'Begin' : top.kind;
    throw new PseudoError(n, `falta \`${CLOSER[top.kind]}\` para el \`${what}\` de la línea ${top.line} (cierra primero el bloque de adentro)`);
  }
  open.pop();
  return `${'    '.repeat(open.length + 1)}pass`;
}

/** Una instrucción dentro de un bloque: if, for, while, read, write, return, asignación o llamada. */
function statement(text: string, n: number, open: Open[]): string {
  const push = (kind: Kind) => open.push({ kind, line: n, hasBody: false });
  let m = text.match(/^if\s+(.+?)(\s+then)?$/i);
  if (m) return push('if'), `if ${expr(m[1], n)}:`;
  m = text.match(/^while\s+(.+?)(\s+do)?$/i);
  if (m) return push('while'), `while ${expr(m[1], n)}:`;
  if (/^for\b/i.test(text)) {
    m = text.match(/^for\s+([\wáéíóúñ]+)\s*(?:←|<-|=)\s*(.+?)\s+to\s+(.+?)(?:\s+step\s+(.+))?$/i);
    if (!m) throw new PseudoError(n, 'el for se escribe `for i ← inicio to final` (y si quieres, `step n`)');
    push('for');
    const step = m[4] ? `, ${expr(m[4], n)}` : '';
    return `for ${m[1].toLowerCase()} in _rng(${expr(m[2], n)}, ${expr(m[3], n)}${step}):`;
  }
  m = text.match(/^read\s+(.+)$/i);
  if (m) {
    const vars = splitArgs(m[1]).map((v) => expr(v, n));
    return `${vars.join(', ')} = ${vars.map(() => '_read()').join(', ')}`;
  }
  m = text.match(/^(write|return)\b\s*(.*)$/i);
  if (m) {
    const args = splitArgs(m[2]).map((a) => expr(a, n));
    if (m[1].toLowerCase() === 'return') return args.length ? `return ${args.join(', ')}` : 'return';
    return args.length > 1 ? `print(${args.join(', ')}, sep='')` : `print(${args.join('')})`;
  }
  const arrow = arrowAt(text);
  if (arrow >= 0) {
    const lhs = text.slice(0, arrow);
    const rhs = text.slice(arrow + (text[arrow] === '←' ? 1 : 2));
    if (tokens(lhs).includes('=')) throw new PseudoError(n, 'a la izquierda de ← va solo la variable');
    return `${splitArgs(lhs).map((v) => expr(v, n)).join(', ')} = ${splitArgs(rhs).map((v) => expr(v, n)).join(', ')}`;
  }
  if (tokens(text).includes('=')) throw new PseudoError(n, 'para asignar se usa ← (o `<-`); el `=` es para comparar');
  return expr(text, n);
}

/** Quita un comentario `//` que no esté dentro de comillas. */
function stripComment(line: string): string {
  const i = line.search(/\/\/(?=(?:[^"]*"[^"]*")*[^"]*$)/);
  return i < 0 ? line : line.slice(0, i);
}
