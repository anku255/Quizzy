import axios from 'axios';
import { FETCH_USER, FETCH_CURRENT_QUIZ, SUMBIT_QUIZ_RESPONSE } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchCurrentQuiz = () => async dispatch => {
  const res = await axios.get('/api/quiz/current');
  dispatch({ type: FETCH_CURRENT_QUIZ, payload: res.data });
};

export const submitQuizResponse = data => async dispatch => {
  console.log('submitQuizResponse action was called');
  const res = await axios.post('/api/quiz/current', data);
  dispatch({ type: SUMBIT_QUIZ_RESPONSE, payload: res.data });
};
