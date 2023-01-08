import React, { FC } from 'react';
import { BiErrorCircle } from 'react-icons/Bi';
import s from './Error.module.css';
import { Text } from '@components/ui';

interface ErrorProps {
  children: React.ReactNode;
}

const Error: FC<ErrorProps> = ({ children }) => {
  return (
    <div className={s.error}>
      <BiErrorCircle size={20} color="rgba(255, 25, 25, 0.6)" />
      <Text>{children}</Text>
    </div>
  );
};

export default Error;
