import { useContext } from 'react';

import { DialogModalContext } from '../contexts/DialogModalContext';

export function useDialogModal() {
  const context = useContext(DialogModalContext);

  return context;
}
