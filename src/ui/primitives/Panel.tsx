import type { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'aside' | 'div';
  tone?: 'default' | 'warn';
}

export function Panel({ as: Tag = 'section', tone = 'default', className = '', ...rest }: Props) {
  return <Tag className={`panel panel--${tone} ${className}`.trim()} {...rest} />;
}
