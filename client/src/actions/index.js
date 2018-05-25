import axios from 'axios';
import {
  FETCH_USER,
  FETCH_CURRENT_QUIZ,
  QUIZ_LOADING,
  FETCH_QUESTIONS,
  QUESTIONS_LOADING,
  GET_ERROR_MSG,
  GET_SUCCESS_MSG,
  CLEAR_NOTIFICATIONS
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Update user profile
export const updateUserProfile = userData => async dispatch => {
  // TODO
};

export const fetchCurrentQuiz = () => async dispatch => {
  dispatch(setQuizLoading());
  const res = await axios.get('/api/quiz/current');
  dispatch({ type: FETCH_CURRENT_QUIZ, payload: res.data });
};

export const submitQuizResponse = data => async dispatch => {
  try {
    const res = await axios.post('/api/quiz/current', data);
    dispatch({ type: GET_SUCCESS_MSG, payload: res.data });
  } catch (err) {
    dispatch({
      type: GET_ERROR_MSG,
      payload: err.response.data
    });
  }
};

export const addQuestion = (data, onCancel) => async dispatch => {
  try {
    const res = await axios.post('/api/question/new', data);
    dispatch({ type: GET_SUCCESS_MSG, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERROR_MSG, payload: err.response.data });
  }
  // calling onCancel sets showFormReview to false and
  // QuestionNew component displays QuestionForm
  onCancel();
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

// clears all the notifications
export const clearNotifications = () => {
  return {
    type: CLEAR_NOTIFICATIONS
  };
};

// submit the response for a single question
export const submitQuestionResponse = userResponse => async dispatch => {
  try {
    const res = await axios.post('/api/question/submit', userResponse);
    dispatch({
      type: GET_SUCCESS_MSG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR_MSG,
      payload: err.response.data
    });
  }
};
