'use client';

import { useCollection } from 'app/create/context';
import { FC } from 'react';
import s from './Mint.module.css';

const Mint: FC = () => {
  const { collection } = useCollection();

  const mintArtwork = () => {};

  return (
    <>
      <div className={s.loading}>Multiplying artwork</div>
    </>
  );
};

export default Mint;
