const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    content: String,
    sender: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    recipient: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

messageSchema.set('toJSON', {
  transform: (doc, returnObj) => {
    returnObj.id = returnObj._id.toString()
    delete returnObj._id
    delete returnObj.__v
  },
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
