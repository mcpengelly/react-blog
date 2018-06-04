const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')

const server = express()

// middlewares
// Setup logger
server.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version"' +
      ':status :res[content-length] :response-time ms'
  )
)

// Serve static assets
server.use(express.static(path.resolve(__dirname, '..', 'build')))
server.use(express.static(path.join(__dirname, '/uploads')))

// req body middleware
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

// routing
require('./routes.js')(server)

module.exports = server
