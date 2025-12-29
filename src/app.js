import express from "express";
import cors from "cors";

import simulationRoutes from "./routes/simulation.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

app.use("/api/simulations", simulationRoutes);
app.use("/api/user", userRoutes);

export default app;
