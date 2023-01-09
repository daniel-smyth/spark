import React, { InputHTMLAttributes } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
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
  errors = {},
  touched = {},
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
      {errors[name] && touched[name] && (
        <div className={s.error}>
          <BiErrorCircle size={20} color="rgba(255, 25, 25, 0.6)" />
          <Text>{errors[name]}</Text>
        </div>
      )}
    </>
  );
};

export default TextInput;
