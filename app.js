var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var itemRouter = require('./routes/items')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shopping', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("database connected");
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', itemRouter);

module.exports = app;
