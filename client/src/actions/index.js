import axios from 'axios';
import {
  FETCH_USER,
  FETCH_CURRENT_QUIZ,
  SUMBIT_QUIZ_RESPONSE,
  ADD_QUESTION,
  QUIZ_LOADING,
  FETCH_QUESTIONS,
  QUESTIONS_LOADING
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchCurrentQuiz = () => async dispatch => {
  dispatch(setQuizLoading());
  const res = await axios.get('/api/quiz/current');
  dispatch({ type: FETCH_CURRENT_QUIZ, payload: res.data });
};

export const submitQuizResponse = data => async dispatch => {
  const res = await axios.post('/api/quiz/current', data);
  dispatch({ type: SUMBIT_QUIZ_RESPONSE, payload: res.data });
};

export const addQuestion = (data, history) => async dispatch => {
  history.push('/');
  const res = await axios.post('/api/question/new', data);
  dispatch({ type: ADD_QUESTION, payload: res.data });
};

// Sets loading to true
export const setQuizLoading = () => {
  return {
    type: QUIZ_LOADING
  };
};

// get questions by category
export const getQuestions = (category, page) => async dispatch => {
  dispatch(setQuestionsLoading());
  const res = await axios.get(`/api/questions/${category}/${page}`);
  dispatch({ type: FETCH_QUESTIONS, payload: res.data });
};

// Sets loading to true for questions
export const setQuestionsLoading = () => {
  return {
    type: QUESTIONS_LOADING
  };
};
