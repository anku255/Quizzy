const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const ObjectId = mongoose.Types.ObjectId;
const { Schema } = mongoose;
const { CATEGORY1, CATEGORY2 } = require('../constants/categories');

const questionResponseSchema = new Schema({
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

questionResponseSchema.statics.getQuestionsCount = function(
  questionResponseId,
  category
) {
  return new Promise(resolve => {
    this.aggregate([
      {
        $match: {
          _id: ObjectId(questionResponseId)
        }
      },
      {
        $project: {
          _id: 0,
          noOfQuestions: { $size: `$${category}` }
        }
      }
    ]).exec((err, response) => {
      const result = response[0].noOfQuestions;
      resolve(result);
    });
  });
};

module.exports = mongoose.model('QuestionResponse', questionResponseSchema);
