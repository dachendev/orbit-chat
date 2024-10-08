import { useAuthUserContext } from '@features/auth'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { groupMessages } from '../messageUtils'
import { getMessages, sendMessage } from '../services/messageService'
import MessageForm from './MessageForm'
import MessageList from './MessageList'
import './Chat.css'

const Chat = ({ recipient }) => {
  const [authUser] = useAuthUserContext()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages(authUser.id, recipient.id).then((messages) =>
      setMessages(messages)
    )
  }, [authUser, recipient])

  const onSend = (content) => {
    const newMessage = {
      content,
      sender: authUser.id,
      recipient: recipient.id,
    }

    sendMessage(newMessage)
  }

  const messageGroups = groupMessages(messages)

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
