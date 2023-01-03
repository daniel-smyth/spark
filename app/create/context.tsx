'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';

type Trait = {
  name: string;
  variations: Variation[];
};

type Variation = {
  name: string;
  url: string;
};

export type State = {
  traits: Trait[];
  setTraits: Dispatch<SetStateAction<Trait[]>>;
};

const context = createContext<State | null>(null);

export function CreateProvider({ children }: { children: React.ReactNode }) {
  const [traits, setTraits] = useState<Trait[]>([]);

  return (
    <context.Provider value={{ traits, setTraits }}>
      {children}
    </context.Provider>
  );
}

export const useCreate = () => {
  const c = useContext<State | null>(context);
  if (!c) {
    throw new Error('"/create" context must be placed within CreateProvider');
  }
  return c;
};
