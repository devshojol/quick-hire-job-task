import Application from "../models/applications.model.js";
import Job from "../models/jobs.model.js";

export const submitApplicationService = async (data) => {
  const jobExists = await Job.exists({ _id: data.job });
  if (!jobExists) {
    throw new Error("JOB_NOT_FOUND");
  }

  return Application.create(data);
};

export const getApplicationsByJobService = (jobId) => {
  return Application.find({ job: jobId }).sort({ createdAt: -1 });
};
