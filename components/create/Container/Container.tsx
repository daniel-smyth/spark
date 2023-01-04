'use client';

import { FC } from 'react';
import Link from 'next/link';
import { useCollection } from 'app/create/context';
import { Text } from '@components/ui';
import Upload from '../Upload';
import Properties from '../Properties';
import Sort from '.';
import Multiply from '../Multiply';
import Mint from '../Mint';

const Container: FC = () => {
  const { collection } = useCollection();

  return (
    <>
      {collection.artwork.length === 0 && (
        <>
          <Text>Upload your artwork.</Text>

          <Upload />
        </>
      )}

      {collection.artwork.length > 0 && (
        <>
          <Text>
            Update layer order. Layer 0 located at the back, layer 1 is printed
            over layer 1.
          </Text>

          <Sort />
        </>
      )}

      {collection.properties.size === 0 && collection.artwork.length > 0 && (
        <>
          <Text>
            This data cannot be changed.{' '}
            <Link href="/">See NFT trait types and trait names</Link> for more
            information.
          </Text>

          <Properties />
        </>
      )}

      {collection.properties.size > 0 && (
        <>
          <Multiply />
        </>
      )}

      {collection.properties.size === collection.artwork.length && (
        <>
          <Mint />
        </>
      )}
    </>
  );
};

export default Container;
