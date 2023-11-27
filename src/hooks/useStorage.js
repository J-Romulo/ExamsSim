import { useContext } from 'react';

import { StorageContext } from '../contexts/StorageContext';

export function useStorage() {
  const context = useContext(StorageContext);

  return context;
}
