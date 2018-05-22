import { GET_ERROR_MSG, GET_SUCCESS_MSG } from '../actions/types';

const initialState = {
  errors: {},
  success: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERROR_MSG:
      return {
        ...state,
        errors: action.payload
      };
    case GET_SUCCESS_MSG:
      return {
        ...state,
        success: action.payload
      };
    default:
      return state;
  }
}
