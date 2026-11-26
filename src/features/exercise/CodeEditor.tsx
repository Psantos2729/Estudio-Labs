import { useEffect, useRef } from 'react';

interface Props {
  initial: string;
  onChange: (code: string) => void;
  pseudo?: boolean; // pseudocódigo: `<-` se vuelve ←
}

/** Editor de Python (CodeMirror 6). Se carga aparte para no pesar en el mapa ni en las lecciones. */
export function CodeEditor({ initial, onChange, pseudo = false }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const changed = useRef(onChange);
  changed.current = onChange;

  useEffect(() => {
    let destroy = () => {};
    let cancelled = false;
    Promise.all([
      import('codemirror'),
      import('@codemirror/lang-python'),
      import('@codemirror/theme-one-dark'),
      import('@codemirror/view'),
      import('@codemirror/commands'),
    ]).then(([{ EditorView, basicSetup }, { python }, { oneDark }, view, { indentWithTab }]) => {
      if (cancelled || !host.current) return;
      const editor = new EditorView({
        doc: initial,
        parent: host.current,
        extensions: [
          basicSetup,
          python(), // también en pseudocódigo: colorea if/while/and y hace que Tab indente 4 espacios
          pseudo ? EditorView.inputHandler.of((v, from, to, text) => {
            if (text !== '-' || v.state.sliceDoc(from - 1, from) !== '<') return false;
            v.dispatch({ changes: { from: from - 1, to, insert: '←' }, selection: { anchor: from } });
            return true;
          }) : [],
          oneDark,
          view.keymap.of([indentWithTab]), // Tab indenta (en Python importa); Esc y luego Tab sale del editor
          EditorView.contentAttributes.of({ 'aria-label': pseudo ? 'Editor de pseudocódigo' : 'Editor de código Python' }),
          EditorView.updateListener.of((u) => u.docChanged && changed.current(u.state.doc.toString())),
        ],
      });
      destroy = () => editor.destroy();
    });
    return () => {
      cancelled = true;
      destroy();
    };
  }, [initial, pseudo]);

  return <div ref={host} className="editor" />;
}
