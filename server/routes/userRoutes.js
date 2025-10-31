import express from "express";
import { ensureAuth } from "../middleware/authMiddleware.js";
import { getUserHistory } from "../controllers/userController.js";

const router = express.Router();

router.get("/history", ensureAuth, getUserHistory);

export default router;
