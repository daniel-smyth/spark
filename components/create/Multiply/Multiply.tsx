'use client';

import { useCollection } from 'app/create/context';
import { FC, useState } from 'react';
import s from './Multiply.module.css';
import multiplyArtwork from './function';

const Multiply: FC = () => {
  const { collection, setCollection } = useCollection();
  const [processing, setProcessing] = useState(false);

  const start = () => {
    setCollection({
      ...collection,
      artwork: multiplyArtwork(collection)
    });
  };

  return (
    <>
      <div className={s.loading}>Multiplying artwork...</div>
    </>
  );
};

export default Multiply;
