"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import TagBadge from "../../../components/common/TagBadge";
import { fetchJob, submitApplication } from "../../../lib/api";
import {
  HiOutlineMapPin,
  HiOutlineArrowLeft,
  HiOutlineCalendarDays,
  HiOutlineBriefcase,
  HiOutlineCurrencyDollar,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

const LOGO_COLORS = [
  "#4640DE", "#26A4FF", "#FF6550", "#0BA02C",
  "#FFB836", "#7A0ECC", "#E05151", "#47C1BF",
];

const JOB_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  "Full-time": { bg: "#E8F9F2", text: "#0BA02C" },
  "Part-time": { bg: "#FFF1F0", text: "#FF6550" },
  Contract: { bg: "#FFF6E6", text: "#FFB836" },
  Internship: { bg: "#EBEBFF", text: "#4640DE" },
};

const getInitials = (name = "") => name.slice(0, 2).toUpperCase();

const initialForm = { name: "", email: "", resumeLink: "", coverNote: "" };

export default function JobDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (!id) return;
    fetchJob(id)
      .then((res) => setJob(res?.data || res))
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [id]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address";
    if (!form.resumeLink.trim()) errs.resumeLink = "Resume link is required";
    else {
      try {
        new URL(form.resumeLink);
      } catch {
        errs.resumeLink = "Must be a valid URL (e.g. https://...)";
      }
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setApplying(true);
    try {
      await submitApplication({ ...form, job: id });
      setSubmitStatus("success");
      setForm(initialForm);
    } catch {
      setSubmitStatus("error");
    } finally {
      setApplying(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full border px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors ${
      errors[field] ? "border-red-400 bg-red-50" : "border-[#D6DDEB]"
    }`;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F8FD]">
        <div className="bg-white shadow-sm">
          <Navbar />
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4 max-w-3xl">
            <div className="h-6 bg-gray-200 rounded w-32" />
            <div className="h-10 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-64 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#F8F8FD]">
        <div className="bg-white shadow-sm">
          <Navbar />
        </div>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Job not found</h2>
          <p className="text-gray-400 mb-6">
            This job listing may have been removed or doesn't exist.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <HiOutlineArrowLeft /> Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const typeColor =
    JOB_TYPE_COLORS[job.jobType as string] || { bg: "#E8F9F2", text: "#0BA02C" };

  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      <div className="bg-white shadow-sm">
        <Navbar />
      </div>

      {/* Job header */}
      <div className="bg-white border-b border-[#D6DDEB]">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-6 hover:gap-3 transition-all"
          >
            <HiOutlineArrowLeft size={16} /> Back to Jobs
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div
              className="w-16 h-16 rounded flex items-center justify-center text-white font-bold text-lg flex-shrink-0 overflow-hidden"
              style={{ backgroundColor: LOGO_COLORS[0] }}
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

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-[#25324B]">
                  {job.title}
                </h1>
                <span
                  className="text-sm font-semibold px-3 py-1 rounded"
                  style={{ backgroundColor: typeColor.bg, color: typeColor.text }}
                >
                  {job.jobType}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                <span className="font-semibold text-[#25324B]">{job.company}</span>
                <span className="flex items-center gap-1">
                  <HiOutlineMapPin size={14} />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <HiOutlineBriefcase size={14} />
                  {job.category}
                </span>
                {job.createdAt && (
                  <span className="flex items-center gap-1">
                    <HiOutlineCalendarDays size={14} />
                    Posted {new Date(job.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                )}
              </div>

              {job.tags && job.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.tags.map((tag: string) => (
                    <TagBadge key={tag} tag={tag} small />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Job description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-[#D6DDEB] p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#25324B] mb-4">
                Job Description
              </h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm">
                {job.description}
              </div>
            </div>

            {/* Salary */}
            {job.salary && (job.salary.min || job.salary.max) && (
              <div className="bg-white border border-[#D6DDEB] p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#25324B] mb-3 flex items-center gap-2">
                  <HiOutlineCurrencyDollar className="text-primary" size={22} />
                  Salary Range
                </h2>
                <p className="text-2xl font-bold text-primary">
                  {job.salary.currency || "$"}
                  {job.salary.min?.toLocaleString()} – {job.salary.currency || "$"}
                  {job.salary.max?.toLocaleString()}
                </p>
                <p className="text-gray-400 text-sm mt-1">per year</p>
              </div>
            )}
          </div>

          {/* Apply Now form */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#D6DDEB] p-6 sticky top-6">
              <h2 className="text-xl font-bold text-[#25324B] mb-5">Apply Now</h2>

              {submitStatus === "success" ? (
                <div className="text-center py-8">
                  <HiOutlineCheckCircle
                    size={48}
                    className="text-green-500 mx-auto mb-3"
                  />
                  <h3 className="font-bold text-[#25324B] mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-gray-500 text-sm mb-5">
                    We'll review your application and get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitStatus("idle")}
                    className="text-primary font-semibold text-sm hover:underline"
                  >
                    Apply Again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass("name")}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
                      Resume Link <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://drive.google.com/..."
                      value={form.resumeLink}
                      onChange={(e) =>
                        setForm({ ...form, resumeLink: e.target.value })
                      }
                      className={inputClass("resumeLink")}
                    />
                    {errors.resumeLink && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.resumeLink}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
                      Cover Note{" "}
                      <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      placeholder="Tell us why you're the right fit..."
                      rows={4}
                      value={form.coverNote}
                      onChange={(e) =>
                        setForm({ ...form, coverNote: e.target.value })
                      }
                      className="w-full border border-[#D6DDEB] px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none transition-colors"
                    />
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={applying}
                    className="w-full bg-primary text-white py-3 font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60 text-sm"
                  >
                    {applying ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
