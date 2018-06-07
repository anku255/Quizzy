import { FETCH_UNPUBLISHED_QUESTIONS, FETCH_QUIZZES } from '../actions/types';

const initialState = {
  questions: [],
  quizzes: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UNPUBLISHED_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading: false
      };
    case FETCH_QUIZZES:
      return {
        ...state,
        quizzes: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
