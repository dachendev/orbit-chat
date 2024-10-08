import { useEffect, useState } from 'react'
import { useAuthUserContext } from '@features/auth'
import Chat from './components/Chat'
import { getUsers } from './services/userService'
import AppLayout from '@shared/AppLayout'

const ChatPage = () => {
  const [authUser] = useAuthUserContext()
  const [recipients, setRecipients] = useState([])
  const [selectedRecipient, setSelectedRecipient] = useState('')

  useEffect(() => {
    getUsers()
      .then((users) => users.filter((p) => p.id !== authUser.id))
      .then((otherUsers) => {
        setRecipients(otherUsers)
      })
  }, [])

  return (
    <AppLayout>
      <h2>chat</h2>
      <p>
        recipient:
        <select
          value={selectedRecipient}
          onChange={(e) => setSelectedRecipient(e.target.value)}
        >
          <option value="">Select</option>
          {recipients.map((user, index) => (
            <option key={user.id} value={index}>
              {user.username}
            </option>
          ))}
        </select>
      </p>
      {selectedRecipient && (
        <Chat recipient={recipients[Number(selectedRecipient)]} />
      )}
    </AppLayout>
  )
}

export default ChatPage
