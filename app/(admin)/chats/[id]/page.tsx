import { EmptyBlock } from "@components/shared";
import { ChatWindow } from "@components/shared/chat";
import { CartDetails } from "@components/shared/chat";
import { fetchCart, getCurrentUser } from "app/actions";
import { fetchChatById } from "app/actions/chat";

interface ChatPageProps {
  params: { id: string };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const id = Number(params.id);

  const chat = await fetchChatById(id); 
  const cart = await fetchCart(id.toString());


  const adminUser = await getCurrentUser()

  if (!chat) {
    return <EmptyBlock title="Пусто!" />;
  }

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatWindow
          messages={chat.messages}
          client={chat.userId?.toString() || chat.token || undefined}
          adminId={adminUser.id}
          chatId={id}
        />
      </div>

      <aside className="w-[35%] border-l border-gray-200 flex-shrink-0 flex flex-col overflow-y-auto">
        <CartDetails cart={cart} />
      </aside>
    </div>
  );
}
