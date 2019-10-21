var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
const config = require('./config');
const session = require('express-session');

var indexRouter = require('./routes/index');
var notificationRouter = require('./routes/notification');
var testSolidAuthRouter = require('./routes/testSolidAuth');

var app = express();

app.disable('x-powered-by'); // disable default header

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs'); // set handlebars as the render view engine
hbs.registerPartials(__dirname + '/views/partials'); // register partials like menu, error...


app.use(logger('dev'));

app.use(express.json({ type: config.ACCEPTED_CONTENT_TYPES }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'TODOchange', saveUninitialized: false, resave: false})); //TODO change secret

app.use('/', indexRouter);
app.use('/', notificationRouter);
app.use('/testSolidAuth', testSolidAuthRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;