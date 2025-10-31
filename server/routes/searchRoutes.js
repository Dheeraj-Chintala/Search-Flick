import express from "express";
import { ensureAuth } from "../middleware/authMiddleware.js";
import { handleSearch, getTopSearches } from "../controllers/searchController.js";

const router = express.Router();

router.post("/", ensureAuth, handleSearch);
router.get("/top-searches", getTopSearches);

export default router;
