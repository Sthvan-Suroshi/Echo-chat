"use client";

import { getSocket } from "@/lib/socket.config";
import React, { useEffect, useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { Button } from "../ui/button";

export default function ChatBase() {
  let socket = useMemo(() => {
    // using memo because for every re-render the new socket instance should not be created
    const socket = getSocket();

    return socket.connect();
  }, []);

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
    });
    return () => {
      socket.disconnect(); //whenever the component unmounts the socket should be disconnected to avoid memory leak
    };
  }, []);

  const handleClick = () => {
    socket.emit("message", { name: "Sthvan", id: uuidV4() });
  };

  return (
    <div>
      <Button onClick={handleClick}>Send Message</Button>
    </div>
  );
}
