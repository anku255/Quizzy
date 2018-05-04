import { FETCH_CURRENT_QUIZ } from '../actions/types';

export default function(state = { currentQuiz: [] }, action) {
  switch (action.type) {
    case FETCH_CURRENT_QUIZ:
      return { currentQuiz: action.payload };
    default:
      return state;
  }
}

