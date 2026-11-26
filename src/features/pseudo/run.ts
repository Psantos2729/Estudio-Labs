import { runPython, type RunResult } from '@/features/runner/runner';
import { PRELUDE } from './prelude';
import { PseudoError, toPython } from './translate';

export type Lang = 'python' | 'pseudo';

/** Python traducido sin las ayudas del final, para el botón "Ver en Python"; o el error en español. */
export function preview(src: string): { python?: string; error?: string } {
  try {
    return { python: toPython(src).split(PRELUDE)[0].trimEnd() };
  } catch (e) {
    if (e instanceof PseudoError) return { error: `Línea ${e.line}: ${e.message}` };
    throw e;
  }
}

/** Corre Python tal cual, o pseudocódigo ya traducido. Un error de estructura no llega a Python. */
export async function runCode(code: string, lang: Lang | undefined, stdin = '', opts: Parameters<typeof runPython>[2] = {}): Promise<RunResult> {
  if (lang !== 'pseudo') return runPython(code, stdin, opts);
  const { error } = preview(code);
  return error ? { stdout: '', error } : runPython(toPython(code), stdin, opts);
}
