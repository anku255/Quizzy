import { FETCH_CURRENT_QUIZ } from '../actions/types';

export default function(state = { currentQuiz: [], loading: true }, action) {
  switch (action.type) {
    case FETCH_CURRENT_QUIZ:
      return { currentQuiz: action.payload, loading: false };
    default:
      return state;
  }
}
