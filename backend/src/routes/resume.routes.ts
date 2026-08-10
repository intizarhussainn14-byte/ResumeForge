import { Router } from "express";
import {
    create,
    getAll,
    getById,
    remove,
    update,
    analyze,
    getAnalysis,
  } from "../controllers/resume.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// Create Resume (Protected)
router.post("/", protect, create);
router.get("/", protect, getAll);
router.post("/:id/analyze", protect, analyze);
router.get("/:id/analysis", protect, getAnalysis);
router.get("/:id", protect, getById);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);
export default router;