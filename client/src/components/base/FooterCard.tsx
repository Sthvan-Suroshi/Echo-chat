"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white/60"
        >
          © {new Date().getFullYear()} Converse. All privileges preserved.
        </motion.div>
      </div>
    </footer>
  );
}
