import express from "express";
import protectRoute from "../middleware/protectRoutes.js";
import { getUserFoSideBar } from "../contollers/user.controller.js";

const router = express.Router();

router.get("/",protectRoute, getUserFoSideBar)

export default router;