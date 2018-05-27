const mongoose = require('mongoose');
const QuestionResponse = mongoose.model('QuestionResponse');

exports.getStatsByCategory = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ notLoggedIn: 'You need to be logged in!' });
  }

  // Find the QuestionResponse ID for the logged in user
  const questionResponseId = req.user.questionResponse;

  if (!questionResponseId) {
    // user is yet to submit any quiz/question
    return res.json([]);
  }

  const category = req.query.category;
  const correctCount = parseInt(req.query.correctCount);
  const incorrectCount = parseInt(req.query.incorrectCount);

  if (!correctCount && !incorrectCount) {
    return res.json([]);
  }

  const result = await QuestionResponse.getStatsByCategory(
    questionResponseId,
    category,
    correctCount,
    incorrectCount
  );
  res.json(result);
};
