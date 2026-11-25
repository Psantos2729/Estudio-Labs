import type { OutFile } from '@/features/runner/runner';
import { Button } from '@/ui/primitives/Button';

type Files = Record<string, string>;

/** Archivos que ya están en la carpeta cuando corre el programa (M08). Se pueden cambiar, agregar o quitar. */
export function GivenFiles({ files, onChange }: { files: Files; onChange: (f: Files) => void }) {
  const names = Object.keys(files);
  const rename = (old: string, name: string) =>
    onChange(Object.fromEntries(Object.entries(files).map(([k, v]) => [k === old ? name : k, v])));
  const add = () => {
    let n = names.length + 1;
    while (`datos${n}.txt` in files) n++;
    onChange({ ...files, [`datos${n}.txt`]: '' });
  };
  return (
    <div className="files">
      <span className="muted small">archivos en la carpeta al empezar</span>
      {names.map((name) => (
        <div key={name} className="files__item">
          <div className="files__head">
            <input className="input files__name" aria-label="nombre del archivo" value={name}
              onChange={(e) => rename(name, e.target.value)} />
            <Button variant="ghost" aria-label={`quitar ${name}`} onClick={() => {
              const rest = { ...files };
              delete rest[name];
              onChange(rest);
            }}>×</Button>
          </div>
          <textarea className="input field__text files__text" aria-label={`contenido de ${name}`} spellCheck={false}
            rows={Math.min(8, files[name].split('\n').length + 1)} value={files[name]}
            onChange={(e) => onChange({ ...files, [name]: e.target.value })} />
        </div>
      ))}
      <Button variant="ghost" onClick={add}>+ archivo</Button>
    </div>
  );
}

/** Los archivos que el programa creó o cambió. Los que quedaron igual que al empezar no se muestran. */
export function OutFiles({ files, given = {} }: { files?: OutFile[]; given?: Files }) {
  const changed = (files ?? []).filter((f) => f.binary || given[f.name] !== f.text);
  if (!changed.length) return null;
  return (
    <div className="files" aria-live="polite">
      <span className="muted small">archivos que dejó tu programa</span>
      {changed.map((f) => (
        <div key={f.name} className="files__item">
          <span className="accent small">{f.name}{f.binary ? ' (binario, en hexadecimal)' : ''}</span>
          <pre className="files__out">{f.text || '(vacío)'}</pre>
        </div>
      ))}
    </div>
  );
}
