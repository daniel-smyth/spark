'use client';

import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef
} from 'react';
import cn from 'clsx';
import { mergeRefs } from 'react-merge-refs';
import s from './Button.module.css';
import { LoadingDots } from 'components/ui';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'flat' | 'slim' | 'ghost' | 'naked';
  type?: 'submit' | 'reset' | 'button';
  width?: string | number;
  className?: string;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  Component?: string | JSXElementConstructor<any>;
}

// eslint-disable-next-line react/display-name
const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    variant = 'flat',
    width,
    className,
    active,
    disabled = false,
    loading = false,
    style = {},
    Component = 'button',
    children,
    ...rest
  } = props;
  const ref = useRef<typeof Component>(null);

  const rootClassName = cn(
    s.root,
    {
      [s.ghost]: variant === 'ghost',
      [s.slim]: variant === 'slim',
      [s.naked]: variant === 'naked',
      [s.loading]: loading,
      [s.disabled]: disabled
    },
    className
  );

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style
      }}
      {...rest}
    >
      {loading ? <LoadingDots /> : children}
    </Component>
  );
});

export default Button;
