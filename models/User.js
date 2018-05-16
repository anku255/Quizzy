const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { Schema } = mongoose;
const { USER_LEVEL } = require('../constants/accessLevel');

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  semester: Number,
  quizResponse: {
    type: Schema.Types.ObjectId,
    ref: 'QuizResponse'
  },
  lastSubmission: String,
  accessLevel: {
    type: Number,
    default: USER_LEVEL
  }
});

module.exports = mongoose.model('User', userSchema);
