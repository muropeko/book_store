'use client'

import { useEffect, useState, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { ChatHeader, ChatInput } from '.'
import { getCurrentUser } from 'app/actions/user'
import { Message, User } from '@prisma/client'
import { ChatMessages } from './chat-messages'
import { fetchPopupChat } from 'app/actions/chat'

const START_MESSAGE: Message = {
  id: 0,
  content: 'Доброго дня! Чим ми можемо вам допомогти сьогодні?',
  senderId: 0,
  chatId: 0,
  token: null,
  createdAt: new Date(),
}

let socket: Socket | null = null

export const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [messages, setMessages] = useState<Message[]>([START_MESSAGE])
  const [inputMessage, setInputMessage] = useState('')
  const [user, setUser] = useState<User | { token: string } | null>(null)
  const [currentChatId, setCurrentChatId] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // Автоскрол до останнього повідомлення
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

useEffect(() => {
  const fetchMessages = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) return;

    // Витягуємо чат для цього користувача або токена
    const chat = await fetchPopupChat();

    if (!chat) return;

    // Встановлюємо повідомлення у стан
    setMessages([START_MESSAGE, ...chat.messages]);

    // Зберігаємо поточний chatId
    setCurrentChatId(chat.id);
  };

  fetchMessages();
}, []);


  // Ініціалізація сокета
  useEffect(() => {
    const init = async () => {
      const currentUser = await getCurrentUser()
      if (!currentUser) return
      setUser(currentUser)

      socket = io('http://localhost:4000', {
        path: '/socket_io',
        auth: { sessionToken: 'token' in currentUser ? currentUser.token : currentUser.sessionToken },
      })

      socket.on('connect', () => console.log('[SERVER] Socket connected:', socket?.id))

      socket.on('message', (msg: Message | { messages: Message[]; chatId: number }) => {
        // Якщо прийшов об'єкт з масивом повідомлень (chat), розгортаємо
        if ('messages' in msg) {
          const all = [START_MESSAGE, ...msg.messages]
          setMessages(all)
          if (!currentChatId) setCurrentChatId(msg.chatId)
        } else {
          setMessages(prev => [...prev, msg])
          if (!currentChatId) setCurrentChatId(msg.chatId)
        }
      })
    }

    init()
    return () => {
      socket?.disconnect()
      socket = null
    }
  }, [currentChatId])

  const handleSend = () => {
    if (!inputMessage.trim() || !socket) return

    socket.emit('message', {
      chatId: currentChatId,
      content: inputMessage,
      userId: user?.id,
      token: user?.token,
    })
    setInputMessage('')
  }

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end z-50 gap-2">
      {isOpen ? (
        <div className="flex flex-col bg-white border shadow-xl rounded-2xl overflow-hidden w-[30vw] h-[480px] animate-fade-in">
          <ChatHeader onClose={() => setIsOpen(false)} />
          <ChatMessages
            messages={messages}
            messagesEndRef={messagesEndRef}
            userId={user?.id}
            userToken={user?.token}
          />
          <ChatInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSend={handleSend}
          />
        </div>
      ) : (
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700"
          onClick={() => setIsOpen(true)}
        >
          Чат
        </button>
      )}
    </div>
  )
}
