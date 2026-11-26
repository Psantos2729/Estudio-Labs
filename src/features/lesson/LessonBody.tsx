import { Fragment } from 'react';
import { marked } from 'marked';
import type { Block } from './blocks';
import { RunnableCode } from './RunnableCode';
import { GridViewer, StepViewer } from './StepViewer';

/** El cuerpo de una lección (o de la guía): markdown, código que se corre y visores paso a paso. */
export function LessonBody({ blocks }: { blocks: Block[] }) {
  return (
    <article className="prose">
      {blocks.map((b, k) => (
        <Fragment key={k}>
          {'code' in b ? (
            <RunnableCode initial={b.code} pseudo={b.kind === 'pseudo'} />
          ) : b.kind === 'steps' ? (
            <StepViewer steps={b.steps} />
          ) : b.kind === 'grid' ? (
            <GridViewer steps={b.steps} />
          ) : (
            // El markdown viene de content/ en este repo, no del usuario.
            <div dangerouslySetInnerHTML={{ __html: marked.parse(b.text, { async: false }) }} />
          )}
        </Fragment>
      ))}
    </article>
  );
}
