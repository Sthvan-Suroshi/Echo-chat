import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { destroy, index, show, store, update } from "../controllers/chatGroup.controller.js";
const router = Router();
//Auth
router.post("/auth/login", login);

//Chat group
router.route("/chat-group").post(authMiddleware, store).get(authMiddleware, index);
router
  .route("/chat-group/:id")
  .get(show)
  .delete(authMiddleware, destroy)
  .put(authMiddleware, update);

export default router;
