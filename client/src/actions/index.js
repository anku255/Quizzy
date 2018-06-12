import axios from 'axios';
import {
  FETCH_USER,
  FETCH_CURRENT_QUIZ,
  QUIZ_LOADING,
  FETCH_QUESTIONS,
  QUESTIONS_LOADING,
  GET_ERROR_MSG,
  GET_SUCCESS_MSG,
  CLEAR_NOTIFICATIONS,
  FETCH_QUIZ_HISTORY,
  FETCH_QUIZ_STATS,
  FETCH_UNPUBLISHED_QUESTIONS,
  FETCH_QUIZZES
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Update user profile
export const updateUserProfile = (userData, history) => async dispatch => {
  try {
    const res = await axios.post('/api/profile', userData);
    dispatch(fetchUser());
    dispatch({
      type: GET_SUCCESS_MSG,
      payload: res.data
    });
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: GET_ERROR_MSG,
      payload: err.response.data
    });
  }
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

// fetch quiz history object
export const getQuizHistory = () => async dispatch => {
  try {
    const res = await axios.get('/api/quiz/history');
    dispatch({
      type: FETCH_QUIZ_HISTORY,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

// fetch quiz stats
export const getQuizStats = (
  category,
  page,
  sortBy,
  order
) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/stats/${category}/${page}/${sortBy}/${order}`
    );
    dispatch({
      type: FETCH_QUIZ_STATS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

// fetch unpublished questions
export const getUnpublisehdQuestions = () => async dispatch => {
  const res = await axios.get('/api/admin/questions');
  dispatch({
    type: FETCH_UNPUBLISHED_QUESTIONS,
    payload: res.data
  });
};

// Create a new quiz
export const addQuiz = quizData => async dispatch => {
  try {
    const res = await axios.post('/api/admin/quiz/new', quizData);
    dispatch({ type: GET_SUCCESS_MSG, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERROR_MSG, payload: err.response.data });
  }
};

// Get recent quizzes
export const getQuizzes = () => async dispatch => {
  const res = await axios.get('/api/admin/quiz');
  dispatch({
    type: FETCH_QUIZZES,
    payload: res.data
  });
};

// Publish a quiz
export const publishQuiz = quiz => async dispatch => {
  try {
    const res = await axios.post('/api/admin/quiz/publish', quiz);
    dispatch({ type: GET_SUCCESS_MSG, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERROR_MSG, payload: err.response.data });
  }
};

// set current quiz
export const setCurrentQuiz = quiz => async dispatch => {
  try {
    const res = await axios.post('/api/admin/setCurrentQuiz', quiz);
    dispatch({ type: GET_SUCCESS_MSG, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERROR_MSG, payload: err.response.data });
  }
};

// delete user account
export const deleteUserAccount = history => async dispatch => {
  // eslint-disable-next-line
  const res = await axios.delete('/api/profile');
  history.push('/');
};
