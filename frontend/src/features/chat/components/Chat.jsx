import PropTypes from 'prop-types'
import { Fragment, useEffect, useState } from 'react'
import { useAuthUserContext } from '@features/auth'
import { groupMessages } from '../messageUtils'
import { getMessages, sendMessage } from '../services/messageService'
import MessageForm from './MessageForm'
import Message from './Message'

const Chat = ({ recipient }) => {
  const [authUser] = useAuthUserContext()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages(authUser.id, recipient).then((messages) =>
      setMessages(messages)
    )
  }, [authUser, recipient])

  const onSend = (content) => {
    const newMessage = {
      content,
      sender: authUser.id,
      recipient,
    }

    sendMessage(newMessage)
  }

  const messageGroups = groupMessages(messages)

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messageGroups.map((group) => {
          const dateString = group.date.toLocaleDateString()
          return (
            <Fragment key={dateString}>
              <div className="date-separator">{dateString}</div>
              {group.messages.map((message) => (
                <Message
                  key={message.id}
                  message={message}
                  isCurrentUser={message.sender.id === authUser.id}
                />
              ))}
            </Fragment>
          )
        })}
      </div>
      <MessageForm onSend={onSend} />
    </div>
  )
}

Chat.propTypes = {
  recipient: PropTypes.string.isRequired,
}

export default Chat
