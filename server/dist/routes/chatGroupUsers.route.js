import { Router } from "express";
import { index, store } from "../controllers/chatGroupUser.controller.js";
const router = Router();
router.route("/chat-group-users").get(index).post(store);
export default router;
