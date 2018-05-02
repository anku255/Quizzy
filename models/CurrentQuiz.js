const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const currentQuizSchema = new Schema({
  currentQuizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz'
  }
});

module.exports = mongoose.model('CurrentQuiz', currentQuizSchema);
