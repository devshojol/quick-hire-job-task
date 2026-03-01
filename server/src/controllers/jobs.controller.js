import {
  createJobService,
  deleteJobByIdService,
  getJobByIdService,
  getJobsService,
} from "../services/jobs.service.js";

export const listJobs = async (req, res) => {
  try {
    const { category, location, search } = req.query;

    const filters = {};
    if (category) filters.category = category;
    if (location) filters.location = location;

    const jobs = await getJobsService(filters, { search });
    return res.json({
      success: true,
      data: jobs,
      count: Array.isArray(jobs) ? jobs.length : 0,
    });
  } catch (err) {
    console.error("listJobs error", err);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch jobs",
      details: err?.message,
    });
  }
};

export const getJob = async (req, res) => {
  try {
    console.log(req.params.id);
    const job = await getJobByIdService(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }
    return res.json({ success: true, data: job });
  } catch (err) {
    console.error("getJob error", err);
    return res
      .status(400)
      .json({ success: false, error: "Invalid job id", details: err?.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const job = await createJobService(req.body);
    return res
      .status(201)
      .json({ success: true, data: job, message: "Job created successfully" });
  } catch (err) {
    console.error("createJob error", err);
    return res.status(500).json({
      success: false,
      error: "Failed to create job",
      details: err?.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await deleteJobByIdService(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }
    return res.json({ success: true, message: "Job deleted successfully" });
  } catch (err) {
    console.error("deleteJob error", err);
    return res
      .status(400)
      .json({ success: false, error: "Invalid job id", details: err?.message });
  }
};
