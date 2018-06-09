const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Question = mongoose.model('Question');
const Quiz = mongoose.model('Quiz');
const CurrentQuiz = mongoose.model('CurrentQuiz');
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

// Publish all the questions in a quiz
exports.publishQuiz = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ notLoggedIn: 'You need to be logged in!' });
  }

  // Check if the user has ADMIN_ACCESS_LEVEL
  if (req.user.accessLevel !== ADMIN_LEVEL) {
    return res.status(401).json({
      accessDenied: "You dont' have required permission."
    });
  }

  const { questions } = req.body;
  if (!questions) {
    return res.status(400).json({ noQuestions: 'No questions found in quiz' });
  }

  const criteria = {
    _id: { $in: questions }
  };

  const result = await Question.update(
    criteria,
    { published: true },
    { multi: true }
  );

  res.json({ published: 'Quiz published successfully!' });
};

// Set current quiz
// a quiz will be present in req.body
// req.body._id will give the id of the quiz
exports.setCurrentQuiz = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ notLoggedIn: 'You need to be logged in!' });
  }

  // Check if the user has ADMIN_ACCESS_LEVEL
  if (req.user.accessLevel !== ADMIN_LEVEL) {
    return res.status(401).json({
      accessDenied: "You dont' have required permission."
    });
  }

  // get currentQuiz from DB
  const currentQuiz = await CurrentQuiz.findOne();

  // Update it's currentQuizId if req.body has an _id property
  if (req.body._id) {
    currentQuiz['currentQuizId'] = req.body._id;
    currentQuiz.save();
  }
  res.json({ message: 'Current Quiz Changed Successfully!' });
};
