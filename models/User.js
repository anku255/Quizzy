const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  semester: Number,
  answered: [
    {
      questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
      correctCount: Number
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
