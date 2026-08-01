import express from "express";
import cors from "cors";
import helmet from "helmet";
import resumeRoutes from "./routes/resume.routes.js";

import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
// Health Check
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "ResumeForge API is running 🚀",
  });
});

export default app;