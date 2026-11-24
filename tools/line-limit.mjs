// Lógica pura de la regla de 250 líneas, separada para poder probarla.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, extname, sep } from 'node:path';

export function countLines(text) {
  if (text.length === 0) return 0;
  const lines = text.split('\n');
  return text.endsWith('\n') ? lines.length - 1 : lines.length;
}

export function listFiles(root, config, dir = root) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = relative(root, full).split(sep).join('/');
    if (statSync(full).isDirectory()) {
      if (config.ignoreDirs.includes(rel) || config.ignoreDirs.includes(name)) continue;
      out.push(...listFiles(root, config, full));
    } else if (config.extensions.includes(extname(name)) && !(rel in config.ignoreFiles)) {
      out.push(rel);
    }
  }
  return out;
}

export function findViolations(root, config) {
  return listFiles(root, config)
    .map((file) => ({ file, lines: countLines(readFileSync(join(root, file), 'utf8')) }))
    .filter((r) => r.lines > config.maxLines)
    .sort((a, b) => b.lines - a.lines);
}
