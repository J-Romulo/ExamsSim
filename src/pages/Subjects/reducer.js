export const SubjectsReducerActions = {
  SET_SUBJECTS: 'SET_QUESTIONS',
  SET_FILTERED: 'SET_FILTERED',
  SET_SELECTED: 'SET_SELECTED',
  RESET_SELECTION: 'RESET_SELECTION',
  TOGGLE_SELECTING: 'TOGGLE_SELECTING',
  RESET: 'RESET',
};

export const initialState = {
  subjects: [],
  filteredSubjects: [],
  selectedSubjects: [],
  selectingSubjects: false,
};

export function SubjectsReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case SubjectsReducerActions.SET_SUBJECTS:
      return {
        ...state,
        subjects: payload,
        filteredSubjects: payload,
      };
    case SubjectsReducerActions.SET_FILTERED:
      return {
        ...state,
        filteredSubjects: payload,
      };
    case SubjectsReducerActions.SET_SELECTED:
      return {
        ...state,
        selectedSubjects: payload,
      };
    case SubjectsReducerActions.RESET_SELECTION:
      return {
        ...state,
        selectedSubjects: [],
        selectingSubjects: false,
      };
    case SubjectsReducerActions.TOGGLE_SELECTING:
      return {
        ...state,
        selectingSubjects: !state.selectingSubjects,
      };
    case SubjectsReducerActions.RESET:
      return initialState;
    default:
      return state;
  }
}
