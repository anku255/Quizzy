const mongoose = require('mongoose');
const QuizResponse = mongoose.model('QuizResponse');

exports.getStatsByCategory = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ notLoggedIn: 'You need to be logged in!' });
  }

  // Find the QuizResponse ID for the logged in user
  const quizResponseId = req.user.quizResponse;

  if (!quizResponseId) {
    // user is yet to submit any quiz/question
    return res.json([]);
  }

  const category = req.query.category;
  const correctCount = parseInt(req.query.correctCount);
  const incorrectCount = parseInt(req.query.incorrectCount);

  const result = await QuizResponse.getStatsByCategory(
    quizResponseId,
    category,
    correctCount,
    incorrectCount
  );

  res.json(result);
};
