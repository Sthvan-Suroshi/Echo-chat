import express from "express";
import "dotenv/config";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 7000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    return res.send("It's working 🙌");
});
//importing the routes
import authRoutes from "./routes/index.js";
//using the routes
app.use("/api", authRoutes);
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
