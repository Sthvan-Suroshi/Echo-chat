import ChatBase from "@/components/chat/ChatBase";
import React from "react";

export default function Chat({ params }: { params: { id: string } }) {
  console.log("The grp id ", params.id);
  return (
    <div>
      <h1>Hello Echos</h1>
      <ChatBase groupId={params.id} />
    </div>
  );
}