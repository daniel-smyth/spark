'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';

interface Image {
  name: string;
  url: string;
}

export interface Trait {
  name: string;
  variations: Image[];
}

export interface Collection {
  artwork: Trait[];
  properties: {
    size: number;
    name: string;
    description: string;
    symbol: string;
    prefix: string;
    external_link: string;
  };
}

export type CollectionState = {
  collection: Collection;
  setCollection: Dispatch<SetStateAction<Collection>>;
};

const initialValues = {
  artwork: [],
  properties: {
    size: 0,
    name: '',
    symbol: '',
    description: '',
    prefix: '',
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
