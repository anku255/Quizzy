const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();
const authController = require('../controllers/authController');
const questionController = require('../controllers/questionController');
const quizController = require('../controllers/quizController');

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

// Question Routes

router.post('/api/question/new', questionController.addQuestion);
router.post('/api/question/submit', questionController.submitQuestion);

// Test Routes

router.post('/api/quiz/new', quizController.addQuiz);

router.post('/api/setCurrentQuiz', quizController.setCurrentQuiz);

router.get('/api/quiz/current', quizController.getCurrentQuiz);

router.post('/api/quiz/current', quizController.submitCurrentQuiz);

module.exports = router;
