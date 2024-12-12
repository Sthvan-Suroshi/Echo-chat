"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import axios from "axios";
import { CHAT_GROUP_USERS_URL } from "@/lib/apiEndPoints";
import { toast } from "sonner";

export default function ChatUserDialog({
  open,
  setOpen,
  group,
  onUserAdded,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  group: ChatGroupType;
  onUserAdded: () => void; // Callback to refresh user list
}) {
  const params = useParams();
  const [state, setState] = useState({
    name: "",
    password: "",
  });

  useEffect(() => {
    const data = localStorage.getItem(params["id"] as string);
    if (data) {
      const jsonData = JSON.parse(data);
      if (jsonData?.name && jsonData?.group_id) {
        setOpen(false);
      }
    }
  }, [params, setOpen]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const localData = localStorage.getItem(params["id"] as string);

    if (!localData) {
      try {
        const { data } = await axios.post(CHAT_GROUP_USERS_URL, {
          name: state.name,
          group_id: params["id"] as string,
        });

        localStorage.setItem(params["id"] as string, JSON.stringify(data?.data));
        onUserAdded(); // Trigger refresh of user list
        toast.success("Successfully joined the group!");
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again!");
        return;
      }
    }

    if (group.password !== state.password) {
      toast.error("Please enter the correct passcode!");
      console.log("Invalid password");
    } else {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Name and Passcode</DialogTitle>
          <DialogDescription>Add your name and passcode to join the room</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <Input
              placeholder="Enter your name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </div>
          <div className="mt-2">
            <Input
              placeholder="Enter your passcode"
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
          </div>
          <div className="mt-2">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
