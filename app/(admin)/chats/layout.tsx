import { ReactNode, Suspense } from "react";
import { getAllChat } from "app/actions/chat";
import { ClientSidebar } from "@components/shared/chat";

export default async function ChatsLayout({ children }: { children: ReactNode }) {
  const chats = await getAllChat();

  return (
    <div className="flex">
      <Suspense fallback={null}>
        <ClientSidebar chats={chats} />
      </Suspense>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
