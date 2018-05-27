import { FETCH_QUIZ_STATS } from '../actions/types';

const initialState = {
  questions: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZ_STATS:
      return {
        questions: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
