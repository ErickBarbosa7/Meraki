import express from "express";
import cors from "cors";
import wordRoutes from "./routes/word.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", wordRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "MERAKI API - Discover words at /api/words" });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;