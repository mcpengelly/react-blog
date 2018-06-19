const express = require('express')
const morgan = require('morgan')
const path = require('path')

const server = express()

// Middleware: logger
server.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version"' +
      ':status :res[content-length] :response-time ms'
  )
)

// Middleware: Serve static assets
server.use(express.static(path.resolve(__dirname, '..', 'build')))
server.use(express.static(path.join(__dirname, '/uploads')))

// Database setup
const database = require('./database')

// Authentication
require('./auth')(server, database)

// Routing
require('./routes.js')(server, database)

module.exports = server
