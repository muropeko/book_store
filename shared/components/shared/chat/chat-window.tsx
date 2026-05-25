'use client';

import { Message, User } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ChatInput, ChatMessages } from "../modal-chat";

interface Props {
  messages: Message[]
  client: User | string | undefined;
  adminId: number | null
  chatId: number
}

let socket: Socket | null = null;

export const ChatWindow = ({ messages: initialMessages, client, adminId, chatId }: Props) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages]);

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000", {
      path: "/socket_io",
      auth: { adminId },
    });

    socket.on('connect', () => {
      console.log(`[ADMIN ${adminId}] connected, joining room ${chatId}`);
      socket?.emit('join_chat', { chatId, adminId });
    });

    socket.on('message', (msg: Message | { messages: Message[]; chatId: number }) => {
      if ('messages' in msg) {
        console.log(`[ADMIN ${adminId}] got full chat:`, msg);
        setMessages(msg.messages);
      } else if (msg.chatId === chatId) {
        console.log(`[ADMIN ${adminId}] got message in chat ${chatId}:`, msg);
        setMessages(prev => [...prev, msg]);
      } else {
        console.log(`[ADMIN ${adminId}] got message for another chat:`, msg);
      }
    });

    return () => {
      socket?.disconnect();
      socket = null;
    }
  }, [chatId, adminId]);

  const handleSend = () => {
    if (!inputMessage.trim() || !socket) return;

    const payload = {
      chatId,
      content: inputMessage,
      adminId
    };

    console.log(`[ADMIN ${adminId}] sending message:`, payload);
    socket.emit('message', payload);
    setInputMessage('');
  }

  return (
    <div className="flex flex-col h-full">
      <pre>{JSON.stringify(adminId, null, 3)}</pre>

      <div className="h-[500px] overflow-auto">
        <ChatMessages
          messages={messages}
          messagesEndRef={messagesEndRef}
          client={client}
          adminId={adminId}
        />
      </div>

      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSend={handleSend}
      />
    </div>
  );
}
