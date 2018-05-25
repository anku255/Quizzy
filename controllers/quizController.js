const mongoose = require('mongoose');
const Quiz = mongoose.model('Quiz');
const CurrentQuiz = mongoose.model('CurrentQuiz');
const Question = mongoose.model('Question');
const QuestionResponse = mongoose.model('QuestionResponse');

// Returns the list of questions for the current Quiz
exports.getCurrentQuiz = async (req, res) => {
  // get the current Quiz object
  let currentQuiz = await CurrentQuiz.findOne().populate([
    {
      path: 'currentQuizId',
      model: 'Quiz',
      populate: {
        path: 'questions',
        model: 'Question'
      }
    }
  ]);

  const questions = currentQuiz.currentQuizId.questions;
  res.json(questions);
};

// Create a new Quiz
exports.addQuiz = async (req, res) => {
  const newQuiz = await new Quiz({
    startTime: new Date(req.body.startTime),
    endTime: new Date(req.body.endTime),
    questions: req.body.questions,
    description: req.body.description || ''
  }).save();

  res.json(newQuiz);
};

// TODO
// The object ID of current quiz will be present
// in req.body.currentQuizId
exports.setCurrentQuiz = async (req, res) => {
  // get currentQuiz from DB
  const currentQuiz = await CurrentQuiz.findOne();

  // Update it's currentQuizId
  if (req.body.currentQuizId) {
    currentQuiz['currentQuizId'] = req.body.currentQuizId;
    currentQuiz.save();
  }
  res.json(currentQuiz);
};

// Submit Current Quiz
exports.submitCurrentQuiz = async (req, res) => {
  // get currentQuiz from DB
  const currentQuiz = await CurrentQuiz.findOne();

  // If user has submitted already, return early
  if (req.user.lastSubmission === currentQuiz._id.toString())
    return res
      .status(400)
      .json({ submissonError: 'You have already submitted this quiz!' });
  else {
    req.user.lastSubmission = currentQuiz._id.toString();
    req.user.save();
  }

  // Right Now, Only one category per quiz is supported
  const quizCategory = req.body[0]['category'];

  let questionResponse;
  // if questionResponse exists for the current user
  // fetch questionResponse object
  if (req.user.questionResponse) {
    questionResponse = await QuestionResponse.findById(
      req.user.questionResponse
    ).select(quizCategory);
  } else {
    // otherwise create a new questionResponse object
    questionResponse = await new QuestionResponse().save();
    req.user.questionResponse = questionResponse._id;
    req.user.save(); // save the user
  }

  const answerArray = questionResponse[quizCategory];

  // loop over reponses
  for (let ques of req.body) {
    const found = answerArray.find((obj, i) => {
      if (obj.questionId.toString() === ques.quesId) {
        if (ques.correctAnswer)
          answerArray[i]['correctCount'] = answerArray[i]['correctCount'] + 1;
        else
          answerArray[i]['incorrectCount'] =
            answerArray[i]['incorrectCount'] + 1;
        return true; // stop searching
      }
    });

    // if not found
    if (!found) {
      answerArray.push({
        questionId: ques.quesId,
        correctCount: ques.correctAnswer ? 1 : 0,
        incorrectCount: ques.incorrectAnswer ? 1 : 0
      });
    }
  }

  questionResponse[quizCategory] = answerArray; // Update answerArray
  await questionResponse.save(); // save questionResponse object
  res.json({
    submissionSuccess: 'Your Quiz response was submitted successfully'
  });
};
