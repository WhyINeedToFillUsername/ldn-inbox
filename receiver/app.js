var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config');
const auth = require('./auth');
var apiRouter = require('./routes/api');
const cors = require('cors');

var app = express();

app.disable('x-powered-by');

app.use(logger('dev'));
app.use(express.json({ type: config.ACCEPTED_CONTENT_TYPES })); // use built-in middleware to parse JSON requests (only the supplied types)
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS
var corsOptions = {
  origin: true, // reflect the request origin
  credentials: true // require credentials
};
app.use(cors(corsOptions));

app.use(auth.authorize);
app.use(config.ENDPOINT_URL, apiRouter);

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
  res.send('error');
});

module.exports = app;