import type { TestCase } from '@/content/types';
import { runPython, type RunResult } from './runner';

export interface TestResult {
  test: TestCase;
  run: RunResult;
  passed: boolean;
}

/** Igual que un corrector humano: ignora espacios al final de cada línea y líneas vacías al final. */
export function sameOutput(actual: string, expected: string): boolean {
  const norm = (s: string) => s.replace(/\r\n/g, '\n').split('\n').map((l) => l.trimEnd()).join('\n').trimEnd();
  return norm(actual) === norm(expected);
}

/** Corre el código contra cada prueba pública, en orden. */
export async function runTests(code: string, tests: TestCase[]): Promise<TestResult[]> {
  const results: TestResult[] = [];
  for (const test of tests) {
    const run = await runPython(code, test.stdin);
    results.push({ test, run, passed: !run.error && sameOutput(run.stdout, test.stdout) });
  }
  return results;
}
