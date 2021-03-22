const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const db = require('./models/db');

const itemRouter = require('./routes/itemRouter')

const app = express();

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
