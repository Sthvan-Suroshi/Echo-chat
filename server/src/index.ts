import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./socket.js";

const PORT = process.env.PORT || 7000;
const app: Application = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
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

//using the routes
app.use("/api", authRoutes);

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
