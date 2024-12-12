import React from "react";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import MobileChatSidebar from "./MobileChatSidebar";

export default function ChatNav({
  chatGroup,
  users,
  user,
}: {
  chatGroup: ChatGroupType;
  users: Array<GroupChatUserType> | [];
  user?: GroupChatUserType | null;
}) {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <div className="md:hidden">
          <MobileChatSidebar users={users} />
        </div>
        <h1 className="text-xl font-semibold">{chatGroup.title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="text-gray-300 hover:text-white">
          <Users className="mr-2 h-4 w-4" />
          {users.length} Users
        </Button>
        {user && <p className="font-medium">{user.name}</p>}
      </div>
    </nav>
  );
}
