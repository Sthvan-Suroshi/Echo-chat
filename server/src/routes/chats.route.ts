import { Router } from "express";
import { index } from "../controllers/chats.controller.js";

const router = Router();

router.route("/chats/:groupId").get(index);

export default router;
