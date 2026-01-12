import React from 'react'
import { Message, User } from '@prisma/client'
import { MessageItem } from './message-item'

interface ChatMessagesProps {
  messages: Message[]
  messagesEndRef?: React.RefObject<HTMLDivElement>
  client: User
  adminId: number | null
}

export const ChatMessages = ({ messages, messagesEndRef, client, adminId }: ChatMessagesProps) => (
  <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto bg-gray-50">
    {messages.map(msg => (
      <MessageItem key={msg.id} message={msg} client={client} adminId={adminId} />
    ))}
    <div ref={messagesEndRef} />
  </div>
)