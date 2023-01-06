'use client';

import { NFTCollection } from '@lib/nftcollection';
import { createContext, useContext, useState } from 'react';

type CollectionState = {
  collection: NFTCollection;
  setCollection: (collection: NFTCollection) => void;
};

const initialValues = new NFTCollection();

const Context = createContext<CollectionState>({
  collection: initialValues,
  setCollection: (...args: any) => {}
});

export function CollectionProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [collection, _setCollection] = useState<NFTCollection>(initialValues);

  const setCollection = (collection: NFTCollection) => {
    setCollection(
      Object.assign(
        Object.create(Object.getPrototypeOf(collection)),
        collection
      )
    );
  };

  return (
    <Context.Provider value={{ collection, setCollection }}>
      {children}
    </Context.Provider>
  );
}

export const useCollection = () => {
  const c = useContext<CollectionState>(Context);
  if (!c) {
    throw new Error(
      '"/create" context must be placed within CollectionProvider'
    );
  }
  return c;
};
