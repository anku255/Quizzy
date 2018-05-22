import {
  GET_ERROR_MSG,
  GET_SUCCESS_MSG,
  CLEAR_NOTIFICATIONS
} from '../actions/types';

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
    case CLEAR_NOTIFICATIONS:
      return initialState;
    default:
      return state;
  }
}
