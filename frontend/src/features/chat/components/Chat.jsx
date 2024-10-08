import { useAuthUserContext } from '@features/auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { groupMessages } from '../messageUtils'
import { createMessage, getMessages } from '../services/messageService'
import './Chat.css'
import MessageForm from './MessageForm'
import MessageList from './MessageList'

const Chat = ({ recipient }) => {
  const [authUser] = useAuthUserContext()
  const queryClient = useQueryClient()

  const queryKey = ['messages', authUser.id, recipient.id]

  const newMessageMutation = useMutation({
    mutationFn: createMessage,
    onSuccess: (newMessage) => {
      const messages = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, messages.concat(newMessage))
    },
  })

  const onSend = (content) => {
    newMessageMutation.mutate({
      content,
      sender: authUser.id,
      recipient: recipient.id,
    })
  }

  const result = useQuery({
    queryKey,
    queryFn: () => getMessages(authUser.id, recipient.id),
  })

  const messageGroups = groupMessages(result.data || [])

  return (
    <div className="chat">
      <div className="chat__header">
        <strong>{recipient.username}</strong>
      </div>
      <div className="chat__body">
        <MessageList messageGroups={messageGroups} />
      </div>
      <div className="chat__footer">
        <MessageForm onSend={onSend} />
      </div>
    </div>
  )
}

Chat.propTypes = {
  recipient: PropTypes.object.isRequired,
}

export default Chat
