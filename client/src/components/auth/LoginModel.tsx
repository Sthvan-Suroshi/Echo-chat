"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginModel() {
  const handleLogin = () => {
    const res = signIn("google", {
      callbackUrl: "/dashboard",
      redirect: true,
    });

    console.log(res);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Getting Started</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to Echo Chat</DialogTitle>
          <DialogDescription>
            Echo Chat is a simple chat app that allows you to create secure chat links and start
            conversations in seconds.
          </DialogDescription>
        </DialogHeader>
        <Button variant="outline" onClick={handleLogin}>
          <Image src="/images/google.png" alt="Google" className="mr-4" width={24} height={24} />
          Continue with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
