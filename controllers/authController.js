const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.signIn = (req, res) => {
  res.redirect('/');
};

exports.getCurrentUser = (req, res) => {
  res.send(req.user);
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ notLoggedIn: 'You need to be logged in!' });
  }

  if (req.body.name) req.user.name = req.body.name;
  if (req.body.email) req.user.email = req.body.email;
  if (req.body.semester) req.user.semester = parseInt(req.body.semester);

  // Save the user
  await req.user.save();
  res.json({ profileUpdated: 'Profile Updated Successfully!' });
};
