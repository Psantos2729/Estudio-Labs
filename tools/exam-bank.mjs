// Genera el .sql del banco oculto del examen (ADR-006) desde private/exam/MXX/gen.py.
// Uso: node tools/exam-bank.mjs M00 M01 > private/exam/banco-examen.sql
// gen.py imprime JSON: { problems: [{ id, title, statement, solution, inputs }],
//   cada entrada es el texto de stdin o { stdin, files } con archivos dados (M08, migración 015);
//                        questions: [{ question, code?, options, answer }] }
// Las salidas esperadas salen de correr `solution` en el mismo Pyodide del navegador.
// Falla si una solución da error o si la respuesta de un "¿qué imprime?" no es lo que imprime `code`.
import { execFileSync } from 'node:child_process';
import { loadPyodide } from 'pyodide';
import { execute } from '../src/features/runner/execute.ts';

const modules = process.argv.slice(2);
if (!modules.length || modules.some((m) => !/^M\d{2}$/.test(m))) {
  console.error('Uso: node tools/exam-bank.mjs M00 M01 ...');
  process.exit(1);
}

const py = await loadPyodide();
const norm = (s) => s.replace(/\r\n/g, '\n').split('\n').map((l) => l.trimEnd()).join('\n').trimEnd();
const q = (s) => (s == null ? 'null' : `'${String(s).replaceAll("'", "''")}'`);
const arr = (xs) => `array[${xs.map(q).join(', ')}]`;

async function run(code, stdin, what, files = {}) {
  const r = await execute(py, code, stdin, true, files);
  if (r.error) throw new Error(`${what} falló con ${JSON.stringify({ stdin, files })}:\n${r.error}`);
  return r.stdout;
}

const out = ['-- Banco oculto del examen. GENERADO por tools/exam-bank.mjs: NO subir al repo.', 'begin;'];
out.push(`delete from public.exam_items where module_id in (${modules.map(q).join(', ')});`);
out.push(`delete from public.exam_problems where module_id in (${modules.map(q).join(', ')});`);
const counts = [];

for (const mod of modules) {
  const bank = JSON.parse(execFileSync('python3', ['-I', `private/exam/${mod}/gen.py`], { encoding: 'utf8' }));
  let cases = 0;
  for (const p of bank.problems) {
    if (!p.id.startsWith(`${mod}-X`)) throw new Error(`${p.id} no pertenece a ${mod}`);
    out.push(`insert into public.exam_problems (id, module_id, title, statement) values (${q(p.id)}, ${q(mod)}, ${q(p.title)}, ${q(p.statement)});`);
    for (const key of new Set(p.inputs.map((i) => JSON.stringify(typeof i === 'string' ? { stdin: i } : i)))) {
      const { stdin = '', files } = JSON.parse(key);
      const expected = await run(p.solution, stdin, p.id, files);
      if (!norm(expected)) throw new Error(`${p.id} no imprime nada con ${key}`);
      const f = files ? `${q(JSON.stringify(files))}::jsonb` : 'null';
      out.push(`insert into public.exam_items (module_id, problem_id, stdin, files, answer) values (${q(mod)}, ${q(p.id)}, ${q(stdin)}, ${f}, ${q(expected)});`);
      cases++;
    }
  }
  for (const item of bank.questions) {
    if (!(item.answer >= 0 && item.answer < item.options.length)) throw new Error(`Respuesta inválida: ${item.question}`);
    if (new Set(item.options).size !== item.options.length) throw new Error(`Opciones repetidas: ${item.question}`);
    let text = item.question;
    if (item.code != null) {
      const printed = await run(item.code, '', item.question);
      if (norm(printed) !== norm(item.options[item.answer])) {
        throw new Error(`"${item.question}" imprime ${JSON.stringify(printed)}, no la opción marcada`);
      }
      text += '\n\n```python\n' + item.code.trimEnd() + '\n```';
    }
    out.push(`insert into public.exam_items (module_id, question, options, answer) values (${q(mod)}, ${q(text)}, ${arr(item.options)}, ${q(item.answer)});`);
  }
  counts.push(`${mod}: ${bank.problems.length} problemas, ${cases} casos, ${bank.questions.length} preguntas`);
}

out.push('commit;');
console.log(out.join('\n'));
console.error(counts.join('\n'));
