const userRoutes = require('express').Router()
const User = require('../../shared/User')

userRoutes.get('/', async (request, response) => {
  const users = await User.find()

  response.json(users)
})

module.exports = userRoutes
