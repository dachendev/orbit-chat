const Message = require('./Message')
const { expressSSE } = require('./expressSSE')
const messageRouter = require('express').Router()
const messageSSE = expressSSE(messageRouter)

messageRouter.post('/', async (request, response) => {
  const { content, recipientId } = request.body
  const senderId = request.user.id

  const newMessage = {
    content,
    sender: senderId,
    recipient: recipientId,
  }

  const message = await Message.create(newMessage)
  messageSSE.publish(`user:${recipientId}:from:${senderId}`, message)

  response.status(201).json(message)
})

messageRouter.get('/history/:otherUserId', async (request, response) => {
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

messageRouter.sse('/stream/:senderId', (sse, req, res) => {
  const userId = req.user.id
  const senderId = req.params.senderId

  const topic = `user:${userId}:from:${senderId}`

  sse.subscribe(topic, (message) => {
    sse.send(message)
  })

  sse.comment(`Subscribed to messages from user ${senderId}`)
})

module.exports = messageRouter
