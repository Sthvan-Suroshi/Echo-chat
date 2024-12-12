"use client";

import React, { useEffect, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatNav from "./ChatNav";
import Chat from "./Chat";
import { fetchChatUsers } from "@/fetch/groupFetch";
import ChatUserDialog from "./ChatUserDailog";

export default function ChatBase({
  group,
  users: initialUsers,
  oldMessages,
}: {
  group: ChatGroupType;
  users: Array<GroupChatUserType> | [];
  oldMessages: Array<MessageType> | [];
}) {
  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<GroupChatUserType | null>(null);
  const [users, setUsers] = useState<Array<GroupChatUserType>>(initialUsers);

  useEffect(() => {
    const data = localStorage.getItem(group.id);
    if (data) {
      const parsedData = JSON.parse(data);
      setChatUser(parsedData);
    }
  }, [group.id, users]);

  const refreshUsers = async () => {
    const updatedUsers = await fetchChatUsers(group.id);
    setUsers(updatedUsers);
  };

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      <ChatSidebar users={users} />
      <div className="flex-1 flex flex-col">
        <ChatNav chatGroup={group} users={users} user={chatUser} />
        <div className="flex-1">
          {open ? (
            <ChatUserDialog
              open={open}
              setOpen={setOpen}
              group={group}
              onUserAdded={refreshUsers}
            />
          ) : (
            <Chat group={group} chatUser={chatUser} oldMessages={oldMessages} />
          )}
        </div>
      </div>
    </div>
  );
}
