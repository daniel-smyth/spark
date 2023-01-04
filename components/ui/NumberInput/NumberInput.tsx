'use client';

import React, { FC, InputHTMLAttributes, useRef } from 'react';
import cn from 'clsx';
import s from './NumberInput.module.css';

const NumberInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const { className, style } = props;
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className={cn(s.root, className)} style={style}>
      <span
        className={cn(s.add, s.button)}
        onClick={() => {
          if (input.current) {
            input.current.value = `${Number(input.current.value) + 1}`;
          }
        }}
      />
      <input {...props} type="number" ref={input} />
      <span
        className={cn(s.remove, s.button)}
        onClick={() => {
          if (input.current) {
            input.current.value = `${Number(input.current.value) - 1}`;
          }
        }}
      />
    </div>
  );
};

export default NumberInput;
