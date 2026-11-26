import type { ButtonHTMLAttributes, Ref } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  ref?: Ref<HTMLButtonElement>;
}

export function Button({ variant = 'primary', className = '', type = 'button', ...rest }: Props) {
  return <button type={type} className={`btn btn--${variant} ${className}`.trim()} {...rest} />;
}
