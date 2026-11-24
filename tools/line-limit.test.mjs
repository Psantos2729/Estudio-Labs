import { describe, expect, it } from 'vitest';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { countLines, findViolations } from './line-limit.mjs';

const config = { maxLines: 3, extensions: ['.ts'], ignoreDirs: ['skip'], ignoreFiles: { 'gen.ts': 'generado' } };

describe('countLines', () => {
  it('cuenta líneas con y sin salto final', () => {
    expect(countLines('')).toBe(0);
    expect(countLines('a\nb\n')).toBe(2);
    expect(countLines('a\nb')).toBe(2);
  });
});

describe('findViolations', () => {
  it('reporta solo archivos largos que no están excluidos', () => {
    const root = mkdtempSync(join(tmpdir(), 'lines-'));
    const long = 'x\n'.repeat(5);
    writeFileSync(join(root, 'largo.ts'), long);
    writeFileSync(join(root, 'corto.ts'), 'x\n');
    writeFileSync(join(root, 'gen.ts'), long);
    writeFileSync(join(root, 'notas.md'), long);
    mkdirSync(join(root, 'skip'));
    writeFileSync(join(root, 'skip', 'largo.ts'), long);
    expect(findViolations(root, config)).toEqual([{ file: 'largo.ts', lines: 5 }]);
  });
});
