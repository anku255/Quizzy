const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Question = mongoose.model('Question');

exports.addQuestion = async (req, res) => {
  const question = await new Question(req.body).save();
  res.json(question);
};
