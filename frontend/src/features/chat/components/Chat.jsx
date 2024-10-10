import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { formatMessageData, groupMessages } from '../messageUtils'
import { useMessageService } from '../services/messageService'
import './Chat.css'
import MessageForm from './MessageForm'
import MessageList from './MessageList'

const Chat = ({ recipient }) => {
  const chatBodyRef = useRef(null)
  const bottomRef = useRef(null)
  const [isAtBottom, setIsAtBottom] = useState(true)

  useEffect(() => {
    if (chatBodyRef.current === null) return

    const chatBodyElement = chatBodyRef.current

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatBodyElement
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1) // -1 for rounding errors
    }

    chatBodyElement.addEventListener('scroll', onScroll)
    return () => chatBodyElement.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (bottomRef.current && isAtBottom) {
      bottomRef.current.scrollIntoView()
    }
  })

  // ---

  const messageService = useMessageService()
  const queryClient = useQueryClient()
  const queryKey = useMemo(() => ['messages', recipient.id], [recipient])

  const appendMessage = useCallback(
    (newMessage) => {
      const messages = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, messages.concat(newMessage))
    },
    [queryClient, queryKey]
  )

  const newMessageMutation = useMutation({
    mutationFn: messageService.send,
    onSuccess: (newMessage) => appendMessage(newMessage),
  })

  const onSend = (content) => {
    const newMessage = {
      content,
      recipientId: recipient.id,
    }

    newMessageMutation.mutate(newMessage)
  }

  const messageQuery = useQuery({
    queryKey,
    queryFn: () => messageService.history(recipient.id),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    const stream = messageService.stream(recipient.id)

    const onMessage = (event) => {
      const dataJson = JSON.parse(event.data)
      const newMessage = formatMessageData(dataJson)
      appendMessage(newMessage)
    }

    stream.addEventListener('message', onMessage)

    return () => {
      stream.removeEventListener('message', onMessage)
      stream.close()
    }
  }, [appendMessage, messageService, recipient.id])

  if (messageQuery.isLoading) {
    return <div>Loading...</div>
  }

  const messageGroups = groupMessages(messageQuery.data)

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
