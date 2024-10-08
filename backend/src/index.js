require('dotenv/config')
const mongoose = require('mongoose')
const express = require('express')
const authRoutes = require('./features/auth/authRoutes')
const messageRoutes = require('./features/chat/messageRoutes')
const userRoutes = require('./features/users/userRoutes')

const app = express()
const port = process.env.PORT || 3001
const apiRoutes = express.Router()

mongoose.connect(process.env.MONGODB_URI)

// middleware
app.use(express.json())

// api
apiRoutes.use('/', authRoutes)
apiRoutes.use('/messages', messageRoutes)
apiRoutes.use('/users', userRoutes)

app.use('/api', apiRoutes)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
