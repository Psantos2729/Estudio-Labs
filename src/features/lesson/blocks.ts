export type Step = { values: string[]; marks: Record<number, string>; note: string };
export type Block =
  | { kind: 'md'; text: string }
  | { kind: 'python'; code: string }
  | { kind: 'steps'; steps: Step[] };

/** Separa la lección en markdown, bloques ```python que se corren y bloques ```pasos que se recorren paso a paso. */
export function splitBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  const parts = body.split(/^```(python|pasos)[ \t]*\n([\s\S]*?)^```[ \t]*$/m);
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i].trim()) blocks.push({ kind: 'md', text: parts[i] });
    if (i + 2 >= parts.length) break;
    const code = parts[i + 2].trimEnd();
    blocks.push(parts[i + 1] === 'python' ? { kind: 'python', code } : { kind: 'steps', steps: parseSteps(code) });
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
