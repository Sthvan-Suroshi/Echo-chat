"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    text: "Echo Chat has transformed how our team communicates. The interface is beautiful and intuitive.",
    name: "John Doe",
    role: "Product Designer",
    rating: 5,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    text: "The best chat platform I have ever used. The security features give me peace of mind.",
    name: "Jane Smith",
    role: "Software Engineer",
    rating: 5,
    avatar: "/placeholder.svg?height=100&width=100",
  },
];

export default function UserReviews() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Cherished by multitudes</h2>
          <p className="text-white/80 text-xl">Unite with our delighted user community</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-8 bg-white/10 backdrop-blur-lg border-0">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg text-white mb-6">{review.text}</p>
                <div className="flex items-center gap-4">
                  <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="font-medium text-white">{review.name}</div>
                    <div className="text-white/80">{review.role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
