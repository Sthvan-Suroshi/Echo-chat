import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import SessionProvider from "@/providers/SessionProvider";

export const metadata: Metadata = {
  title: "Echo Chat",
  description: "Simple chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <body className={cn("min-h-screen bg-background font-sans antialiased")}>{children}</body>
        <Toaster richColors position="bottom-right" toastOptions={{ duration: 5000 }} />
      </SessionProvider>
    </html>
  );
}
