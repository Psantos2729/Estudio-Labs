import { describe, expect, it } from 'vitest';
import { buildAnswers } from './answers';
import type { Exam } from './types';

const exam: Exam = {
  attempt_id: 1, module_id: 'M00', expires_at: '',
  problems: [{ id: 'M00-X01', title: '', statement: '', cases: [{ id: 10, stdin: '2' }, { id: 11, stdin: '3' }] },
             { id: 'M00-X02', title: '', statement: '', cases: [{ id: 12, stdin: 'a' }] }],
  questions: [{ id: 20, question: '', options: ['a', 'b'] }, { id: 21, question: '', options: ['a', 'b'] }],
};

describe('buildAnswers', () => {
  it('corre el código de cada problema con sus entradas y agrega las preguntas contestadas', async () => {
    const run = async (code: string, stdin: string) => ({ stdout: `${code}:${stdin}` });
    const a = await buildAnswers(exam, { 'M00-X01': 'uno' }, { 20: 1 }, run);
    expect(a).toEqual({ 10: 'uno:2', 11: 'uno:3', 12: ':a', 20: '1' });
  });

  it('tras 2 casos que se pasaron de tiempo no corre los demás de ese problema', async () => {
    const big: Exam = { ...exam, problems: [{ ...exam.problems[0], cases: [1, 2, 3, 4].map((n) => ({ id: n, stdin: String(n) })) }] };
    const calls: string[] = [];
    const run = async (code: string, stdin: string) => {
      calls.push(stdin);
      return code === 'ciclo' ? { stdout: 'a medias', timedOut: true } : { stdout: 'ok' };
    };
    const a = await buildAnswers(big, { 'M00-X01': 'ciclo' }, {}, run);
    expect(calls).toEqual(['1', '2']);
    expect(a).toEqual({ 1: 'a medias', 2: 'a medias', 3: '', 4: '' });
  });
});
