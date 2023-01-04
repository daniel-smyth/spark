'use client';

import { FC } from 'react';
import { useCollection } from 'app/create/context';
import { DragAndDrop } from '@components/ui';

const Sort: FC = () => {
  const { collection, setCollection } = useCollection();

  const changeOrder = (output: string[]) => {
    setCollection({
      ...collection,
      artwork: [
        ...output.map(
          (trait) => collection.artwork.find((t) => t.name === trait)!
        )
      ]
    });
  };

  return (
    <DragAndDrop
      values={collection.artwork.map((trait) => trait.name)}
      onChange={changeOrder}
    />
  );
};

export default Sort;
