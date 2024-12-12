"use client";

import React, { useEffect, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatNav from "./ChatNav";
import ChatUserDialog from "./ChatUserDailog";
import Chats from "./Chat";
import { fetchChatUsers } from "@/fetch/groupFetch";

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

  // Fetch users from localStorage on component mount
  useEffect(() => {
    const data = localStorage.getItem(group.id);
    if (data) {
      const parsedData = JSON.parse(data);
      setChatUser(parsedData);
    }
  }, [group.id, users]);

  // Function to refresh the user list
  const refreshUsers = async () => {
    const updatedUsers = await fetchChatUsers(group.id);
    setUsers(updatedUsers);
  };

  return (
    <div className="flex">
      <ChatSidebar users={users} />
      <div className="w-full md:w-4/5 bg-white">
        {open ? (
          <ChatUserDialog
            open={open}
            setOpen={setOpen}
            group={group}
            onUserAdded={refreshUsers} // Trigger refresh when a user is added
          />
        ) : (
          <ChatNav chatGroup={group} users={users} />
        )}

        <Chats group={group} chatUser={chatUser} oldMessages={oldMessages} />
      </div>
    </div>
  );
}
