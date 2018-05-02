const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const quizSchema = new Schema({
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  startIndex: {
    type: Number,
    required: true
  },
  endIndex: {
    type: Number,
    required: true
  },
  description: String
});

quizSchema.plugin(autoIncrement.plugin, { model: 'Quiz', field: 'index' });

module.exports = mongoose.model('Quiz', quizSchema);
