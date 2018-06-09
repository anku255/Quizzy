const mongoose = require('mongoose');

// import environment variables
require('dotenv').config({ path: 'variables.env' });

// connect to the database
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  console.log(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// require models
require('./models/User');
require('./models/Question');
require('./models/Quiz');
require('./models/CurrentQuiz');
require('./models/QuestionResponse');
require('./models/QuizHistory');

// start the app
const app = require('./app');
app.set('port', process.env.PORT || 5555);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running ➡ PORT ${server.address().port} `);
});
