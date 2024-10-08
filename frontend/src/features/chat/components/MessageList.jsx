import { useAuthUserContext } from '@/features/auth'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import Message from './Message'
import './MessageList.css'
import { formatRelative } from 'date-fns'

const MessageList = ({ messageGroups }) => {
  const [authUser] = useAuthUserContext()

  return (
    <div className="message-list">
      {messageGroups.map((group) => {
        const date = formatRelative(group.date, new Date()).split(' at ')[0]
        return (
          <Fragment key={date}>
            <div className="message-list__date-separator">{date}</div>
            {group.messages.map((message) => (
              <div key={message.id} className="message-list__item">
                <Message
                  message={message}
                  isSender={message.sender.id === authUser.id}
                />
              </div>
            ))}
          </Fragment>
        )
      })}
    </div>
  )
}

MessageList.propTypes = {
  messageGroups: PropTypes.array,
}

export default MessageList
