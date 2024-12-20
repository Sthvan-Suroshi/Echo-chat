import { prisma } from "./config/db.config.js";
export function setupSocket(io) {
    // Before we create a new group we need to use middleware as per the docs socket.io
    io.use((socket, next) => {
        //take room ID either from room or from the headers
        const room = socket.handshake.auth.room || socket.handshake.headers.room;
        if (!room) {
            return next(new Error("Invalid room. Connect to correct Id"));
        }
        socket.room = room;
        next();
    });
    io.on("connection", (socket) => {
        // this listens to every new client joining to the socket server
        console.log("a user connected", socket.id);
        // Join the room
        socket.join(socket.room);
        socket.on("message", async (data) => {
            // broadcast here reflects, send messgae to everybody conntected except the sender
            // socket.broadcast.emit("message", data);
            // this is the typical approach used in chats apps where for every msg we write it in db
            await prisma.chats.create({
                data: data
            });
            // Send message to the room only
            socket.to(socket.room).emit("message", data);
        });
        socket.on("disconnect", () => {
            console.log("a user disconnected", socket.id);
        });
    });
}
