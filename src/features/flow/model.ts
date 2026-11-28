// Diagrama de flujo estructurado: una lista de bloques; decisiones y ciclos llevan sus bloques adentro.
// Así siempre queda bien conectado y se traduce directo al pseudocódigo de los labs.
export type Simple = { kind: 'read' | 'process' | 'write'; text: string };
export type Branch = { kind: 'if'; text: string; yes: Block[]; no: Block[] };
export type Loop = { kind: 'while' | 'for'; text: string; body: Block[] };
export type Block = Simple | Branch | Loop;
export type Kind = Block['kind'];

export const LABEL: Record<Kind, string> = {
  read: 'Entrada (read)', process: 'Proceso (←)', write: 'Salida (write)',
  if: 'Decisión (if)', while: 'Ciclo mientras (while)', for: 'Ciclo para (for)',
};
const PLACEHOLDER: Record<Kind, string> = {
  read: 'n', process: 'x ← 0', write: '"Hola"', if: 'n > 0', while: 'n > 0', for: 'i ← 1 to n',
};

export function newBlock(kind: Kind): Block {
  const text = PLACEHOLDER[kind];
  if (kind === 'if') return { kind, text, yes: [], no: [] };
  if (kind === 'while' || kind === 'for') return { kind, text, body: [] };
  return { kind, text };
}

/** Texto que se ve dentro de la figura (y la línea del pseudocódigo, sin sangría). */
export function caption(b: Block): string {
  if (b.kind === 'read' || b.kind === 'write' || b.kind === 'for') return `${b.kind} ${b.text}`;
  if (b.kind === 'while') return `while ${b.text}`;
  return b.text;
}

/** El diagrama en pseudocódigo bien sangrado (4 espacios por nivel), listo para el traductor. */
export function toPseudo(blocks: Block[]): string {
  const out = ['Begin'];
  const walk = (list: Block[], depth: number) => {
    const pad = '    '.repeat(depth);
    for (const b of list) {
      if (b.kind === 'if') {
        // Una decisión sola en la rama No se escribe `else if`, como en los labs: un solo `end if`.
        let d: Branch = b;
        out.push(`${pad}if ${d.text.trim()}`);
        walk(d.yes, depth + 1);
        while (d.no.length === 1 && d.no[0].kind === 'if') {
          d = d.no[0];
          out.push(`${pad}else if ${d.text.trim()}`);
          walk(d.yes, depth + 1);
        }
        if (d.no.length) {
          out.push(`${pad}else`);
          walk(d.no, depth + 1);
        }
        out.push(`${pad}end if`);
      } else if (b.kind === 'while' || b.kind === 'for') {
        out.push(`${pad}${b.kind} ${b.text.trim()}`);
        walk(b.body, depth + 1);
        out.push(`${pad}end ${b.kind}`);
      } else out.push(pad + caption({ ...b, text: b.text.trim() }));
    }
  };
  walk(blocks, 1);
  return [...out, 'End', ''].join('\n');
}

/** Lo que guarda el intento (notes.flow); si viene roto o de otra versión, empieza vacío. */
export function parseFlow(raw: string | undefined): Block[] {
  try {
    const v = JSON.parse(raw ?? '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

/** Dónde está una lista de bloques: el camino de (índice, rama) desde la raíz; [] es la raíz. */
export type Addr = { i: number; key: 'yes' | 'no' | 'body' }[];

function listAt(root: Block[], addr: Addr): Block[] {
  return addr.reduce<Block[]>((list, { i, key }) => (list[i] as unknown as Record<string, Block[]>)[key], root);
}

/** Copia el diagrama y aplica `change` a la lista en `addr` (el estado de React no se muta). */
export function editList(root: Block[], addr: Addr, change: (list: Block[]) => void): Block[] {
  const copy = structuredClone(root);
  change(listAt(copy, addr));
  return copy;
}

export const blockAt = (root: Block[], addr: Addr, i: number): Block | undefined => listAt(root, addr)[i];

/** ¿Dicen lo mismo? Sin contar mayúsculas, espacios, líneas vacías ni comentarios; `<-` vale como ←. */
export function samePseudo(a: string, b: string): boolean {
  const norm = (s: string) => s.replace(/\/\/.*$/gm, '').replace(/<-/g, '←').toLowerCase()
    .split('\n').map((l) => l.replace(/\s+/g, '')).filter(Boolean).join('\n');
  return norm(a) === norm(b);
}
