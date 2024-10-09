import { useAuthUserContext } from '@/features/auth'
import axios from 'axios'
import { formatMessageData } from '../messageUtils'
import { EventSourcePolyfill } from 'event-source-polyfill'

const baseUrl = '/api/messages'

export const useMessageService = () => {
  const [authUser] = useAuthUserContext()

  const config = {
    headers: {
      Authorization: `Bearer ${authUser.token}`,
    },
  }

  const send = async ({ content, recipientId }) =>
    axios
      .post(baseUrl, { content, recipientId }, config)
      .then((response) => formatMessageData(response.data))

  const history = async (otherUserId) =>
    axios
      .get(`${baseUrl}/history/${otherUserId}`, config)
      .then((response) => response.data.map(formatMessageData))

  const stream = (senderId) =>
    new EventSourcePolyfill(`${baseUrl}/stream/${senderId}`, config)

  return {
    send,
    history,
    stream,
  }
}
