const mongoose = require('mongoose');
const Quiz = mongoose.model('Quiz');
const CurrentQuiz = mongoose.model('CurrentQuiz');
const Question = mongoose.model('Question');
const QuizResponse = mongoose.model('QuizResponse');

// Returns the list of questions for the current Quiz
exports.getCurrentQuiz = async (req, res) => {
  // get the current Quiz object
  let currentQuiz = await CurrentQuiz.findOne().populate('currentQuizId');
  currentQuiz = currentQuiz.currentQuizId;

  // fetch questions
  const questions = await Question.find()
    .skip(currentQuiz.startIndex)
    .limit(currentQuiz.endIndex - currentQuiz.startIndex);

  res.json(questions);
};

// Create a new Quiz
exports.addQuiz = async (req, res) => {
  const newQuiz = await new Quiz({
    startTime: new Date(req.body.startTime),
    endTime: new Date(req.body.endTime),
    startIndex: req.body.startIndex,
    endIndex: req.body.endIndex,
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
    return res.json({ message: 'User has already submitted!', error: true });
  else {
    req.user.lastSubmission = currentQuiz._id.toString();
    req.user.save();
  }

  // Right Now, Only one category per quiz is supported
  const quizCategory = req.body[0]['category'];

  let quizResponse;
  // if quizResponse exists for the current user
  // fetch quizResponse object
  if (req.user.quizResponse) {
    quizResponse = await QuizResponse.findById(req.user.quizResponse).select(
      quizCategory
    );
  } else {
    // otherwise create a new quizResponse object
    quizResponse = await new QuizResponse().save();
    req.user.quizResponse = quizResponse._id;
    req.user.save(); // save the user
  }

  const answerArray = quizResponse[quizCategory];

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

  quizResponse[quizCategory] = answerArray; // Update answerArray
  await quizResponse.save(); // save quizResponse object
  res.json({ message: 'success', error: false });
};
