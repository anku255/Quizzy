const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Question = mongoose.model('Question');
const Quiz = mongoose.model('Quiz');
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

// Create or Edit a  Quiz
exports.addQuiz = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ notLoggedIn: 'You need to be logged in!' });
  }

  // Check if the user has ADMIN_ACCESS_LEVEL
  if (req.user.accessLevel !== ADMIN_LEVEL) {
    return res.status(401).json({
      accessDenied: "You dont' have required permission."
    });
  }

  try {
    // Check if quiz contains an _id field
    if (req.body._id) {
      // Update the quiz
      const newQuiz = await Quiz.findByIdAndUpdate(req.body._id, {
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime),
        description: req.body.description || ''
      });

      res.json({
        quizEditSuccess: 'Quiz edited Successfully!',
        newQuiz
      });
    } else {
      // Create a new quiz
      const newQuiz = await new Quiz({
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime),
        questions: req.body.questions,
        description: req.body.description || ''
      }).save();

      res.json({
        quizSubmissionSuccess: 'Quiz Submission Successful!',
        newQuiz
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get quizzes
exports.getQuizzes = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ notLoggedIn: 'You need to be logged in!' });
  }

  // Check if the user has ADMIN_ACCESS_LEVEL
  if (req.user.accessLevel !== ADMIN_LEVEL) {
    return res.status(401).json({
      accessDenied: "You dont' have required permission."
    });
  }

  const quizzes = await Quiz.find()
    .sort({ startTime: -1 })
    .limit(5);

  res.json(quizzes);
};
