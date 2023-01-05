'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';

export interface Variation {
  id: number;
  name: string;
  image: string;
  trait: string;
  weight: number;
}

export interface Trait {
  id: number;
  name: string;
  variations: Variation[];
}

export interface NFT {
  name: string;
  image: string;
  description: string;
  attributes: {
    [key: string]: string;
  };
  [key: string]: any;
}

export interface Collection {
  nfts: NFT[];
  artwork: Trait[];
  properties: {
    size: number;
    name: string;
    description: string;
    symbol: string;
    prefix: string;
    recipient: string;
    external_link: string;
  };
}

export type CollectionState = {
  collection: Collection;
  setCollection: Dispatch<SetStateAction<Collection>>;
};

const initialValues = {
  nfts: [],
  artwork: [],
  properties: {
    size: 0,
    name: '',
    symbol: '',
    description: '',
    prefix: '',
    recipient: '',
    external_link: ''
  }
};

const Context = createContext<CollectionState>({
  collection: initialValues,
  setCollection: (...args: any) => {}
});

export function CollectionProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [collection, setCollection] = useState<Collection>(initialValues);

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
