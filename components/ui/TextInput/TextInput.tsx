import React, { InputHTMLAttributes } from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import cn from 'clsx';
import s from './TextInput.module.css';
import { Text } from '@components/ui';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'flat' | 'ghost';
  width?: string | number;
  loading?: boolean;
  className?: string;
  errors?: FormikErrors<Record<string, string | number>>;
  touched?: FormikTouched<Record<string, string | number>>;
}

const TextInput: React.FC<TextInputProps> = ({
  name = '',
  variant = 'flat',
  width = '100%',
  placeholder = ' ',
  loading = false,
  className = '',
  ...props
}) => {
  const rootClassName = cn(
    s.root,
    { [s.ghost]: variant === 'ghost' },
    { [s.flat]: variant === 'flat' },
    className
  );

  return (
    <>
      <div className={rootClassName}>
        <label htmlFor={name}>
          <Text>{name}</Text>
        </label>
        <input
          id={name}
          name={name}
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
            <Text>{name}</Text>
          </span>
        </span>
      </div>
    </>
  );
};

export default TextInput;
