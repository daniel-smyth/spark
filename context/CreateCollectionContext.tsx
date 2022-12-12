import React, { useContext } from 'react';
import {
  CollectionProperties,
  CreateCollectionContextType,
  Layer
} from '../types/web3';

// Artwork/images have several "traits". Each trait has several "types".
// For example:

// trait: Hat
// types: Red, Green, Blue.

// A "layer" is a trait and its collection of types

const CreateCollectionContext =
  React.createContext<CreateCollectionContextType | null>(null);

function CreateCollectionProvider({ children }: { children: React.ReactNode }) {
  const [layers, setLayers] = React.useState<Layer[]>([]);
  const [collectionSize, setCollectionSize] = React.useState(0);
  const [collectionProperties, setCollectionProperties] =
    React.useState<CollectionProperties>();
  const [isPaid, setIsPaid] = React.useState(false);

  return (
    <CreateCollectionContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        layers,
        setLayers,
        collectionSize,
        setCollectionSize,
        collectionProperties,
        setCollectionProperties,
        isPaid,
        setIsPaid
      }}
    >
      {children}
    </CreateCollectionContext.Provider>
  );
}

const useCreateCollection = () => {
  const context = useContext(CreateCollectionContext);
  if (!context)
    throw new Error(
      'useCreateCollection must be placed within CreateCollectionProvider'
    );
  return context;
};

export {
  useCreateCollection,
  CreateCollectionContext,
  CreateCollectionProvider
};
