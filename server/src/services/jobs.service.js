import Job from "../models/jobs.model.js";

export const createJobService = (data) => {
  return Job.create(data);
};

export const getJobsService = (filters = {}, options = {}) => {
  const { search } = options;
  const query = { ...filters };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  return Job.find(query).sort({ createdAt: -1 });
};

export const getJobByIdService = (id) => {
  console.log(id);
  return Job.findById(id);
};

export const deleteJobByIdService = (id) => {
  return Job.findByIdAndDelete(id);
};
