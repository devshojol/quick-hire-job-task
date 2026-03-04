import express from "express";
import {
  createJob,
  deleteJob,
  getJob,
  getJobStats,
  listJobs,
} from "../controllers/jobs.controller.js";
import { jobCreateSchema, validateBody } from "../utils/validation.js";

const router = express.Router();

router.get("/", listJobs);
router.get("/stats", getJobStats);
router.get("/:id", getJob);
router.post("/", validateBody(jobCreateSchema), createJob);
router.delete("/:id", deleteJob);

export default router;
