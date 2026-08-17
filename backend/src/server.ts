import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import logger from "./config/logger.js";

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  logger.info(`ResumeForge API running on port ${PORT}`);
});
