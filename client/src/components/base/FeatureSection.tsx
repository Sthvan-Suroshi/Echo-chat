"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Instagram, MessageSquare } from "lucide-react";

export default function FeatureSection() {
  return (
    <section className="px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 bg-[#7B3FE4]/20 border-0 backdrop-blur-sm h-full">
              <Instagram className="w-12 h-12 text-white mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Advanced Social Integration</h3>
              <p className="text-white/80">
                Seamless connection with your favorite platforms,
                <br />
                making sharing and collaboration effortless
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-8 bg-[#7B3FE4]/20 border-0 backdrop-blur-sm h-full">
              <MessageSquare className="w-12 h-12 text-white mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Smart Messaging System</h3>
              <p className="text-white/80">
                Real-time communication with intelligent features
                <br />
                for better engagement
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
