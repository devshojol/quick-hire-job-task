import express from "express";
import * as appsCtrl from "../controllers/applications.controller.js";
import { applicationCreateSchema, validateBody } from "../utils/validation.js";

const router = express.Router();

router.post(
  "/",
  validateBody(applicationCreateSchema),
  appsCtrl.submitApplication,
);
router.get("/job/:jobId", appsCtrl.listApplicationsByJob);

export default router;
