import ChatBase from "@/components/chat/ChatBase";
import { fetchChatGroup } from "@/fetch/groupFetch";
import { notFound } from "next/navigation";
import React from "react";

export default async function Chat({ params }: { params: { id: string } }) {
  const group: ChatGroupType | null = await fetchChatGroup(params.id);

  if (params.id.length !== 36 || !group) return notFound();
  return (
    <div>
      <ChatBase groupId={params.id} />
    </div>
  );
}
