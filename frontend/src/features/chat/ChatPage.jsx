import Navbar from '@/shared/Navbar'
import { useAuthUserContext } from '@features/auth'
import { useEffect, useState } from 'react'
import './ChatPage.css'
import Chat from './components/Chat'
import ContactList from './components/ContactList'
import { getUsers } from './services/userService'
import { useNavigate, useParams } from 'react-router-dom'

const ChatPage = () => {
  const recipientId = useParams().recipientId
  const [authUser] = useAuthUserContext()
  const [contacts, setContacts] = useState([])
  const navigate = useNavigate()

  const recipient = recipientId
    ? contacts.find((p) => p.id === recipientId)
    : null

  useEffect(() => {
    getUsers()
      .then((users) => users.filter((p) => p.id !== authUser.id))
      .then((otherUsers) => {
        setContacts(otherUsers)
      })
  }, [])

  const onContactClick = (contact) => {
    navigate(`/chat/${contact.id}`)
  }

  return (
    <>
      <Navbar />
      <div className="chat-layout">
        <div className="chat-layout__sidebar">
          <h3>contacts</h3>
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
            <div>Select a recipient to get started!</div>
          )}
        </div>
      </div>
    </>
  )
}

export default ChatPage
