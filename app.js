const express = require('express');
      path = require('path'),
      favicon = require('serve-favicon'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser')

const routes = require('./routes/index'),
      repos = require('./routes/repos'),
      webpack = require('./routes/webpack'),
      status = require('./routes/status')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(`${__dirname}/public`))

app.use('/', routes)
app.use('/repos', repos)
app.use('/webpack', webpack)
app.use('/status', status)

app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404;
  next(err)
});

module.exports = app;
