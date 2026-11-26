/** Error del pseudocódigo con su línea (1 = primera), para mostrarlo en español. */
export class PseudoError extends Error {
  constructor(public line: number, message: string) {
    super(message);
  }
}

const TOKEN = /"[^"]*"|'[^']*'|\d+(?:\.\d+)?|[A-Za-z_áéíóúñÁÉÍÓÚÑ][\wáéíóúñÁÉÍÓÚÑ]*|<-|←|<=|>=|!=|<>|==|\*\*|\/\/|\S/g;

// Palabras del pseudocódigo que en Python se escriben distinto.
const WORDS: Record<string, string> = {
  true: 'True', false: 'False', null: 'None', mod: '%', div: '//', new: '',
};
// Funciones del pseudocódigo que corren con una ayuda del preludio (ver prelude.ts).
const CALLS: Record<string, string> = { array: '_array', stack: '_Stack', random: '_random' };

/** Separa en piezas; las comillas tipográficas de Word/Docs cuentan como comillas normales. */
export function tokens(src: string): string[] {
  return src.replace(/[“”]/g, '"').replace(/[‘’]/g, "'").match(TOKEN) ?? [];
}

/** Une las piezas con espacios solo donde se leen bien: `v[i] + 1`, `len(v)`, `pila.push(x)`. */
function join(parts: string[]): string {
  return parts.map((p, i) => {
    const prev = parts[i - 1];
    const tight = i === 0 || /^[.,)\]]$/.test(p) || /^[.([]$/.test(prev) || (/^[([]$/.test(p) && /[\w)\]]$/.test(prev));
    return (tight ? '' : ' ') + p;
  }).join('');
}

/**
 * Traduce una expresión: `=` compara, `mod`/`div`, `not`, `True`, `new Array(n)`, `v.len`.
 * Los nombres no distinguen mayúsculas (`Largo` y `largo` son la misma variable), como en los labs.
 */
export function expr(src: string, line: number): string {
  const t = tokens(src.replace(/([\w\]]+(?:\[[^\]]*\])*)\.(len|length)\b(?!\s*\()/gi, 'len($1)'));
  if (!t.length) throw new PseudoError(line, 'falta una expresión');
  const out = t.map((p, i) => {
    if (p.startsWith('"') || p.startsWith("'")) return p;
    if (p === '==') throw new PseudoError(line, 'en pseudocódigo se compara con un solo `=` (no `==`)');
    if (p === '←' || p === '<-') throw new PseudoError(line, 'la flecha ← solo va para asignar: `variable ← valor`');
    if (p === '=') return '==';
    if (p === '<>') return '!=';
    if (p === '^') return '**';
    if (!/^[A-Za-z_áéíóúñÁÉÍÓÚÑ]/.test(p)) return p;
    const low = p.toLowerCase();
    if (t[i + 1] === '(' && CALLS[low]) return CALLS[low];
    return WORDS[low] ?? low;
  });
  return join(out.filter(Boolean));
}

/** Separa por comas que no estén dentro de paréntesis, corchetes o comillas: `a, v[i, j], "x, y"`. */
export function splitArgs(src: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let quote = '';
  let cur = '';
  for (const c of src.replace(/[“”]/g, '"').replace(/[‘’]/g, "'")) {
    if (quote) quote = c === quote ? '' : quote;
    else if (c === '"' || c === "'") quote = c;
    else if ('([{'.includes(c)) depth++;
    else if (')]}'.includes(c)) depth--;
    else if (c === ',' && depth === 0) {
      parts.push(cur);
      cur = '';
      continue;
    }
    cur += c;
  }
  return [...parts, cur].map((s) => s.trim()).filter(Boolean);
}

/** Posición de la flecha de asignación fuera de comillas, o -1. */
export function arrowAt(src: string): number {
  const s = src.replace(/[“”]/g, '"').replace(/[‘’]/g, "'"); // mismo largo: las posiciones coinciden
  let quote = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (quote) quote = c === quote ? '' : quote;
    else if (c === '"' || c === "'") quote = c;
    else if (c === '←' || (c === '<' && s[i + 1] === '-')) return i;
  }
  return -1;
}
