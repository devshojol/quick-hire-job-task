import express from "express";
import { applicationCreateSchema, validateBody } from "../utils/validation.js";
import {
  listApplicationsByJob,
  submitApplication,
} from "../controllers/applications.controller.js";

const router = express.Router();

router.post("/", validateBody(applicationCreateSchema), submitApplication);
router.get("/job/:jobId", listApplicationsByJob);

export default router;
