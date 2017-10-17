const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const app = express();
const router = express.Router();
const debug = require('debug')('bootstrap');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * if need to serve static files, make public folder on root folder and uncomment next line
 */
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', index(router));

/**
 * catch 404 and forward to error handler
 */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * error handler
 */
app.use((err, req, res, next) => {
  debug(`Error handler executed : ${err}`);
  res.sendStatus(err.status || 500);
});

module.exports = app;
