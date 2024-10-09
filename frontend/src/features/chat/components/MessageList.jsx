import { useAuthUserContext } from '@/features/auth'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import Message from './Message'
import './MessageList.css'

const MessageList = ({ messageGroups }) => {
  const [authUser] = useAuthUserContext()

  return (
    <div className="message-list">
      {messageGroups.map((group) => {
        const date = format(group.date, 'M/d/yyyy')
        return (
          <Fragment key={date}>
            <div className="message-list__date-separator">{date}</div>
            {group.messages.map((message) => (
              <div key={message.id} className="message-list__item">
                <Message
                  message={message}
                  isSender={message.sender === authUser.id}
                />
              </div>
            ))}
          </Fragment>
        )
      })}
    </div>
  )
}

MessageList.displayName = 'MessageList'

MessageList.propTypes = {
  messageGroups: PropTypes.array,
}

export default MessageList
