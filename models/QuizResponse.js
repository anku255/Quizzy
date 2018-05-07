const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { Schema } = mongoose;
const { CATEGORY1, CATEGORY2 } = require('../constants/categories');

const quizResponseSchema = new Schema({
  [CATEGORY1]: [
    new Schema(
      {
        questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
        correctCount: Number,
        incorrectCount: Number
      },
      { _id: false }
    )
  ],
  [CATEGORY2]: [
    new Schema(
      {
        questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
        correctCount: Number,
        incorrectCount: Number
      },
      { _id: false }
    )
  ]
});

module.exports = mongoose.model('QuizResponse', quizResponseSchema);
