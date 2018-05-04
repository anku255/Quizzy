import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import quizReducer from '../reducers/quizReducer';

export default combineReducers({
  auth: authReducer,
  quiz: quizReducer
});
