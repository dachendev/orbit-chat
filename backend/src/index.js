require('dotenv/config')
const mongoose = require('mongoose')
const express = require('express')
const authRoutes = require('./features/auth/authRoutes')
const apiRoutes = require('./apiRoutes')

const app = express()
const port = process.env.PORT || 3001

mongoose.connect(process.env.MONGODB_URI)

// middleware
app.use(express.json())

// routes
app.use('/api', authRoutes)
app.use('/api', apiRoutes)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
