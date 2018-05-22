import { GET_ERROR_MSG } from '../actions/types';

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
    default:
      return state;
  }
}
