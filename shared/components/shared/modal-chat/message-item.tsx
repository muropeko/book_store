import { Message, User } from "@prisma/client";

interface MessageItemProps {
  message: Message;
  adminId: number | null;
  client: User;
}

export const MessageItem = ({ message, adminId, client }: MessageItemProps) => {
  const myMessage = adminId == message.senderId;

  const createdAt =
    typeof message.createdAt === "string" ? new Date(message.createdAt) : message.createdAt;

  return (
    <div
      className={`max-w-[70%] p-3 rounded-lg break-words ${myMessage ? "bg-red-100 self-end ml-auto" : "bg-gray-100 self-start"}`}
    >
      <p>{message.content}</p>
      <p className="text-xs text-gray-500 mt-1 text-right">
        {createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </p>
    </div>
  );
};
