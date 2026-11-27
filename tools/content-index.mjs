// Plugin de Vite: índice liviano del contenido (ids y títulos) para la portada y el mapa.
// El texto completo de lecciones y ejercicios solo baja al abrir una lección o un ejercicio.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ID = 'virtual:content-index';

export function contentIndex(root = join(process.cwd(), 'content')) {
  return {
    name: 'content-index',
    resolveId: (id) => (id === ID ? `\0${ID}` : undefined),
    load(id) {
      if (id !== `\0${ID}`) return;
      // shortcut: en `npm run dev` una lección o ejercicio NUEVO pide reiniciar el servidor; editar uno existente se ve al instante.
      const read = (p) => (this.addWatchFile(p), readFileSync(p, 'utf8'));
      const lessons = [], exercises = [];
      for (const dir of readdirSync(root).filter((d) => /^M\d/.test(d))) {
        for (const f of readdirSync(join(root, dir, 'lessons')).filter((f) => f.endsWith('.md'))) {
          const title = read(join(root, dir, 'lessons', f)).split('\n')[0].replace(/^# /, '').trim();
          lessons.push({ id: `${dir.slice(0, 3)}-L${f.slice(0, 2)}`, moduleId: dir.slice(0, 3), title });
        }
        for (const f of readdirSync(join(root, dir, 'exercises')).filter((f) => f.endsWith('.json'))) {
          const e = JSON.parse(read(join(root, dir, 'exercises', f)));
          exercises.push({ id: e.id, title: e.title, ...(e.challenge && { challenge: true }) });
        }
      }
      const byId = (a, b) => a.id.localeCompare(b.id);
      return `export default ${JSON.stringify({ lessons: lessons.sort(byId), exercises: exercises.sort(byId) })};`;
    },
  };
}
