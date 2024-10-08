import { useAuthUserContext } from '@/features/auth'
import PropTypes from 'prop-types'
import { forwardRef, Fragment, useImperativeHandle, useRef } from 'react'
import Message from './Message'
import './MessageList.css'
import { format, formatRelative } from 'date-fns'

const MessageList = forwardRef(({ messageGroups }, ref) => {
  const [authUser] = useAuthUserContext()
  const bottomRef = useRef(null)

  useImperativeHandle(ref, () => ({
    scrollToBottom: () => bottomRef.current.scrollIntoView(),
  }))

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
                  isSender={message.sender.id === authUser.id}
                />
              </div>
            ))}
          </Fragment>
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
})

MessageList.displayName = 'MessageList'

MessageList.propTypes = {
  messageGroups: PropTypes.array,
}

export default MessageList
