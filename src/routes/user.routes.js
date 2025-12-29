import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { users } from "../models/user.model.js";

const router = express.Router();

router.get("/me", requireAuth, (req, res) => {
  const user = users.get(req.userId);
  res.json(user || { plan: "FREE", simulationCount: 0 });
});

export default router;
