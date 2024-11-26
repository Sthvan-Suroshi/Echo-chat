import ChatBase from "@/components/chat/ChatBase";
import { fetchChats } from "@/fetch/chatsFetch";
import { fetchChatGroup, fetchChatUsers } from "@/fetch/groupFetch";
import { notFound } from "next/navigation";
import React from "react";

export default async function Chat({ params }: { params: { id: string } }) {
  // Ensure params is awaited
  const { id } = await params;

  // Validate id
  if (id.length !== 36) return notFound();

  // Fetch group and users
  const group: ChatGroupType | null = await fetchChatGroup(id);
  if (!group) return notFound();

  const users: Array<GroupChatUserType> | [] = await fetchChatUsers(id);

  const chats: Array<MessageType> | [] = await fetchChats(id);

  return (
    <div>
      <ChatBase users={users} group={group} oldMessages={chats} />
    </div>
  );
}
