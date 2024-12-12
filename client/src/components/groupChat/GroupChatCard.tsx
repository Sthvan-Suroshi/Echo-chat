import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import GroupChatCardMenu from "./GroupChatCardMenu";
import { Calendar, Lock } from "lucide-react";

export default function GroupChatCard({ group, user }: { group: ChatGroupType; user: CustomUser }) {
  return (
    <Card className="bg-[#272b91]/20 backdrop-blur-sm border-[#9747FF] hover:bg-[#272b91]/30 transition-all duration-300 overflow-hidden rounded-lg shadow-lg">
      <CardHeader className="flex flex-row justify-between items-center bg-gradient-to-r from-[#1a1b4b] to-[#272b91] p-4">
        <CardTitle className="text-xl font-bold text-white">{group.title}</CardTitle>
        <GroupChatCardMenu user={user} group={group} />
      </CardHeader>
      <CardContent className="text-white/80 p-4">
        <div className="flex items-center mb-3">
          <Lock className="w-5 h-5 mr-3 text-purple-300" />
          <p className="text-sm">
            Passcode: <strong className="text-white">{group.password}</strong>
          </p>
        </div>
        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-3 text-purple-300" />
          <p className="text-sm">
            Created:{" "}
            <span className="text-white">{new Date(group.created_at).toLocaleDateString()}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
