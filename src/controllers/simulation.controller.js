import { v4 as uuid } from "uuid";
import { users } from "../models/user.model.js";
import { simulations } from "../models/simulation.model.js";
import { resetIfNeeded } from "../utils/resetMonthlyUsage.js";

export function runSimulation(req, res) {
  const userId = req.userId;
  const { businessType, decisionText, revenue, cost } = req.body;

  if (!users.has(userId)) {
    users.set(userId, {
      id: userId,
      plan: "FREE",
      simulationCount: 0,
      lastReset: Date.now()
    });
  }

  const user = users.get(userId);
  resetIfNeeded(user);

  if (user.plan === "FREE" && user.simulationCount >= 2) {
    return res.status(403).json({
      error: "LIMIT_REACHED",
      resetAt: user.lastReset + 1000 * 60 * 60 * 24 * 30
    });
  }

  const result = {
    outcome: "Positive",
    confidence: "78%",
    insight: "Projected margin improves if execution stays controlled."
  };

  const simulation = {
    id: uuid(),
    userId,
    businessType,
    decisionText,
    revenue,
    cost,
    result,
    createdAt: new Date()
  };

  simulations.push(simulation);
  user.simulationCount++;

  res.json(simulation);
}

export function getSimulationById(req, res) {
  const sim = simulations.find(s => s.id === req.params.id);
  if (!sim) return res.status(404).json({ error: "Not found" });
  res.json(sim);
}

export function getRecentSimulations(req, res) {
  const userId = req.userId;
  const recent = simulations
    .filter(s => s.userId === userId)
    .slice(-5)
    .reverse();

  res.json(recent);
}
