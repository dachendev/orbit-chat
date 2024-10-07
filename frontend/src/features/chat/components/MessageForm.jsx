import { useState } from 'react'
import PropTypes from 'prop-types'

const MessageForm = ({ onSend }) => {
  const [content, setContent] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    onSend(content)
    setContent('')
  }

  return (
    <div className="message-form">
      <form onSubmit={onSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">send</button>
        </div>
      </form>
    </div>
  )
}

MessageForm.propTypes = {
  onSend: PropTypes.func,
}

export default MessageForm
