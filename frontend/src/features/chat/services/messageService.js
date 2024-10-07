import axios from 'axios'

const baseUrl = '/api/messages'

export const sendMessage = (newMessage) =>
  axios.post(baseUrl, newMessage).then((response) => response.data)

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
