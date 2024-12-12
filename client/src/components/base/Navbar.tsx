"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import LoginModel from "../auth/LoginModel";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { LayoutGrid } from "lucide-react";

export default function Navbar({ user }: { user?: CustomUser }) {
  return (
    <nav className="px-8 py-6 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2">
        <LayoutGrid className="w-8 h-8 text-white" />
        <span className="text-xl font-medium text-white">Echo Chat</span>
      </Link>

      {!user ? (
        <Button className="bg-white hover:bg-white/90 text-[#9747FF] rounded-full px-6">
          <LoginModel />
        </Button>
      ) : (
        <Link href="/dashboard">
          <Button className="bg-white hover:bg-white/90 text-[#9747FF] rounded-full px-6">
            Dashboard
          </Button>
        </Link>
      )}
    </nav>
  );
}
