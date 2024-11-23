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

      console.log(data?.message);

      if (data?.message) {
        setLoading(false);
        setOpen(false);
        reset();
        toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again !");
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create Group</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new chat</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(submit)}>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Group Name
                </label>
                <Input
                  type="text"
                  {...register("title")}
                  placeholder="Enter Group Name"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 p-3 text-sm placeholder:text-gray-600 focus:ring-0"
                />
                {errors.title && (
                  <span className="text-xs text-red-600">{errors.title.message}</span>
                )}

                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <Input
                  type="password"
                  {...register("password")}
                  placeholder="Enter Password"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 p-3 text-sm placeholder:text-gray-600 focus:ring-0"
                />
                {errors.password && (
                  <span className="text-xs text-red-600">{errors.password.message}</span>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-6">
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
