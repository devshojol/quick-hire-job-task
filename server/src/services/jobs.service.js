import Job from "../models/jobs.model.js";

export const createJobService = (data) => {
  return Job.create(data);
};

export const getJobsService = async (filters = {}, options = {}) => {
  const { search, location, page = 1, limit = 9 } = options;
  const query = { ...filters };
  const conditions = [];

  if (search) {
    conditions.push({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ],
    });
  }

  if (location) {
    conditions.push({ location: { $regex: location, $options: "i" } });
  }

  if (conditions.length > 0) {
    query.$and = conditions;
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [jobs, total] = await Promise.all([
    Job.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Job.countDocuments(query),
  ]);

  return { jobs, total };
};

export const getJobByIdService = (id) => {
  console.log(id);
  return Job.findById(id);
};

export const deleteJobByIdService = (id) => {
  return Job.findByIdAndDelete(id);
};
