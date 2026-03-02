import mongoose from "mongoose";
import { z } from "zod";

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

export const salarySchema = z
  .object({
    min: z
      .number({ invalid_type_error: "salary.min must be a number" })
      .optional(),
    max: z
      .number({ invalid_type_error: "salary.max must be a number" })
      .optional(),
    currency: z
      .string({ invalid_type_error: "salary.currency must be a string" })
      .optional(),
  })
  .optional();

export const jobCreateSchema = z.object({
  title: z
    .string({ required_error: "title is required" })
    .min(1, "title cannot be empty"),
  company: z
    .string({ required_error: "company is required" })
    .min(1, "company cannot be empty"),
  companyLogo: z
    .string({ invalid_type_error: "companyLogo must be a string" })
    .url("companyLogo must be a valid URL")
    .optional(),
  location: z
    .string({ required_error: "location is required" })
    .min(1, "location cannot be empty"),
  category: z
    .string({ required_error: "category is required" })
    .min(1, "category cannot be empty"),
  tags: z
    .array(z.string({ invalid_type_error: "each tag must be a string" }))
    .optional(),
  jobType: z.enum(JOB_TYPES, {
    required_error: "jobType is required",
    invalid_type_error: `jobType must be one of: ${JOB_TYPES.join(", ")}`,
  }),
  description: z
    .string({ required_error: "description is required" })
    .min(1, "description cannot be empty"),
  salary: salarySchema,
  isActive: z
    .boolean({ invalid_type_error: "isActive must be a boolean" })
    .optional(),
});

export const applicationCreateSchema = z.object({
  job: z
    .string({ required_error: "job is required" })
    .refine(
      (id) => mongoose.Types.ObjectId.isValid(id),
      "job must be a valid id",
    ),
  name: z
    .string({ required_error: "name is required" })
    .min(1, "name cannot be empty"),
  email: z
    .string({ required_error: "email is required" })
    .email("email must be a valid email address"),
  resumeLink: z
    .string({ required_error: "resumeLink is required" })
    .url("resumeLink must be a valid URL"),
  coverNote: z
    .string({ invalid_type_error: "coverNote must be a string" })
    .optional(),
});

export const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      issues: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }
  req.body = result.data;
  next();
};
