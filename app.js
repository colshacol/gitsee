const
  express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  write = require('write')

const
  index = require('./routes/index'),
  repos = require('./routes/repos'),
  status = require('./routes/status'),
  users = require('./routes/users'),
  search = require('./routes/search')

const app = express()

app.use(
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  cookieParser(),
  express.static(`public`)
)

app.use(static)
app.use('/', index)
app.use('/repos', repos)
app.use('/status', status)
app.use('/users', users)
app.use('/search', search)
app.use('*', index)

function static(req, res, next) {
  const match = /((scripts|styles|images|assets)\/\w*\.(svg|js|html|css|png|jpg|jpeg))/
  if (req.url.match(match)) return res.sendFile(`public/${req.url.match(match)[0]}`, {root: './'})
  else next()
}

module.exports = app
