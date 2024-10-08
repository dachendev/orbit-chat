const sseMiddleware = require('./sseMiddleware')
const eventRoutes = require('express').Router()

eventRoutes.use(sseMiddleware)

eventRoutes.get('/', (request, response) => {
  setTimeout(() => {
    response.sse.send('ping')
  })
})

module.exports = eventRoutes
