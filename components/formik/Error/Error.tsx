'use client';

import React, { FC } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import s from './Error.module.css';
import { Text } from '@components/ui';

const FormikError: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={s.error}>
      <BiErrorCircle size={20} color="rgba(255, 25, 25, 0.6)" />
      <Text>{children}</Text>
    </div>
  );
};

export default FormikError;
