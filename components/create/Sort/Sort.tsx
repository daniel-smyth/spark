'use client';

import path from 'path';
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

  const onSubmit = () => {
    // When ordered correctly, process and bake the trait's index into object
    for (let i = 0; i < collection.artwork.length; i++) {
      const trait = collection.artwork[i];
      trait.id = i;
    }
    setCollection({ ...collection });
  };

  return (
    <DragAndDrop
      values={collection.artwork.map((trait) => trait.name)}
      onChange={changeOrder}
    />
  );
};

export default Sort;
