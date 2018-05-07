const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  semester: Number,
  quizResponse: {
    type: Schema.Types.ObjectId,
    ref: 'QuizResponse'
  }
});

module.exports = mongoose.model('User', userSchema);
