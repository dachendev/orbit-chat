const sseMiddleware = require('./sseMiddleware')
const eventRoutes = require('express').Router()

eventRoutes.use(sseMiddleware())

eventRoutes.get('/', (request, response) => {
  setInterval(() => {
    response.sse.data('success!')
    response.sse.dispatch()
  }, 5000)
})

module.exports = eventRoutes
