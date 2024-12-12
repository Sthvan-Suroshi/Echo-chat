"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { getSocket } from "@/lib/socket.config";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Chat({
  group,
  oldMessages,
  chatUser,
}: {
  group: ChatGroupType;
  oldMessages: Array<MessageType> | [];
  chatUser?: GroupChatUserType | null;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<MessageType>>(oldMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = { room: group.id };
    return socket.connect();
  }, [group.id]);

  useEffect(() => {
    socket.on("message", (data: MessageType) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom();
    });

    return () => {
      socket.close();
    };
  }, [socket]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;

    const payload: MessageType = {
      id: uuidv4(),
      message: message,
      name: chatUser?.name ?? "Unknown",
      created_at: new Date().toISOString(),
      group_id: group.id,
    };

    socket.emit("message", payload);
    setMessage("");
    setMessages((prevMessages) => [...prevMessages, payload]);
    scrollToBottom();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-900 ">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3 }}
              className={`max-w-[50%] p-3 rounded-lg ${
                msg.name === chatUser?.name
                  ? "ml-auto bg-gradient-to-r from-[#1a1b4b] to-[#272b91] text-white"
                  : "mr-auto bg-gradient-to-r from-[#151515] to-[#000000] text-gray-200"
              }`}
            >
              <p className="text-sm font-semibold mb-1" ref={messagesEndRef}>{msg.name}</p>
              <p>{msg.message}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(msg.created_at).toLocaleTimeString()}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="p-4 bg-gray-800">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-gray-700 border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
