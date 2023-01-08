import React, { ReactNode } from 'react';
import type { FC } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import cn from 'clsx';
import s from './Alert.module.css';
import { Button } from '@components/ui';

interface AlertProps {
  severity: 'error' | 'warning' | 'info' | 'success';
  className?: string;
  style?: {};
  children?: ReactNode;
}

const Alert: FC<AlertProps> = ({
  severity,
  className = '',
  style = {},
  children
}) => {
  const rootClassName = cn(s.root, { [s[severity]]: true }, className);

  return (
    <div className={rootClassName} style={style}>
      <i className={s.icon}>
        <AiOutlineCheckCircle />
      </i>
      {children}
      <div className={s.action}>
        <Button>
          <ImCancelCircle />
        </Button>
      </div>
    </div>
  );
};

export default Alert;
