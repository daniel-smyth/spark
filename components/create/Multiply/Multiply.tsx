'use client';

import { FC, useEffect } from 'react';
import { useCollection } from 'app/create/context';
import NFTGenerator from '@lib/nftbuilder';

const Multiply: FC = () => {
  const { collection, setCollection } = useCollection();

  useEffect(() => {
    const builder = new NFTGenerator(collection.artwork);
    const nfts = builder.generate(collection.properties.size, {
      prefix: collection.properties.prefix,
      description: collection.properties.description
    });

    setCollection({
      ...collection,
      nfts
    });
  }, []);

  return <div>Multiplying artwork...</div>;
};

export default Multiply;
