import cn from 'clsx';
import s from './TextInput.module.css';
import React, { InputHTMLAttributes } from 'react';
import Text from '../Text';

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const { className, ...rest } = props;

  return (
    <div className={s.container}>
      <label htmlFor={props.name} className={s.labelText}>
        <Text>{props.name}</Text>
      </label>
      <input
        id={props.name}
        className={cn(s.input, {}, className)}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
      <span className={s.labelWrap} aria-hidden="true">
        <span className={s.label}>
          <Text>{props.name}</Text>
        </span>
      </span>
    </div>
  );
};

export default Input;
