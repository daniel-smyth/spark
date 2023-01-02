'use client';

import { FC, InputHTMLAttributes } from 'react';
import cx from 'clsx';
import s from './NumberInput.module.css';

// Omit default input 'onChange' and apply custom 'onChange' for NumberInput
export interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: ({ name, value }: { name: string; value: number }) => void;
}

const NumberInput: FC<NumberInputProps> = (props) => {
  return (
    <div className={s.quantity}>
      <span
        className={cx(s.quantityAdd, s.quantityButton)}
        onClick={() =>
          props.onChange({
            name: props.name || '',
            value: (props.value as number) + 1
          })
        }
      />
      <input
        {...props}
        type="number"
        onChange={(e) =>
          props.onChange({
            name: props.name || '',
            value: Number(e.target.value)
          })
        }
      />
      <span
        className={cx(s.quantityRemove, s.quantityButton)}
        onClick={() =>
          props.onChange({
            name: props.name || '',
            value: (props.value as number) - 1
          })
        }
      />
    </div>
  );
};

export default NumberInput;
