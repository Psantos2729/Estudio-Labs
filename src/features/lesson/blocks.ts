export type Block = { kind: 'md'; text: string } | { kind: 'python'; code: string };

/** Separa la lección en texto markdown y bloques ```python que el estudiante puede correr. */
export function splitBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  const parts = body.split(/^```python[ \t]*\n([\s\S]*?)^```[ \t]*$/m);
  parts.forEach((part, i) => {
    if (i % 2 === 1) blocks.push({ kind: 'python', code: part.trimEnd() });
    else if (part.trim()) blocks.push({ kind: 'md', text: part });
  });
  return blocks;
}
