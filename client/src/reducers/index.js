import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from '../reducers/authReducer';
import quizReducer from '../reducers/quizReducer';
import questionReducer from '../reducers/questionReducer';
import notificationReducer from '../reducers/notificationReducer';

export default combineReducers({
  auth: authReducer,
  quiz: quizReducer,
  question: questionReducer,
  form: formReducer,
  notification: notificationReducer
});
