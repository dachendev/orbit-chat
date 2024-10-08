import axios from 'axios'

const baseUrl = '/api/messages'

export const createMessage = async (newMessage) => {
  const response = await axios.post(baseUrl, newMessage)
  const message = response.data
  return {
    ...message,
    createdAt: new Date(message.createdAt),
    updatedAt: new Date(message.updateAt),
  }
}

export const getMessages = async (user1, user2) => {
  const response = await axios.get(baseUrl, {
    params: {
      user1,
      user2,
    },
  })

  return response.data.map((message) => ({
    ...message,
    createdAt: new Date(message.createdAt),
    updatedAt: new Date(message.updatedAt),
  }))
}
