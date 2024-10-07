import { useEffect, useState } from 'react'
import { useAuthUserContext } from '@features/auth'
import Chat from './components/Chat'
import { getUsers } from './services/userService'
import AppLayout from '@shared/AppLayout'

const ChatPage = () => {
  const [authUser] = useAuthUserContext()
  const [otherUsers, setOtherUsers] = useState([])
  const [selectedRecipient, setSelectedRecipient] = useState('')

  useEffect(() => {
    getUsers()
      .then((users) => users.filter((p) => p.id !== authUser.id))
      .then((otherUsers) => {
        setOtherUsers(otherUsers)
        setSelectedRecipient(otherUsers[0].id)
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
          {otherUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </p>
      {selectedRecipient && <Chat recipient={selectedRecipient} />}
    </AppLayout>
  )
}

export default ChatPage
