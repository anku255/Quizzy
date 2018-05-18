import { FETCH_CURRENT_QUIZ, QUIZ_LOADING } from '../actions/types';

export default function(state = { currentQuiz: [] }, action) {
  switch (action.type) {
    case QUIZ_LOADING:
      return {
        ...state,
        loading: true
      };
    case FETCH_CURRENT_QUIZ:
      return { currentQuiz: action.payload, loading: false };
    default:
      return state;
  }
}
