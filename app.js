const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

// Use bodyParser to put raw req properties at req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handle routes
app.use("/", routes);

module.exports = app;
