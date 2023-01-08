'use client';

import { FC } from 'react';
import { useCollection } from '@app/create/context';
import Upload from '../Upload';
import Properties from '../Properties';
import Mint from '../Mint';

const Container: FC = () => {
  const { collection } = useCollection();

  return (
    <>
      {collection.artwork.length === 0 && <Upload />}
      {collection.artwork.length > 0 && collection.properties.size === 0 && (
        <Properties />
      )}
      {collection.properties.size > 0 && <Mint />}
    </>
  );
};

export default Container;
