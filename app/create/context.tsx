'use client';

import { createContext, useContext, useState } from 'react';
import { NFTGenerator } from '@lib/web3';

const Context = createContext({
  collection: new NFTGenerator(),
  setCollection: (collection: NFTGenerator) => {}
});

export function Provider({ children }: { children: React.ReactNode }) {
  const [collection, _setCollection] = useState(new NFTGenerator());

  const setCollection = (collection: NFTGenerator) => {
    const clone = Object.create(Object.getPrototypeOf(collection));
    _setCollection(Object.assign(clone, collection));
  };

  return (
    <Context.Provider value={{ collection, setCollection }}>
      {children}
    </Context.Provider>
  );
}

export const useCollection = () => {
  const c = useContext(Context);
  if (!c) {
    throw new Error('useCollection must be placed within CollectionProvider');
  }
  return c;
};
