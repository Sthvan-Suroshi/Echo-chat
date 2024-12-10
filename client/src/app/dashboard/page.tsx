import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { fetchChatGroups } from "@/fetch/groupFetch";
import DashNav from "@/components/dashboard/DashNav";
import CreateChat from "@/components/groupChat/CreateChat";
import GroupChatCard from "@/components/groupChat/GroupChatCard";

export default async function dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const groups: Array<ChatGroupType> | [] = await fetchChatGroups(session?.user?.token!);

  return (
    <div>
      <DashNav name={session?.user?.name!} image={session?.user?.image ?? undefined} />
      <div className="flex justify-center ">
        <div className="container">
          <div className="mt-6 text-end mb-4">
            <CreateChat user={session?.user!} />
          </div>

          {/* If Groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groups?.length > 0 &&
              groups.map((item, _) => (
                <GroupChatCard group={item} key={item.id} user={session?.user!} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
