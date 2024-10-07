const authRoutes = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../../shared/User')
const jwt = require('jsonwebtoken')

authRoutes.post('/register', async (request, response) => {
  const { username, password } = request.body

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await User.create({
    username,
    passwordHash,
  })

  response.status(201).json(user)
})

authRoutes.post('/login', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCheck =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCheck)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const payload = {
    id: user._id,
    username: user.username,
  }

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 })

  response.json({ token, id: user._id, username: user.username })
})

module.exports = authRoutes
