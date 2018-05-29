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
    return res.json({ questions: [], pages: 1 });
  }

  const category = req.params.category;
  let page = req.params.page || 1;
  let limit = 5;
  let skip = page * limit - limit;

  const questionsPromise = QuestionResponse.find(
    { _id: questionResponseId },
    { category: 1, [category]: { $slice: [skip, skip + limit] } }
  ).populate(`${category}.questionId`);

  const countPromise = QuestionResponse.getQuestionsCount(
    questionResponseId,
    category
  );

  let [response, count] = await Promise.all([questionsPromise, countPromise]);

  let questions = response[0][category];

  let pages = Math.ceil(count / limit);

  if (pages === 0) pages = 1; // pages shouldn't be 0

  // Page no exceeded than highest page no.
  if (!questions.length && skip) {
    // set page to last page no
    page = pages;
    skip = page * limit - limit;

    response = await QuestionResponse.find(
      { _id: questionResponseId },
      { category: 1, [category]: { $slice: [skip, skip + limit] } }
    ).populate(`${category}.questionId`);

    questions = response[0][category];

    return res.json({ questions, pages });
  }

  res.json({ questions, pages });
};
