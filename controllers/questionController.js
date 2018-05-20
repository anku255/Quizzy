const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Question = mongoose.model('Question');
const QuizResponse = mongoose.model('QuizResponse');
const { MODERATOR_LEVEL } = require('../constants/accessLevel');

exports.addQuestion = async (req, res) => {
  // Check if the user has MODERATER_ACCESS_LEVEL
  if (req.user.accessLevel !== MODERATOR_LEVEL) {
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

// Sumbit response of a question
// req.body = {quesID, category, correctAns, incorrectAns}
exports.submitQuestion = async (req, res) => {
  const questionCategory = req.body.category;
  let quizResponse;

  // if quizResponse exists for the current user
  // fetch quizResponse object
  if (req.user.quizResponse) {
    quizResponse = await QuizResponse.findById(req.user.quizResponse).select(
      questionCategory
    );
  } else {
    // otherwise create a new quizResponse object
    quizResponse = await new QuizResponse().save();
    req.user.quizResponse = quizResponse._id;
    req.user.save(); // save the user
  }

  const answerArray = quizResponse[questionCategory];

  const found = answerArray.find((obj, i) => {
    if (obj.questionId.toString() === req.body.quesId) {
      if (req.body.correctAnswer)
        answerArray[i]['correctCount'] = answerArray[i]['correctCount'] + 1;
      else
        answerArray[i]['incorrectCount'] = answerArray[i]['incorrectCount'] + 1;
      return true; // stop searching
    }
  });

  // if not found
  if (!found) {
    answerArray.push({
      questionId: req.body.quesId,
      correctCount: req.body.correctAnswer ? 1 : 0,
      incorrectCount: req.body.incorrectAnswer ? 1 : 0
    });
  }

  quizResponse[questionCategory] = answerArray; // Update answerArray
  await quizResponse.save(); // save quizResponse object
  res.json({ message: 'success', error: false });
};
