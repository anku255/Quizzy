const mongoose = require('mongoose');
const Quiz = mongoose.model('Quiz');
const CurrentQuiz = mongoose.model('CurrentQuiz');
const Question = mongoose.model('Question');

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
  console.log('inside sumbit route');
  
  res.send(req.user);
};
