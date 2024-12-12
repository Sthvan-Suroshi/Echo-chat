import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ChatSidebar({ users }: { users: Array<GroupChatUserType> | [] }) {
  return (
    <div className="hidden md:block w-64 bg-gray-800 text-gray-100">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {users.length > 0 &&
            users.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{item.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-400">
                    Joined {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
        </ScrollArea>
      </div>
    </div>
  );
}
