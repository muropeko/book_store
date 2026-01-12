'use client';

import { ChatStatus, Message, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ModalDropdown } from "../chat-status-modal";

interface ClientItemProps {
  chatId: number;
  admin: number | null;
  user: User | null;
  message: Message | null;
  chatStatus: ChatStatus;

  isOpen: boolean;
  toggleModal: (chatId: number) => void;
  changeStatus: (chatId: number, status: ChatStatus) => Promise<void>; // Server Action
}

export const ClientItem = ({
  admin,
  user,
  message,
  chatId,
  chatStatus,
  isOpen,
  toggleModal,
  changeStatus
}: ClientItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/chats/${chatId}`);
  };

  const containerBg = admin ? "bg-red-100" : "bg-gray-50";

  const statusColor =
    chatStatus === ChatStatus.AVAILABLE ? "bg-green-500" :
    chatStatus === ChatStatus.OCCUPIED ? "bg-yellow-400" :
    "bg-red-500";

  return (
    <li
      className={`p-3 border-b relative cursor-pointer flex flex-col justify-between ${containerBg}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
<span 
  className={`w-3 h-3 rounded-full ${statusColor} cursor-pointer`} 
  onClick={(e) => {
    e.stopPropagation();
    if (!admin || !chatId) return;
    toggleModal(chatId);
  }}
/>

{isOpen && chatId && (
  <ModalDropdown
    chatId={chatId}
    chatStatus={chatStatus}
    changeStatus={changeStatus} // Server Action
    onChange={(newStatus) => {
      // 🔹 локально оновлюємо статус в ClientItem
      chatStatus = newStatus;  
      toggleModal(chatId); // закриваємо модалку
    }}
  />
)}


          <p className="font-medium">
            {user ? `${user.firstName} ${user.lastName}` : "Гість"}
          </p>
        </div>

        <p className="text-xs text-gray-400">
          {message
            ? new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "No messages"}
        </p>
      </div>

      <p className="text-sm text-gray-500 truncate">
        {message?.content || "No messages"}
      </p>
    </li>
  );
};
