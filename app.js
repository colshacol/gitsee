const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const write = require('write')

const index = require('./routes/index')
const repos = require('./routes/repos')
const status = require('./routes/status')
const users = require('./routes/users')
const search = require('./routes/search')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(`public`))

app.use(static)
app.use('/', index)
app.use('/repos', repos)
app.use('/status', status)
app.use('/users', users)
app.use('/search', search)
app.use('*', index)

function static(req, res, next) {
  if (req.url.match(/((scripts|styles|images|assets)\/\w*\.(svg|js|html|css|png|jpg|jpeg))/)) {
    const match = req.url.match(/((scripts|styles|images|assets)\/\w*\.(svg|js|html|css|png|jpg|jpeg))/)[0]
    console.log(`File requested: ${match}`)
    res.sendFile(`public/${match}`, {root: './'})
    return;
  }
  next()
}

module.exports = app;
