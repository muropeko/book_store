'use server'

import { ChatStatus } from '@prisma/client'
import { prisma } from '../../prisma/prisma-client'

interface URLProps {
  
}

export const getAllChat = async (urlStatus: ChatStatus,) => {
  const chats = await prisma.chat.findMany({
    where: {
      status: urlStatus,
    },
    include: {
      user: true,
      messages: {
        take: 1,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          content: true,
          createdAt: true,
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  })
  return chats
}

export type MessageType = {
  id: number
  content: string
  senderId: number | null
  createdAt: string
}

import { getCurrentUser } from './user'

export const fetchChatWithMessages = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  const userId = 'id' in currentUser ? currentUser.id : undefined
  const token = 'token' in currentUser ? currentUser.token : undefined
  const role = 'role' in currentUser ? currentUser.role : undefined

  if (!userId && !token) return null

  let chat = await prisma.chat.findFirst({
    where: userId ? { userId } : { token },
    include: {
      messages: { orderBy: { createdAt: 'asc' } },
      user: true,
      admin: true,
    },
  })

  if (!chat && userId && role !== 'ADMIN') {
    chat = await prisma.chat.create({
      data: {
        userId,
        status: 'AVAILABLE',
        messages: {
          create: {
            senderId: userId,
            content: 'Чат створено!',
          },
        },
      },
      include: {
        messages: true,
        user: true,
        admin: true,
      },
    })
  }

  console.log('[CHAT] Fetched chat:', chat?.id, 'messages:', chat?.messages.length)
  return chat
}

export const sendMessage = async (
  chatId: number | null,
  content: string
) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  const userId = 'id' in currentUser ? currentUser.id : undefined
  const token = 'token' in currentUser ? currentUser.token : undefined

  let chat = null
  if (chatId) {
    chat = await prisma.chat.findUnique({ where: { id: chatId } })
  } else {
    chat = await prisma.chat.findFirst({
      where: userId ? { userId } : { token },
    })
  }

  if (!chat) {
    chat = await prisma.chat.create({
      data: {
        userId,
        token,
        status: "AVAILABLE",
        messages: {
          create: {
            content,
            senderId: userId ?? null,
            token: userId ? null : token,
          },
        },
      },
      include: { messages: true },
    });
  } else {
    await prisma.message.create({
      data: {
        chatId: chat.id,
        content,
        senderId: userId ?? null,
        token: userId ? null : token,
      },
    });
  }

  return chat
}

export const fetchChatById = async (id: number) => {
  const chat = await prisma.chat.findUnique({
    where: { id },
    include: {
      messages: true
    },
  })

  return chat
}

export const fetchPopupChat = async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  const chat = await prisma.chat.findFirst({
    where: 'id' in user ? { userId: user.id } : { token: user.token },
    include: { messages: true },
  });

  return chat;
};

export const changeChatStatus = async (chatId: number, status: ChatStatus) => {
  await prisma.chat.update({
    where: { id: chatId },
    data: { status },
  });
};

