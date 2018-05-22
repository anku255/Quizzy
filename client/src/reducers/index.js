import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from '../reducers/authReducer';
import quizReducer from '../reducers/quizReducer';
import questionReducer from '../reducers/questionReducer';
import errorReducer from '../reducers/errorReducer';

export default combineReducers({
  auth: authReducer,
  quiz: quizReducer,
  question: questionReducer,
  form: formReducer,
  errors: errorReducer
});
