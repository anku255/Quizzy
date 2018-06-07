import { FETCH_UNPUBLISHED_QUESTIONS } from '../actions/types';

const initialState = {
  questions: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UNPUBLISHED_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
