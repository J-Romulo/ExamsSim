export const initialState = {
  isOpen: false,
  message: '',
  mainOptMessage: '',
  secondOptMessage: '',
  enableClose: true,
  onSubmit: () => {},
};

export function DialogModalReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_STATE':
      return {
        ...state,
        ...payload,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
