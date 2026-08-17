import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttpModule from "pino-http";
const pinoHttp = pinoHttpModule.default;

import resumeRoutes from "./routes/resume.routes.js";
import authRoutes from "./routes/auth.routes.js";
import logger from "./config/logger.js";
import { swaggerSpec, swaggerUi } from "./config/swagger.js";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// HTTP logging
app.use(
  pinoHttp({
    logger,
  })
);
// Swagger API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);

// Health Check
app.get("/health", (req, res) => {
  req.log.info("Health check requested");

  res.json({
    success: true,
    message: "ResumeForge API is running 🚀",
  });
});

export default app;
