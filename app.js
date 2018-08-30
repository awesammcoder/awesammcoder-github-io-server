var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var pretty = require('express-prettify');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(pretty({query: 'pretty'}));

app.use('/api/v1/', apiRouter);
app.use('/', indexRouter);

app.use(function(req, res, next){
  res.status(404);

  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
});

module.exports = app;
