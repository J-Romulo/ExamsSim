import React, { createContext, useReducer } from 'react';

import { DialogModalReducer, initialState } from './reducer';
import { DialogModal } from '../../components/DialogModal';

export const DialogModalContext = createContext({});

export function DialogModalProvider({ children }) {
  const [state, dispatch] = useReducer(DialogModalReducer, initialState);

  function openConfirmModal(message, mainOptMessage, onSubmit = () => {}, enableClose = true) {
    dispatch({
      type: 'SET_STATE',
      payload: {
        isOpen: true,
        message,
        mainOptMessage,
        enableClose,
        onSubmit,
      },
    });
  }

  function openTwoOptionsModal(
    message,
    mainOptMessage,
    secondOptMessage,
    onSubmit = () => {},
    enableClose = true
  ) {
    dispatch({
      type: 'SET_STATE',
      payload: {
        isOpen: true,
        message,
        mainOptMessage,
        secondOptMessage,
        enableClose,
        onSubmit,
      },
    });
  }

  function handleSubmit() {
    state.onSubmit();

    closeModal();
  }

  function closeModal() {
    dispatch({ type: 'RESET' });
  }

  return (
    <DialogModalContext.Provider value={{ openConfirmModal, openTwoOptionsModal }}>
      {children}

      <DialogModal state={state} closeModal={closeModal} submit={handleSubmit} />
    </DialogModalContext.Provider>
  );
}
