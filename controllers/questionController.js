const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Question = mongoose.model('Question');
const { MODERATOR_LEVEL } = require('../constants/accessLevel');

exports.addQuestion = async (req, res) => {
  // Check if the user has MODERATER_ACCESS_LEVEL
  if (req.user.level !== MODERATOR_LEVEL) {
    return res.json({
      message: "You dont' have permission to add a question.",
      error: true
    });
  }
  const question = await new Question(req.body).save();
  res.json({
    message: 'Question Submission Successfull!',
    error: false
  });
};
