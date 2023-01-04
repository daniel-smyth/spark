'use client';

import { useCollection } from 'app/create/context';
import { FC } from 'react';
import s from './Multiply.module.css';
import multiplyArtwork from './function';

const Multiply: FC = () => {
  const { collection, setCollection } = useCollection();

  const multiply = () => {};

  return (
    <>
      <div className={s.loading}>Multiplying artwork...</div>
    </>
  );
};

export default Multiply;
