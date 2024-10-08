const messageRoutes = require('./features/chat/messageRoutes')
const userRoutes = require('./features/users/userRoutes')
const eventRoutes = require('./features/events/eventRoutes')

const apiRoutes = require('express').Router()

apiRoutes.use('/messages', messageRoutes)
apiRoutes.use('/users', userRoutes)
apiRoutes.use('/events', eventRoutes)

module.exports = apiRoutes
