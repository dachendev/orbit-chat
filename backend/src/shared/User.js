const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  passwordHash: String,
})

userSchema.set('toJSON', {
  transform: (doc, returnObj) => {
    returnObj.id = returnObj._id.toString()
    delete returnObj._id
    delete returnObj.__v
    // password hash should not be revealed
    delete returnObj.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
