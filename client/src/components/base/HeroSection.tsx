"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import imageicon from "../../../public/images/icon_512x512.png";

export default function HeroSection() {
  return (
    <section className="relative pt-20 pb-32 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold text-white mb-6 leading-tight"
          >
            Instant Chats
            <br />
            <span className="text-[#9747FF]">with</span> ECHO
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white/80 mb-8"
          >
            Start chatting with your friends and family
            <br />
            with ECHO. Create your own chat group and invite your friends
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button className="bg-white text-[#9747FF] hover:bg-white/90 rounded-full px-8 h-12">
              Start Chat
            </Button>
          </motion.div>
          <div className="mt-12 space-y-4">
            <Card className="p-4 bg-[#7B3FE4]/20 border-0 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                <div className="flex-1">
                  <p className="text-white text-sm">Direct Message Your Collaborators</p>
                  <p className="text-white/60 text-xs">Send your Next Hello now</p>
                </div>
                <Button variant="secondary" className="rounded-full text-sm px-6">
                  Initiate
                </Button>
              </div>
            </Card>
            <Card className="p-4 bg-[#7B3FE4]/20 border-0 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                <div className="flex-1">
                  <p className="text-white text-sm">Online active utilities Partner</p>
                  <p className="text-white/60 text-xs">Diverse Tasks with helpful benefits</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                  2
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="relative">
          <img
            src={imageicon.src}
            alt="Conversation Application Icon"
            className="w-80 h-80 mx-auto rounded-[4rem] bg-gradient-to-br from-[#FF6B6B] to-[#9747FF] p-3"
          />
        </div>
      </div>
    </section>
  );
}
