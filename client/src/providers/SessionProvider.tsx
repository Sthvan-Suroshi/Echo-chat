"use client";

import React from "react";
import { SessionProvider as NextAuthProvider } from "next-auth/react";

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthProvider>{children}</NextAuthProvider>;
}
