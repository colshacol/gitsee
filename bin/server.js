#!/usr/bin/env node

const app = require('../app')
const debug = require('debug')('nusync_server:server')
const http = require('http')
const mongo = require('mongojs')
// const token = require('./token')
const db = mongo(
  `mongodb://gitsee:MarleyMC__14@ds019746.mlab.com:19746/gitsee`,
  ['repos']
)

const schedule = require('node-schedule')
const githubBlast = require('./schedule')
const fs = require('fs')

const removeDuplicates = require('./dbRemove')

const port = process.env.PORT || 1234;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1);
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1);
      break
    default:
      throw error
  }
}

function onListening() {
  githubBlast()

  // removeDuplicates('9/17/2016')

  setInterval(() => {
    http.get('http://gitsee.herokuapp.com/', (res) => {
      console.log('AWAKEN, MY DEMONS!')
    })
  }, 300000)

  const date = new Date(),
    time = ((date.getHours() > 12)
      ? date.getHours() - 12
      : date.getHours())
      + `:${date.getMinutes()}`;

  console.log(`\n> SERVER START: ${time} | Listening @ http://127.0.0.1:${port}\n`);

  // db.repos.drop();
};
