import express from "express";
import passport from "passport";
import { getUser, logoutUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: true }),
  (req, res) => res.redirect(`${process.env.CLIENT_URL}/dashboard`)
);

router.get("/user", getUser);
router.get("/logout", logoutUser);

export default router;
