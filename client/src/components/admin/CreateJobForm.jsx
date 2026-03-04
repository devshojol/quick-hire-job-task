"use client";

import { useState } from "react";
import LocationSearch from "../common/LocationSearch";
import { createJob } from "../../lib/api";

const CATEGORIES = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

const initialForm = {
  title: "",
  company: "",
  companyLogo: "",
  location: "",
  category: "",
  tags: "",
  jobType: "Full-time",
  description: "",
  salaryMin: "",
  salaryMax: "",
  salaryCurrency: "USD",
  isActive: true,
};

const validate = (form) => {
  const errs = {};
  if (!form.title.trim()) errs.title = "Title is required";
  if (!form.company.trim()) errs.company = "Company is required";
  if (!form.location.trim()) errs.location = "Location is required";
  if (!form.category) errs.category = "Category is required";
  if (!form.description.trim()) errs.description = "Description is required";
  if (form.companyLogo) {
    try {
      new URL(form.companyLogo);
    } catch {
      errs.companyLogo = "Must be a valid URL";
    }
  }
  return errs;
};

export default function CreateJobForm({ onSuccess, onError, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const fieldClass = (field) =>
    `w-full border px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors ${
      formErrors[field] ? "border-red-400 bg-red-50" : "border-[#D6DDEB]"
    }`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    setFormErrors({});
    setSubmitting(true);
    try {
      const jobData = {
        title: form.title,
        company: form.company,
        location: form.location,
        category: form.category,
        jobType: form.jobType,
        description: form.description,
        isActive: form.isActive,
        tags: form.tags
          ? form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
      };
      if (form.companyLogo) jobData.companyLogo = form.companyLogo;
      if (form.salaryMin || form.salaryMax) {
        jobData.salary = {
          min: form.salaryMin ? Number(form.salaryMin) : undefined,
          max: form.salaryMax ? Number(form.salaryMax) : undefined,
          currency: form.salaryCurrency,
        };
      }
      await createJob(jobData);
      onSuccess("Job posted successfully!");
      setForm(initialForm);
      onClose();
    } catch (err) {
      onError(err.message || "Failed to create job");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-[#D6DDEB] p-6 md:p-8 mb-8">
      <h2 className="text-lg font-bold text-[#25324B] mb-6 pb-4 border-b border-[#D6DDEB]">
        Post New Job
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Senior Product Designer"
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            className={fieldClass("title")}
          />
          {formErrors.title && (
            <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Google"
            value={form.company}
            onChange={(e) => setField("company", e.target.value)}
            className={fieldClass("company")}
          />
          {formErrors.company && (
            <p className="text-red-500 text-xs mt-1">{formErrors.company}</p>
          )}
        </div>

        {/* Company Logo */}
        <div>
          <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
            Company Logo URL{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="url"
            placeholder="https://example.com/logo.png"
            value={form.companyLogo}
            onChange={(e) => setField("companyLogo", e.target.value)}
            className={fieldClass("companyLogo")}
          />
          {formErrors.companyLogo && (
            <p className="text-red-500 text-xs mt-1">
              {formErrors.companyLogo}
            </p>
          )}
        </div>

        {/* Location — LocationSearch */}
        <div>
          <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
            Location <span className="text-red-500">*</span>
          </label>
          <div
            className={`border px-3 py-1 ${
              formErrors.location
                ? "border-red-400 bg-red-50"
                : "border-[#D6DDEB]"
            }`}
          >
            <LocationSearch
              locationIcon={false}
              value={form.location}
              onChange={(val) => setField("location", val)}
              placeholder="e.g. San Francisco, USA"
              inputClassName="w-full  text-sm text-[#25324B] focus:outline-none placeholder-gray-400 py-1.5 bg-transparent"
            />
          </div>
          {formErrors.location && (
            <p className="text-red-500 text-xs mt-1">{formErrors.location}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={form.category}
            onChange={(e) => setField("category", e.target.value)}
            className={`${fieldClass("category")} bg-white`}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {formErrors.category && (
            <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>
          )}
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
            Job Type <span className="text-red-500">*</span>
          </label>
          <select
            value={form.jobType}
            onChange={(e) => setField("jobType", e.target.value)}
            className="w-full border border-[#D6DDEB] px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-white"
          >
            {JOB_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
            Tags{" "}
            <span className="text-gray-400 font-normal">(comma-separated)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Design, Marketing, React"
            value={form.tags}
            onChange={(e) => setField("tags", e.target.value)}
            className="w-full border border-[#D6DDEB] px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        {/* Salary */}
        <div className="md:col-span-2 grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
              Salary Min
            </label>
            <input
              type="number"
              placeholder="50000"
              value={form.salaryMin}
              onChange={(e) => setField("salaryMin", e.target.value)}
              className="w-full border border-[#D6DDEB] px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
              Salary Max
            </label>
            <input
              type="number"
              placeholder="80000"
              value={form.salaryMax}
              onChange={(e) => setField("salaryMax", e.target.value)}
              className="w-full border border-[#D6DDEB] px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
              Currency
            </label>
            <select
              value={form.salaryCurrency}
              onChange={(e) => setField("salaryCurrency", e.target.value)}
              className="w-full border border-[#D6DDEB] px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-white"
            >
              {["USD", "EUR", "GBP", "BDT"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Describe the job responsibilities, requirements, benefits..."
            rows={6}
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            className={`${fieldClass("description")} resize-none`}
          />
          {formErrors.description && (
            <p className="text-red-500 text-xs mt-1">
              {formErrors.description}
            </p>
          )}
        </div>

        {/* isActive */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            checked={form.isActive}
            onChange={(e) => setField("isActive", e.target.checked)}
            className="accent-primary w-4 h-4"
          />
          <label
            htmlFor="isActive"
            className="text-sm font-semibold text-[#515B6F] cursor-pointer"
          >
            Active listing (visible to job seekers)
          </label>
        </div>

        {/* Actions */}
        <div className="md:col-span-2 flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary text-white px-8 py-2.5 font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60 text-sm"
          >
            {submitting ? "Posting..." : "Post Job"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border border-[#D6DDEB] text-gray-600 px-6 py-2.5 font-semibold hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
