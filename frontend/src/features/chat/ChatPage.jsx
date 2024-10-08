import Navbar from '@/shared/Navbar'
import { useAuthUserContext } from '@features/auth'
import { useEffect, useState } from 'react'
import './ChatPage.css'
import Chat from './components/Chat'
import RecipientList from './components/RecipientList'
import { getUsers } from './services/userService'

const ChatPage = () => {
  const [authUser] = useAuthUserContext()
  const [recipients, setRecipients] = useState([])
  const [selectedRecipient, setSelectedRecipient] = useState(null)

  useEffect(() => {
    getUsers()
      .then((users) => users.filter((p) => p.id !== authUser.id))
      .then((otherUsers) => {
        setRecipients(otherUsers)
      })
  }, [])

  const onRecipientClick = (recipient) => {
    setSelectedRecipient(recipient)
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
          {selectedRecipient && <Chat recipient={selectedRecipient} />}
        </div>
      </div>
    </>
  )
}

export default ChatPage
