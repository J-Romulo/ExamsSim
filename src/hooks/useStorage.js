import { useContext } from 'react';

import { StorageContext } from '../contexts/StorageContext/StorageContext';

export function useStorage() {
  const context = useContext(StorageContext);

  return context;
}
