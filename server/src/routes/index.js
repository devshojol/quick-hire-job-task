import express from "express";
import applicationsRouter from "./applications.route.js";
import jobsRouter from "./jobs.route.js";

const router = express.Router();

router.use("/jobs", jobsRouter);
router.use("/applications", applicationsRouter);

export default router;
