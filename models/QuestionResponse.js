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

questionResponseSchema.statics.getStatsByCategory = function(
  questionResponseId,
  category,
  correctCount,
  incorrectCount
) {
  let andConditionArray = [];

  if (correctCount && incorrectCount) {
    andConditionArray = [
      { $eq: ['$$category.correctCount', correctCount] },
      { $eq: ['$$category.incorrectCount', incorrectCount] }
    ];
  }

  if (correctCount && !incorrectCount) {
    andConditionArray = [{ $eq: ['$$category.correctCount', correctCount] }];
  }

  if (incorrectCount && !correctCount) {
    andConditionArray = [
      { $eq: ['$$category.incorrectCount', incorrectCount] }
    ];
  }

  // Return a Promise
  return new Promise(resolve => {
    this.aggregate([
      {
        $match: {
          _id: ObjectId(questionResponseId)
        }
      },
      {
        $project: {
          category1: {
            $filter: {
              input: `$${category}`,
              as: 'category',
              cond: {
                $and: andConditionArray
              }
            }
          }
        }
      }
    ]).exec((err, result) => {
      // populate questionId field
      this.populate(
        result,
        { path: `${category}.questionId` },
        (err, newResult) => {
          // extract the array of question from newResult
          let questions = newResult[0][category];
          // questions array is an array of object which contains
          // properties like correctCount. Map over it to keep only the questions
          questions = questions.map(obj => obj.questionId);
          // resolve the promise
          resolve(questions);
        }
      );
    });
  });
};

module.exports = mongoose.model('QuestionResponse', questionResponseSchema);
