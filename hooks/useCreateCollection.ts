import { useContext } from 'react';
import { CreateCollectionContext } from '../context/CreateCollectionContext';

const useCreateCollection = () => {
  const context = useContext(CreateCollectionContext);
  if (!context)
    throw new Error(
      'useCreateCollection must be placed within CreateCollectionProvider'
    );
  return context;
};

export default useCreateCollection;
