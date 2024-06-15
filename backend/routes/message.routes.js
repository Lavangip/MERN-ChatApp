import express from "express";
import { getMessages, sendMessage } from "../contollers/message.controller.js";
import protectRoute from "../middleware/protectRoutes.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;