import { Message } from "@prisma/client";
import { MessageItem } from ".";
  
interface MessagesListProps {
  messages: Message[];
  adminId: number | null;
}

export const MessagesList = ({ messages, adminId }: MessagesListProps) => (
  <div className="flex-1 overflow-y-auto p-4 space-y-4">
    {messages.map(msg => (
      <MessageItem key={msg.id} message={msg} adminId={adminId} />
    ))}
  </div>
);
