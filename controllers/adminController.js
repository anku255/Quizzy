const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Question = mongoose.model('Question');
const { ADMIN_LEVEL } = require('../constants/accessLevel');

exports.getUnpublishedQuestions = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ notLoggedIn: 'You need to be logged in!' });
  }

  // Check if the user has ADMIN_ACCESS_LEVEL
  if (req.user.accessLevel !== ADMIN_LEVEL) {
    return res.status(401).json({
      accessDenied: "You dont' have required permission."
    });
  }

  const questions = await Question.find({ published: false });
  res.json(questions);
};
