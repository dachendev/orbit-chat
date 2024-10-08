import { useAuthUserContext } from '@features/auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { groupMessages } from '../messageUtils'
import { createMessage, getMessages } from '../services/messageService'
import './Chat.css'
import MessageForm from './MessageForm'
import MessageList from './MessageList'

const Chat = ({ recipient }) => {
  const [authUser] = useAuthUserContext()
  const queryClient = useQueryClient()
  const chatBodyRef = useRef(null)
  const bottomRef = useRef(null)
  const [isAtBottom, setIsAtBottom] = useState(true)

  const scrollToBottom = () => bottomRef.current.scrollIntoView()

  useEffect(() => {
    const chatBodyElem = chatBodyRef.current

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatBodyElem
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1) // -1 for rounding errors
    }

    chatBodyElem.addEventListener('scroll', onScroll)
    return () => chatBodyElem.removeEventListener('scroll', onScroll)
  })

  const queryKey = ['messages', authUser.id, recipient.id]

  const newMessageMutation = useMutation({
    mutationFn: createMessage,
    onSuccess: (newMessage) => {
      const messages = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, messages.concat(newMessage))
    },
  })

  const onSend = (content) => {
    newMessageMutation.mutate({
      content,
      sender: authUser.id,
      recipient: recipient.id,
    })
  }

  const result = useQuery({
    queryKey,
    queryFn: () => getMessages(authUser.id, recipient.id),
  })

  const messageGroups = groupMessages(result.data || [])

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom()
    }
  }, [isAtBottom, messageGroups])

  return (
    <div className="chat">
      <div className="chat__header">
        <strong>{recipient.username}</strong>
      </div>
      <div ref={chatBodyRef} className="chat__body">
        {messageGroups.length > 0 ? (
          <MessageList messageGroups={messageGroups} />
        ) : (
          <div>There&apos;s nothing here... Send the first message!</div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="chat__footer">
        <MessageForm onSend={onSend} />
      </div>
    </div>
  )
}

Chat.propTypes = {
  recipient: PropTypes.object.isRequired,
}

export default Chat
