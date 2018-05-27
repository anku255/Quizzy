import { FETCH_QUIZ_STATS } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_QUIZ_STATS:
      return action.payload;
    default:
      return state;
  }
}
