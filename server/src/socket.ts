import { Server } from "socket.io";

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    //this listens to every new client joining to the socket server
    console.log("a user connected", socket.id);

    socket.on("message", (data) => {
      console.log("Server side data ", data);
      socket.broadcast.emit("message", data); //broadcast here reflects, send messgae to everybody conntected except the sender
    });
    
    socket.on("disconnect", () => {
      console.log("a user disconnected", socket.id);
    });
  });
}
