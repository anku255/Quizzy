const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();
const authController = require('../controllers/authController');
const questionController = require('../controllers/questionController');
const quizController = require('../controllers/quizController');
const statsController = require('../controllers/statsController');
const adminController = require('../controllers/adminController');

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

// Delete user account
router.delete('/api/profile', authController.deleteUserAccount);

// Question Routes

router.get('/api/questions/:category/:page', questionController.getQuestions);
// Add a new question to the database
router.post('/api/question/new', questionController.addQuestion);
// Submit response of a question
router.post('/api/question/submit', questionController.submitQuestion);

// Quiz Routes

router.get('/api/quiz/current', quizController.getCurrentQuiz);

router.post('/api/quiz/current', quizController.submitCurrentQuiz);

router.get('/api/quiz/history', quizController.getQuizHistory);

// Stats Route
router.get(
  '/api/stats/:category/:page/:sortBy/:order',
  statsController.getStatsByCategory
);

// Admin Routes

// Get unpublished questions
router.get('/api/admin/questions', adminController.getUnpublishedQuestions);

// Create a new quiz
router.post('/api/admin/quiz/new', adminController.addQuiz);

// Get quizzes
router.get('/api/admin/quiz', adminController.getQuizzes);

// Publish quiz
router.post('/api/admin/quiz/publish', adminController.publishQuiz);

router.post('/api/admin/setCurrentQuiz', adminController.setCurrentQuiz);

module.exports = router;
