const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const questionController = require('../controllers/questionController');

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

module.exports = router;
