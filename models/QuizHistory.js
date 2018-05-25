const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const quizHistorySchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz'
  },
  userResponse: {
    type: Schema.Types.Mixed
  }
});

module.exports = mongoose.model('QuizHistory', quizHistorySchema);
