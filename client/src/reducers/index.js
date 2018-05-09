import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import quizReducer from '../reducers/quizReducer';
import questionReducer from '../reducers/questionReducer';

export default combineReducers({
  auth: authReducer,
  quiz: quizReducer,
  question: questionReducer
});
