import { useAuthUserContext } from '@features/auth'
import { AppNavbar } from '@shared/app'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ChatPage.css'
import Chat from './components/Chat'
import ContactList from './components/ContactList'
import { useUserService } from './services/userService'

const ChatPage = () => {
  const recipientId = useParams().recipientId
  const [contacts, setContacts] = useState([])
  const userService = useUserService()
  const [authUser] = useAuthUserContext()
  const navigate = useNavigate()

  const recipient = recipientId
    ? contacts.find((p) => p.id === recipientId)
    : null

  useEffect(() => {
    userService
      .all()
      .then((users) => users.filter((p) => p.id !== authUser.id))
      .then((otherUsers) => {
        setContacts(otherUsers)
      })
  }, [])

  const onContactClick = (contact) => {
    navigate(`/chats/${contact.id}`)
  }

  return (
    <>
      <AppNavbar />
      <br />
      <div className="chat-layout">
        <div className="chat-layout__sidebar">
          <h2>Chats</h2>
          <br />
          <ContactList
            contacts={contacts}
            onContactClick={onContactClick}
            activeContactId={recipient ? recipient.id : null}
          />
        </div>
        <div className="chat-layout__main">
          {recipient ? (
            <Chat recipient={recipient} />
          ) : (
            <div>Select a contact to get started!</div>
          )}
        </div>
      </div>
    </>
  )
}

export default ChatPage
