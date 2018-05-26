import { FETCH_QUIZ_HISTORY } from '../actions/types';

const initialState = {
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZ_HISTORY:
      return {
        ...action.payload,
        loading: false
      };

    default:
      return state;
  }
}
