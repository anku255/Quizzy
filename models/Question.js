const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const questionSchema = new Schema({
  text: { type: String, required: true },
  choices: {
    type: [String],
    required: true
  },
  correctAnsIndex: {
    type: Number,
    required: true
  },
  ansDescription: String
});

module.exports = mongoose.model('Question', questionSchema);