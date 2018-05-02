const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();
const authController = require('../controllers/authController');
const questionController = require('../controllers/questionController');
const quizController = require('../controllers/quizController');

router.get('/', (req, res) => {
  res.send('Welcome To Quizzy!!');
});

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  authController.signIn
);

router.get('/api/current_user', authController.getCurrentUser);

router.get('/api/logout', authController.logout);

router.post('/api/question/new', questionController.addQuestion);

// Test Routes

router.post('/api/quiz/new', quizController.addQuiz);

router.post('/api/setCurrentQuiz', quizController.setCurrentQuiz);

router.get('/api/quiz/current', quizController.getCurrentQuiz);

module.exports = router;
