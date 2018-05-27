import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from '../reducers/authReducer';
import quizReducer from '../reducers/quizReducer';
import questionReducer from '../reducers/questionReducer';
import notificationReducer from '../reducers/notificationReducer';
import quizHistoryReducer from '../reducers/quizHistoryReducer';
import statsReducer from './statsReducer';

export default combineReducers({
  auth: authReducer,
  quiz: quizReducer,
  question: questionReducer,
  form: formReducer,
  notification: notificationReducer,
  quizHistory: quizHistoryReducer,
  quizStats: statsReducer
});
