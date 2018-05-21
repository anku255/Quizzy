import {
  ADD_QUESTION,
  FETCH_QUESTIONS,
  QUESTIONS_LOADING
} from '../actions/types';

const initialState = {
  question: {},
  questions: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case QUESTIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_QUESTION:
      return {
        ...state,
        question: action.payload
      };
    case FETCH_QUESTIONS:
      return {
        ...state,
        questions: action.payload.questions,
        pages: action.payload.pages,
        loading: false
      };
    default:
      return state;
  }
}
