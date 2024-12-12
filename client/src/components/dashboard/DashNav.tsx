import React from "react";
import ProfileMenu from "../auth/ProfileMenu";
import { LayoutGrid } from "lucide-react";

export default function DashNav({ name, image }: { name: string; image?: string }) {
  return (
    <nav className="bg-gradient-to-r from-[#1a1b4b] to-[#272b91] border-b border-purple-400 backdrop-blur-md text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <LayoutGrid className="w-6 h-6 text-purple-300" />
          <h1 className="text-xl font-bold text-white">Chat Dashboard</h1>
        </div>
        <ProfileMenu name={name} image={image} />
      </div>
    </nav>
  );
}
