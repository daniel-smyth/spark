import React, { InputHTMLAttributes } from 'react';
import cn from 'clsx';
import s from './TextInput.module.css';
import Text from '../Text';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'flat' | 'ghost';
  width?: string | number;
  loading?: boolean;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  variant = 'flat',
  width = '100%',
  placeholder = ' ',
  loading = false,
  className,
  ...props
}) => {
  const rootClassName = cn(
    s.root,
    { [s.ghost]: variant === 'ghost' },
    { [s.flat]: variant === 'flat' },
    className
  );

  return (
    <div className={rootClassName}>
      <label htmlFor={props.name}>
        <Text>{props.name}</Text>
      </label>
      <input
        id={props.name}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        className={className}
        placeholder={placeholder}
        style={{
          width,
          ...props.style
        }}
        {...props}
      />
      <span className={s.wrapper} aria-hidden="true">
        <span className={s.label}>
          <Text>{props.name}</Text>
        </span>
      </span>
    </div>
  );
};

export default TextInput;
