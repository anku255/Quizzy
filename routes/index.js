const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();
const authController = require('../controllers/authController');
const questionController = require('../controllers/questionController');
const quizController = require('../controllers/quizController');
const statsController = require('../controllers/statsController');

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

// Update user profile
router.post('/api/profile', authController.updateUserProfile);

// Question Routes

router.get('/api/questions/:category/:page', questionController.getQuestions);
// Add a new question to the database
router.post('/api/question/new', questionController.addQuestion);
// Submit response of a question
router.post('/api/question/submit', questionController.submitQuestion);

// Quiz Routes

router.post('/api/quiz/new', quizController.addQuiz);

router.post('/api/setCurrentQuiz', quizController.setCurrentQuiz);

router.get('/api/quiz/current', quizController.getCurrentQuiz);

router.post('/api/quiz/current', quizController.submitCurrentQuiz);

// Stats Route
router.get('/api/stats/category', statsController.getStatsByCategory);

module.exports = router;
