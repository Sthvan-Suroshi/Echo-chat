"use client";

import { useRouter } from "next/navigation";
import { Rocket, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <Rocket className="w-20 h-20 mx-auto text-primary rotate-45" />
        </motion.div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold">404. Cannot hear any ECHOs here</h1>
          <p className="text-muted-foreground">The page you're looking for has drifted away.</p>
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="default" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
