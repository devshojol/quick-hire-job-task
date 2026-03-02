"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import TagBadge from "../../components/common/TagBadge";
import { fetchJobs, createJob, deleteJob } from "../../lib/api";
import {
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineBriefcase,
  HiOutlineXMark,
  HiOutlineEye,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";

const CATEGORIES = [
  "Design", "Sales", "Marketing", "Finance",
  "Technology", "Engineering", "Business", "Human Resource",
];
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

const JOB_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  "Full-time": { bg: "#E8F9F2", text: "#0BA02C" },
  "Part-time": { bg: "#FFF1F0", text: "#FF6550" },
  Contract: { bg: "#FFF6E6", text: "#FFB836" },
  Internship: { bg: "#EBEBFF", text: "#4640DE" },
};

const LOGO_COLORS = [
  "#4640DE", "#26A4FF", "#FF6550", "#0BA02C",
  "#FFB836", "#7A0ECC", "#E05151", "#47C1BF",
];

const getInitials = (name = "") => name.slice(0, 2).toUpperCase();

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

const Toast = ({ message, type }: { message: string; type: "success" | "error" }) => (
  <div
    className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 text-white text-sm font-semibold shadow-xl rounded transition-all ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`}
  >
    {type === "success" ? (
      <HiOutlineCheckCircle size={18} />
    ) : (
      <HiOutlineExclamationTriangle size={18} />
    )}
    {message}
  </div>
);

export default function AdminPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await fetchJobs({});
      setJobs(data?.data || []);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const validateForm = () => {
    const errs: Record<string, string> = {};
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

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    setFormErrors({});
    setSubmitting(true);
    try {
      const jobData: Record<string, any> = {
        title: form.title,
        company: form.company,
        location: form.location,
        category: form.category,
        jobType: form.jobType,
        description: form.description,
        isActive: form.isActive,
        tags: form.tags
          ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
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
      showToast("Job posted successfully!", "success");
      setForm(initialForm);
      setShowForm(false);
      loadJobs();
    } catch (err: any) {
      showToast(err.message || "Failed to create job", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteJob(id);
      showToast("Job deleted successfully", "success");
      setDeleteConfirm(null);
      loadJobs();
    } catch {
      showToast("Failed to delete job", "error");
    }
  };

  const fieldClass = (field: string) =>
    `w-full border px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors ${
      formErrors[field] ? "border-red-400 bg-red-50" : "border-[#D6DDEB]"
    }`;

  const stats = [
    { label: "Total Jobs", value: jobs.length, color: "text-primary" },
    {
      label: "Active",
      value: jobs.filter((j) => j.isActive !== false).length,
      color: "text-green-500",
    },
    {
      label: "Full Time",
      value: jobs.filter((j) => j.jobType === "Full-time").length,
      color: "text-[#26A4FF]",
    },
    {
      label: "Other Types",
      value: jobs.filter((j) => j.jobType !== "Full-time").length,
      color: "text-[#FFB836]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      <div className="bg-white shadow-sm">
        <Navbar />
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
          <div className="bg-white p-6 max-w-sm w-full shadow-2xl rounded">
            <div className="flex items-center gap-3 mb-3">
              <HiOutlineExclamationTriangle size={24} className="text-red-500" />
              <h3 className="font-bold text-[#25324B]">Delete Job</h3>
            </div>
            <p className="text-gray-500 text-sm mb-5 pl-9">
              Are you sure you want to delete this job listing? This action
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-500 text-white py-2.5 font-semibold hover:bg-red-600 transition-colors text-sm rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-[#D6DDEB] text-gray-600 py-2.5 font-semibold hover:bg-gray-50 transition-colors text-sm rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#25324B]">
              Admin Panel
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage job listings
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setFormErrors({});
              if (showForm) setForm(initialForm);
            }}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 font-semibold hover:bg-indigo-700 transition-colors text-sm"
          >
            {showForm ? (
              <>
                <HiOutlineXMark size={18} /> Cancel
              </>
            ) : (
              <>
                <HiOutlinePlus size={18} /> Post New Job
              </>
            )}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-[#D6DDEB] p-4 text-center"
            >
              <div className={`text-3xl font-bold mb-1 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Add job form */}
        {showForm && (
          <div className="bg-white border border-[#D6DDEB] p-6 md:p-8 mb-8">
            <h2 className="text-lg font-bold text-[#25324B] mb-6 pb-4 border-b border-[#D6DDEB]">
              Post New Job
            </h2>
            <form
              onSubmit={handleCreate}
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
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
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
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
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
                  onChange={(e) =>
                    setForm({ ...form, companyLogo: e.target.value })
                  }
                  className={fieldClass("companyLogo")}
                />
                {formErrors.companyLogo && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.companyLogo}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. San Francisco, USA"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className={fieldClass("location")}
                />
                {formErrors.location && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.location}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
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
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.category}
                  </p>
                )}
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
                  Job Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.jobType}
                  onChange={(e) => setForm({ ...form, jobType: e.target.value })}
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
                  <span className="text-gray-400 font-normal">
                    (comma-separated)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Design, Marketing, React"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
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
                    onChange={(e) =>
                      setForm({ ...form, salaryMin: e.target.value })
                    }
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
                    onChange={(e) =>
                      setForm({ ...form, salaryMax: e.target.value })
                    }
                    className="w-full border border-[#D6DDEB] px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
                    Currency
                  </label>
                  <select
                    value={form.salaryCurrency}
                    onChange={(e) =>
                      setForm({ ...form, salaryCurrency: e.target.value })
                    }
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
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
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
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                  className="accent-primary w-4 h-4"
                />
                <label
                  htmlFor="isActive"
                  className="text-sm font-semibold text-[#515B6F] cursor-pointer"
                >
                  Active listing (visible to job seekers)
                </label>
              </div>

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
                  onClick={() => {
                    setShowForm(false);
                    setFormErrors({});
                    setForm(initialForm);
                  }}
                  className="border border-[#D6DDEB] text-gray-600 px-6 py-2.5 font-semibold hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Jobs table */}
        <div className="bg-white border border-[#D6DDEB]">
          <div className="p-5 border-b border-[#D6DDEB] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HiOutlineBriefcase className="text-primary" size={20} />
              <h2 className="font-bold text-[#25324B]">All Job Listings</h2>
            </div>
            <span className="text-sm text-gray-400">{jobs.length} total</span>
          </div>

          {loading ? (
            <div className="p-10 text-center">
              <div className="animate-pulse space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded" />
                ))}
              </div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="p-16 text-center">
              <HiOutlineBriefcase size={40} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 mb-3">No jobs posted yet.</p>
              <button
                onClick={() => setShowForm(true)}
                className="text-primary font-semibold text-sm hover:underline"
              >
                Post your first job →
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F8F8FD] border-b border-[#D6DDEB]">
                  <tr>
                    <th className="text-left px-4 py-3 text-[#515B6F] font-semibold">
                      Job
                    </th>
                    <th className="text-left px-4 py-3 text-[#515B6F] font-semibold hidden md:table-cell">
                      Location
                    </th>
                    <th className="text-left px-4 py-3 text-[#515B6F] font-semibold hidden lg:table-cell">
                      Category
                    </th>
                    <th className="text-left px-4 py-3 text-[#515B6F] font-semibold">
                      Type
                    </th>
                    <th className="text-left px-4 py-3 text-[#515B6F] font-semibold hidden lg:table-cell">
                      Status
                    </th>
                    <th className="text-right px-4 py-3 text-[#515B6F] font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0F5]">
                  {jobs.map((job: any, index: number) => {
                    const typeColor =
                      JOB_TYPE_COLORS[job.jobType as string] || {
                        bg: "#E8F9F2",
                        text: "#0BA02C",
                      };
                    const color = LOGO_COLORS[index % LOGO_COLORS.length];
                    return (
                      <tr
                        key={job._id}
                        className="hover:bg-[#F8F8FD] transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded flex-shrink-0 flex items-center justify-center text-white font-bold text-xs overflow-hidden"
                              style={{ backgroundColor: color }}
                            >
                              {job.companyLogo ? (
                                <img
                                  src={job.companyLogo}
                                  alt={job.company}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                getInitials(job.company)
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-[#25324B]">
                                {job.title}
                              </div>
                              <div className="text-gray-400 text-xs sm:hidden">
                                {job.company}
                              </div>
                              <div className="text-gray-400 text-xs hidden sm:block">
                                {job.company}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                          {job.location}
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          {job.category && (
                            <TagBadge tag={job.category} small />
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: typeColor.bg,
                              color: typeColor.text,
                            }}
                          >
                            {job.jobType}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded ${
                              job.isActive !== false
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {job.isActive !== false ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/jobs/${job._id}`}
                              className="text-gray-400 hover:text-primary transition-colors p-1.5 rounded hover:bg-primary/10"
                              title="View job"
                            >
                              <HiOutlineEye size={16} />
                            </Link>
                            <button
                              onClick={() => setDeleteConfirm(job._id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded hover:bg-red-50"
                              title="Delete job"
                            >
                              <HiOutlineTrash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
