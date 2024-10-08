import classNames from 'classnames'
import PropTypes from 'prop-types'
import './Message.css'

const Message = ({ message, isSender }) => {
  const messageClasses = classNames(
    'message',
    isSender ? 'message--sender' : 'message--recipient'
  )

  const time = message.createdAt.toLocaleTimeString([], {
    hour: 'numeric',
    minute: 'numeric',
  })

  return (
    <div className={messageClasses}>
      <div className="message__content">{message.content}</div>
      <span className="message__time">{time}</span>
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.object,
  isSender: PropTypes.bool,
}

export default Message
