"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createGroupChatSchema,
  createGroupChatSchemaType,
} from "@/validations/groupChatvalidations";
import { Input } from "../ui/input";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { CHAT_GROUP_URL } from "@/lib/apiEndPoints";
import { clearCache } from "@/actions/common";
import { Plus } from "lucide-react";

export default function CreateChat({ user }: { user: CustomUser }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createGroupChatSchemaType>({
    resolver: zodResolver(createGroupChatSchema),
  });

  const submit = async (payload: createGroupChatSchemaType) => {
    try {
      setLoading(true);
      clearCache("dashboard");

      const { data } = await axios.post(
        CHAT_GROUP_URL,
        { ...payload, user_id: user.id },
        {
          headers: {
            Authorization: user.token,
          },
        }
      );

      if (data?.message) {
        setLoading(false);
        setOpen(false);
        reset();
        toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-[#9747FF] hover:bg-white/90 rounded-full px-6">
          <Plus className="mr-2 h-4 w-4" /> Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1b4b] text-white border-[#272b91] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Create a new chat group
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-purple-300">Group Name</label>
            <Input
              type="text"
              {...register("title")}
              placeholder="Enter Group Name"
              className="mt-1 w-full bg-[#272b91]/50 text-white border-[#9747FF] focus:border-[#9747FF] focus:ring-[#9747FF] rounded-md"
            />
            {errors.title && <span className="text-xs text-red-400">{errors.title.message}</span>}
          </div>
          <div>
            <label className="text-sm font-medium text-purple-300">Password</label>
            <Input
              type="password"
              {...register("password")}
              placeholder="Enter Password"
              className="mt-1 w-full bg-[#272b91]/50 text-white border-[#9747FF] focus:border-[#9747FF] focus:ring-[#9747FF] rounded-md"
            />
            {errors.password && (
              <span className="text-xs text-red-400">{errors.password.message}</span>
            )}
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#9747FF] text-white hover:bg-[#8a3dff] rounded-full py-2"
          >
            {loading ? "Creating..." : "Create Group"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
