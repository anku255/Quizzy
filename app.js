const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path');
const routes = require('./routes');
require('./services/passport');

const app = express();

// Extracts the cookie information from request and
// puts it into req.session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);

app.use(compression());

app.use(passport.initialize());
app.use(passport.session());

// Use bodyParser to put raw req properties at req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handle routes
app.use('/', routes);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
