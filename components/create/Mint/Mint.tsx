'use client';

import { useCollection } from 'app/create/context';
import { FC } from 'react';
import s from './Mint.module.css';

const Mint: FC = () => {
  const { collection } = useCollection();

  const mint = () => {};

  return (
    <>
      <div className={s.loading}>Minting artwork</div>
    </>
  );
};

export default Mint;
