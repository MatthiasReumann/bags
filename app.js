const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimit = require("express-rate-limit");
const logger = require('morgan');

const db = require('./models/db');

const itemRouter = require('./routes/itemRouter');
const userRouter = require('./routes/userRouter');

const app = express();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 50 // limit each IP to 100 requests per windowMs
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(limiter);

app.use('/items', itemRouter);
app.use('/users', userRouter);

// error handling middleware
// returns a json object with an attribute containg the 
// error message. 
app.use(function(error, req, res, next){
  if(!error.statusCode) error.statusCode = 500;

  return res
    .status(error.statusCode)
    .json({error: error.toString() });
})

module.exports = app;
