const messageRoutes = require('./features/chat/messageRoutes')
const userRoutes = require('./features/users/userRoutes')
const authMiddleware = require('./features/auth/authMiddleware')

const apiRoutes = require('express').Router()

// middleware
apiRoutes.use(authMiddleware)

// routes
apiRoutes.use('/messages', messageRoutes)
apiRoutes.use('/users', userRoutes)

module.exports = apiRoutes
