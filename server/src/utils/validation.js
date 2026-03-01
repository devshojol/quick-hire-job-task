import mongoose from "mongoose";
import { z } from "zod";

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

export const salarySchema = z
  .object({
    min: z.number().optional(),
    max: z.number().optional(),
    currency: z.string().optional(),
  })
  .optional();

export const jobCreateSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  companyLogo: z.string().url().optional(),
  location: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  jobType: z.enum(JOB_TYPES),
  description: z.string().min(1),
  salary: salarySchema,
  isActive: z.boolean().optional(),
});

export const applicationCreateSchema = z.object({
  job: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id)),
  name: z.string().min(1),
  email: z.string().email(),
  resumeLink: z.string().url(),
  coverNote: z.string().optional(),
});

export const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({
        success: false,
        error: "Validation failed",
        issues: result.error.format(),
      });
  }
  req.body = result.data;
  next();
};
