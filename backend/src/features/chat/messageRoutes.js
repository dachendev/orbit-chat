const messageRoutes = require('express').Router()
const Message = require('./Message')

messageRoutes.post('/', async (request, response) => {
  const message = await Message.create(request.body)

  // populate
  await message.populate('sender')
  await message.populate('recipient')

  return response.status(201).json(message)
})

messageRoutes.get('/', async (request, response) => {
  const { user1, user2 } = request.query

  const messages = await Message.find({
    $or: [
      { sender: user1, recipient: user2 },
      { sender: user2, recipient: user1 },
    ],
  })
    .sort({ createdAt: 1 })
    .populate('sender')
    .populate('recipient')

  response.json(messages)
})

module.exports = messageRoutes
