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
app.use(function(error, req, res, next){
  if(!error.statusCode) error.statusCode = 500;

  return res
    .status(error.statusCode)
    .json({error: error.toString() });
})

module.exports = app;
