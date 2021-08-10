// var createError = require('http-errors');
import createError from 'http-errors';
// var express = require('express');
import express, {Request, Response} from 'express';
// var path = require('path');
import path from 'path';
// var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';
// var logger = require('morgan');
import logger from 'morgan';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/company', indexRouter);
app.use("*", (req,res)=>{
  res.status(200).json({
    status: 'success',
     msg: "please use the /company route"
  })
})
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: Function) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: Function) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
// export default app;
