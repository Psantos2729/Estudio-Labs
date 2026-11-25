import type { TestCase } from '@/content/types';
import { runPython, type RunResult } from './runner';

export interface TestResult {
  test: TestCase;
  run: RunResult;
  passed: boolean;
}

/**
 * Pasa si las líneas esperadas aparecen seguidas en la salida. No cuentan las líneas en blanco,
 * los espacios al final de cada línea ni el texto extra antes o después (p. ej. un título).
 */
export function sameOutput(actual: string, expected: string): boolean {
  const lines = (s: string) => `\n${s.split('\n').map((l) => l.trimEnd()).filter(Boolean).join('\n')}\n`;
  return lines(actual).includes(lines(expected));
}

/** Corre el código contra cada prueba pública, en orden. Los mensajes de input("...") no cuentan. */
export async function runTests(code: string, tests: TestCase[]): Promise<TestResult[]> {
  const results: TestResult[] = [];
  for (const test of tests) {
    const run = await runPython(code, test.stdin, { quietPrompts: true, files: test.files });
    results.push({ test, run, passed: !run.error && sameOutput(run.stdout, test.stdout) });
  }
  return results;
}
