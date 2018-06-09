const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Question = mongoose.model('Question');
const QuestionResponse = mongoose.model('QuestionResponse');
const { MODERATOR_LEVEL } = require('../constants/accessLevel');

// Get a list of questions for a given category
exports.getQuestions = async (req, res) => {
  const category = req.params.category;
  let page = req.params.page || 1;
  let limit = 5;
  let skip = page * limit - limit;

  const questionsPromise = Question.find({ category, published: true })
    .skip(skip)
    .limit(limit);

  const countPromise = Question.count({ category });

  let [questions, count] = await Promise.all([questionsPromise, countPromise]);

  const pages = Math.ceil(count / limit);

  // Page no exceeded than highest page no.
  if (!questions.length && skip) {
    // set page to last page no
    page = pages;
    skip = page * limit - limit;

    questions = await Question.find({ category })
      .skip(skip)
      .limit(limit)
      .sort({ index: 'asc' });

    return res.json({ questions, pages });
  }

  res.json({ questions, pages });
};

exports.addQuestion = async (req, res) => {
  // Check if the user has MODERATER_ACCESS_LEVEL
  if (req.user.accessLevel < MODERATOR_LEVEL) {
    return res.status(401).json({
      quesSubmissionError: "You dont' have permission to add a question."
    });
  }
  const question = await new Question(req.body).save();
  res.json({
    quesSubmissionSuccess: 'Question Submission Successful!'
  });
};

// Sumbit response of a question
// req.body = {quesId, category, correctAns}
exports.submitQuestion = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ notLoggedIn: 'You need to be logged in!' });
  }

  const questionCategory = req.body.category;
  let questionResponse;

  // if questionResponse exists for the current user
  // fetch questionResponse object
  if (req.user.questionResponse) {
    questionResponse = await QuestionResponse.findById(
      req.user.questionResponse
    ).select(questionCategory);
  } else {
    // otherwise create a new questionResponse object
    questionResponse = await new QuestionResponse().save();
    req.user.questionResponse = questionResponse._id;
    req.user.save(); // save the user
  }

  const answerArray = questionResponse[questionCategory];

  if (!answerArray) {
    return res
      .status(400)
      .json({ invalidCategory: 'Invalid question category' });
  }

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
      incorrectCount: !req.body.correctAnswer ? 1 : 0
    });
  }

  questionResponse[questionCategory] = answerArray; // Update answerArray
  await questionResponse.save(); // save questionResponse object
  res.json({ submissionSuccess: 'Submission successful!' });
};
