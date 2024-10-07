import PropTypes from 'prop-types'

const Message = ({ message, isCurrentUser }) => {
  return (
    <div
      className={`message ${
        isCurrentUser ? 'message-sent' : 'message-received'
      }`}
    >
      <div className="message-content">
        <span className="message-sender">{message.sender.username}</span>
        <span className="message-text">{message.content}</span>
        <span className="message-time">
          {message.createdAt.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.object,
  isCurrentUser: PropTypes.bool,
}

export default Message
