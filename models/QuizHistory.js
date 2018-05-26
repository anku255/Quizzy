const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const quizHistorySchema = new Schema({
  quizIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Quiz'
    }
  ],
  userResponses: [
    {
      type: Schema.Types.Mixed
    }
  ]
});

module.exports = mongoose.model('QuizHistory', quizHistorySchema);
