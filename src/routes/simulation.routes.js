import express from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  runSimulation,
  getSimulationById,
  getRecentSimulations
} from "../controllers/simulation.controller.js";

const router = express.Router();

router.post("/run", requireAuth, runSimulation);
router.get("/recent", requireAuth, getRecentSimulations);
router.get("/:id", requireAuth, getSimulationById);

export default router;
