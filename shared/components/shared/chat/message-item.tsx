import { Message } from "@prisma/client";

interface MessageItemProps {
  message: Message;
  adminId: number | null;
}

export const MessageItem = ({ message, adminId }: MessageItemProps) => {
  const isAdmin = message.senderId === adminId;
  const isUser = message.senderId !== adminId;

  return (
    <div
      className={`max-w-[70%] p-3 rounded-lg break-words ${
        isAdmin
          ? "bg-gray-100 self-start"
          : "bg-red-100 self-end ml-auto"
      }`}
    >
      <p>{message.content}</p>
      <p
        className={`text-xs text-gray-500 mt-2 ${
          isUser ? "text-right" : "text-left"
        }`}
      >
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
};
