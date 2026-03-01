import {
  submitApplicationService,
  getApplicationsByJobService,
} from "../services/applications.service.js";

export const submitApplication = async (req, res) => {
  try {
    const application = await submitApplicationService(req.body);

    res.status(201).json({
      success: true,
      data: application,
      message: "Application submitted successfully",
    });
  } catch (err) {
    if (err.message === "JOB_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        error: "Job not found",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to submit application",
    });
  }
};

export const listApplicationsByJob = async (req, res) => {
  try {
    const applications = await getApplicationsByJobService(req.params.jobId);

    res.json({
      success: true,
      data: applications,
      count: applications.length,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: "Failed to fetch applications",
    });
  }
};
