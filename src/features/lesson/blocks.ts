export type Step = { values: string[]; marks: Record<number, string>; note: string };
export type Grid = { label: string; rows: string[][] };
export type GridStep = { grids: Grid[]; marks: Record<string, string>; note: string };
export type Block =
  | { kind: 'md'; text: string }
  | { kind: 'python' | 'pseudo'; code: string }
  | { kind: 'steps'; steps: Step[] }
  | { kind: 'grid'; steps: GridStep[] };

/** Separa la lección en markdown, bloques ```python y ```pseudo que se corren y bloques ```pasos o ```matriz que se recorren paso a paso. */
export function splitBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  const parts = body.split(/^```(python|pseudo|pasos|matriz)[ \t]*\n([\s\S]*?)^```[ \t]*$/m);
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i].trim()) blocks.push({ kind: 'md', text: parts[i] });
    if (i + 2 >= parts.length) break;
    const code = parts[i + 2].trimEnd();
    const kind = parts[i + 1];
    blocks.push(kind === 'python' || kind === 'pseudo' ? { kind, code } : kind === 'pasos' ? { kind: 'steps', steps: parseSteps(code) } : { kind: 'grid', steps: parseGrid(code) });
  }
  return blocks;
}

/**
 * Una línea por paso: `valores | marcas | nota`. Las marcas son letra + posición (`c0 c1 o4`):
 * c comparando, i intercambio, o en su lugar, k clave o encontrado, x descartado.
 */
export function parseSteps(text: string): Step[] {
  return text.split('\n').filter((l) => l.trim()).map((line) => {
    const [values = '', marks = '', ...note] = line.split('|');
    const m: Record<number, string> = {};
    for (const t of marks.trim().split(/\s+/).filter(Boolean)) m[Number(t.slice(1))] = t[0];
    return { values: values.trim().split(/\s+/).filter(Boolean), marks: m, note: note.join('|').trim() };
  });
}

/**
 * Como `pasos`, pero con matrices: `A: 1 2 / 3 4 || B: 5 6 / 7 8 | c0:1.0 k1:0.1 | nota`.
 * `||` separa matrices, `/` separa filas y la etiqueta (`A:`) es opcional. Cada marca es
 * letra + matriz:fila.columna; sin `matriz:` es la primera (`c1.0`).
 */
export function parseGrid(text: string): GridStep[] {
  return text.split('\n').filter((l) => l.trim()).map((line) => {
    const [values = '', marks = '', ...note] = line.split(/(?<!\|)\|(?!\|)/); // `|` separa, `||` no
    const grids = values.split('||').map((g) => {
      const label = g.trim().match(/^(\S+):\s/)?.[1] ?? '';
      const body = label ? g.trim().slice(label.length + 1) : g;
      return { label, rows: body.split('/').map((r) => r.trim().split(/\s+/).filter(Boolean)) };
    });
    const m: Record<string, string> = {};
    for (const t of marks.trim().split(/\s+/).filter(Boolean)) m[t.includes(':') ? t.slice(1) : `0:${t.slice(1)}`] = t[0];
    return { grids, marks: m, note: note.join('|').trim() };
  });
}
