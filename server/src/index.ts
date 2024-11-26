import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./socket.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import { instrument } from "@socket.io/admin-ui";
import redis from "./config/redis.config.js";

const PORT = process.env.PORT || 7000;
const app: Application = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    credentials: true
  },
  adapter: createAdapter(redis)
});

// socket io admin to track the connections, rooms etc
instrument(io, {
  auth: false,
  mode: "development"
});

setupSocket(io); // this function runs for each new connection
export { io };

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

//importing the routes
import authRoutes from "./routes/index.js";
import chatGroupRoutes from "./routes/chatGroupUsers.route.js";
import chatsRoutes from "./routes/chats.route.js";

//using the routes
app.use("/api", authRoutes);
app.use("/api", chatGroupRoutes);
app.use("/api", chatsRoutes);

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
