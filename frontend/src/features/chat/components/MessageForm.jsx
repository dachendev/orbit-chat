import { Button } from '@/features/ui'
import PropTypes from 'prop-types'
import { useState } from 'react'
import './MessageForm.css'

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
        <div className="message-form__input-group">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type a message..."
          />
          <Button type="submit">send</Button>
        </div>
      </form>
    </div>
  )
}

MessageForm.propTypes = {
  onSend: PropTypes.func,
}

export default MessageForm
