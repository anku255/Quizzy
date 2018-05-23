const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const ObjectId = mongoose.Types.ObjectId;
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

quizResponseSchema.statics.getStatsByCategory = function(
  quizResponseId,
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
          _id: ObjectId(quizResponseId)
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
          // resolve the promise
          resolve(newResult);
        }
      );
    });
  });
};

module.exports = mongoose.model('QuizResponse', quizResponseSchema);
