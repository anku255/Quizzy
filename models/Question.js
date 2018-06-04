const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
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
  ansDescription: String,
  semester: Number,
  category: String,
  published: {
    type: Boolean,
    default: false
  }
});

questionSchema.plugin(autoIncrement.plugin, {
  model: 'Question',
  field: 'index'
});

module.exports = mongoose.model('Question', questionSchema);
