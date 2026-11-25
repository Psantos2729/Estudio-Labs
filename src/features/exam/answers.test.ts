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
});
