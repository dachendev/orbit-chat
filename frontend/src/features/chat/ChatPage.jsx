import Navbar from '@/shared/Navbar'
import { useAuthUserContext } from '@features/auth'
import { useEffect, useState } from 'react'
import './ChatPage.css'
import Chat from './components/Chat'
import RecipientList from './components/RecipientList'
import { getUsers } from './services/userService'
import { useNavigate, useParams } from 'react-router-dom'

const ChatPage = () => {
  const recipientId = useParams().recipientId
  const [authUser] = useAuthUserContext()
  const [recipients, setRecipients] = useState([])
  const navigate = useNavigate()

  const selectedRecipient = recipientId
    ? recipients.find((p) => p.id === recipientId)
    : null

  useEffect(() => {
    getUsers()
      .then((users) => users.filter((p) => p.id !== authUser.id))
      .then((otherUsers) => {
        setRecipients(otherUsers)
      })
  }, [])

  const onRecipientClick = (recipient) => {
    navigate(`/chat/${recipient.id}`)
  }

  return (
    <>
      <Navbar />
      <div className="chat-layout">
        <div className="chat-layout__sidebar">
          <RecipientList
            recipients={recipients}
            onRecipientClick={onRecipientClick}
          />
        </div>
        <div className="chat-layout__main">
          {selectedRecipient ? (
            <Chat recipient={selectedRecipient} />
          ) : (
            <div>Select a recipient to get started!</div>
          )}
        </div>
      </div>
    </>
  )
}

export default ChatPage
