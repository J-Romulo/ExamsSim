export const ExamsReducerActions = {
  SET_EXAMS: 'SET_EXAMS',
  SET_FILTERED: 'SET_FILTERED',
  SET_SELECTED: 'SET_SELECTED',
  RESET_SELECTION: 'RESET_SELECTION',
  TOGGLE_SELECTING: 'TOGGLE_SELECTING',
  RESET: 'RESET',
};

export const initialState = {
  exams: [],
  filteredExams: [],
  selectedExams: [],
  selectingExams: false,
};

export function ExamsReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case ExamsReducerActions.SET_EXAMS:
      return {
        ...state,
        exams: payload,
        filteredExams: payload,
      };
    case ExamsReducerActions.SET_FILTERED:
      return {
        ...state,
        filteredExams: payload,
      };
    case ExamsReducerActions.SET_SELECTED:
      return {
        ...state,
        selectedExams: payload,
      };
    case ExamsReducerActions.RESET_SELECTION:
      return {
        ...state,
        selectedExams: [],
        selectingExams: false,
      };
    case ExamsReducerActions.TOGGLE_SELECTING:
      return {
        ...state,
        selectingExams: !state.selectingExams,
      };
    case ExamsReducerActions.RESET:
      return initialState;
    default:
      return state;
  }
}
