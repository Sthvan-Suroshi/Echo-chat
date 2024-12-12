"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Smile, Paperclip, Send, MoreHorizontal, ChevronDown } from "lucide-react";

const messages = [
  {
    id: 1,
    user: "John Doe",
    message: "Hello, how are you?",
    time: "12:30 PM",
  },
  {
    id: 2,
    user: "Singh ",
    message: "Do you have any plans?",
    time: "12:35 PM",
  },
  {
    id: 3,
    user: "Hebeti ",
    message: "I am fine, how about you?",
    time: "12:40 PM",
  },
  {
    id: 4,
    user: "Carl",
    message: "I am fine too",
    time: "12:45 PM",
  },
];

export default function DashboardPreview() {
  return (
    <section className="px-8 py-16">
      <Card className="max-w-4xl mx-auto bg-[#1E2246] border-0 shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full" />
            <div>
              <h3 className="text-white font-semibold">Dashooar</h3>
              <p className="text-gray-400 text-sm">Melclory</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <ChevronDown className="h-5 w-5" />
          </Button>
        </div>

        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-white font-medium text-sm">{message.user}</h4>
                  <span className="text-gray-400 text-xs">{message.time}</span>
                </div>
                <p className="text-gray-300 text-sm">{message.message}</p>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-400">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-2 bg-[#2A2F52] rounded-full p-2">
            <Button size="icon" variant="ghost" className="rounded-full text-gray-400">
              <Smile className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Let wot chkst flowsta-tn p"
              className="bg-transparent border-0 text-white flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button size="icon" variant="ghost" className="rounded-full text-gray-400">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button size="icon" className="rounded-full bg-purple-600 hover:bg-purple-700">
              <Send className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
