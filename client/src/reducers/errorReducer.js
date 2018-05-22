import { GET_ERROR_MSG } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_ERROR_MSG:
      return action.payload;
    default:
      return state;
  }
}
