'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { ClientItem } from "./client-item";
import { useState, useEffect } from "react";
import { Chat } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { changeChatStatus } from "app/actions/chat";

interface ClientSidebarProps {
  chats: Chat[];
}

export const ClientSidebar = ({ chats }: ClientSidebarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTab = searchParams.get("status") || "all";
  const [tab, setTab] = useState(initialTab);
  const [openChatId, setOpenChatId] = useState<number | null>(null);

  const toggleModal = (chatId: number) => {
    setOpenChatId((prev) => (prev === chatId ? null : chatId));
  };

  const chooseTab = (value: string) => {
    setTab(value);
    router.push(`/chats?status=${value}`);
  };

  const filteredChats = tab === "all" ? chats : chats.filter((c) => c.status === tab);

  return (
    <aside className="border-r border-gray-300 flex flex-col p-1 max-h-screen overflow-y-auto">
      <Tabs value={tab} onValueChange={chooseTab}>
        <TabsList>
          <TabsTrigger value="all">Всі</TabsTrigger>
          <TabsTrigger value="AVAILABLE">Вільні</TabsTrigger>
          <TabsTrigger value="OCCUPIED">Активні</TabsTrigger>
          <TabsTrigger value="CLOSED">Закриті</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-2">
          <ul className="space-y-2">
            {filteredChats.map((c) => (
              <ClientItem
                key={c.id}
                user={c.user}
                admin={c.adminId}
                message={c.messages[0]}
                chatId={c.id}
                chatStatus={c.status}
                isOpen={openChatId === c.id}
                toggleModal={toggleModal}
                changeStatus={changeChatStatus}
              />
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </aside>
  );
};
