const messageRoutes = require('express').Router()
const Message = require('./Message')
const sseMiddleware = require('./sseMiddleware')
const { createPubSub } = require('./pubSub')

const messageEvents = createPubSub()

messageRoutes.post('/', async (request, response) => {
  const { content, recipientId } = request.body
  const senderId = request.user.id

  const newMessage = {
    content,
    sender: senderId,
    recipient: recipientId,
  }

  const message = await Message.create(newMessage)

  messageEvents.publish(`user:${recipientId}:from:${senderId}`, message)

  response.status(201).json(message)
})

messageRoutes.get('/history/:otherUserId', async (request, response) => {
  const userId = request.user.id
  const otherUserId = request.params.otherUserId

  const messages = await Message.find({
    $or: [
      { sender: userId, recipient: otherUserId },
      { sender: otherUserId, recipient: userId },
    ],
  }).sort({ createdAt: 1 })

  response.json(messages)
})

messageRoutes.get('/stream/:senderId', sseMiddleware(), (request, response) => {
  const userId = request.user.id
  const senderId = request.params.senderId

  const topic = `user:${userId}:from:${senderId}`

  messageEvents.subscribe(topic, (message) => {
    response.sse.data(message)
  })

  response.sse.comment(`Subscribed to messages from user ${senderId}`)

  request.on('close', () => {
    messageEvents.unsubscribe(topic)
  })
})

module.exports = messageRoutes
