export const QuestionsReducerActions = {
  SET_QUESTIONS: 'SET_QUESTIONS',
  SET_FILTERED: 'SET_FILTERED',
  SET_SELECTED: 'SET_SELECTED',
  RESET_SELECTION: 'RESET_SELECTION',
  TOGGLE_SELECTING: 'TOGGLE_SELECTING',
  RESET: 'RESET',
};

export const initialState = {
  questions: [],
  filteredQuestions: [],
  selectedQuestions: [],
  selectingQuestions: false,
};

export function QuestionsReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case QuestionsReducerActions.SET_QUESTIONS:
      return {
        ...state,
        questions: payload,
        filteredQuestions: payload,
      };
    case QuestionsReducerActions.SET_FILTERED:
      return {
        ...state,
        filteredQuestions: payload,
      };
    case QuestionsReducerActions.SET_SELECTED:
      return {
        ...state,
        selectedQuestions: payload,
      };
    case QuestionsReducerActions.RESET_SELECTION:
      return {
        ...state,
        selectedQuestions: [],
        selectingQuestions: false,
      };
    case QuestionsReducerActions.TOGGLE_SELECTING:
      return {
        ...state,
        selectingQuestions: !state.selectingQuestions,
      };
    case QuestionsReducerActions.RESET:
      return initialState;
    default:
      return state;
  }
}
