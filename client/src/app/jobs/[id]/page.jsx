import Link from "next/link";
import { notFound } from "next/navigation";
import {
  HiOutlineArrowLeft,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineCurrencyDollar,
  HiOutlineMapPin,
} from "react-icons/hi2";

import Footer from "../../../components/common/Footer";
import Navbar from "../../../components/common/Navbar";
import TagBadge from "../../../components/common/TagBadge";
import ApplyForm from "../../../components/jobDetails/ApplyForm";
import { fetchJob } from "../../../lib/api";

const JOB_TYPE_COLORS = {
  "Full-time": { bg: "#E8F9F2", text: "#0BA02C" },
  "Part-time": { bg: "#FFF1F0", text: "#FF6550" },
  Contract: { bg: "#FFF6E6", text: "#FFB836" },
  Internship: { bg: "#EBEBFF", text: "#4640DE" },
};

const getInitials = (name = "") => name.slice(0, 2).toUpperCase();

export default async function JobDetailPage({ params }) {
  const { id } = await params;

  let job;
  try {
    const res = await fetchJob(id);
    job = res?.data || res;
  } catch {
    notFound();
  }

  if (!job) {
    notFound();
  }

  const typeColor =
    JOB_TYPE_COLORS[job.jobType] || JOB_TYPE_COLORS["Full-time"];

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
            <div className="w-16 h-16 rounded flex items-center justify-center text-white font-bold text-lg flex-shrink-0 overflow-hidden">
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
                  style={{
                    backgroundColor: typeColor.bg,
                    color: typeColor.text,
                  }}
                >
                  {job.jobType}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                <span className="font-semibold text-[#25324B]">
                  {job.company}
                </span>
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
                    Posted{" "}
                    {new Date(job.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>

              {job.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.tags.map((tag) => (
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

            {job.salary && (job.salary.min || job.salary.max) && (
              <div className="bg-white border border-[#D6DDEB] p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#25324B] mb-3 flex items-center gap-2">
                  <HiOutlineCurrencyDollar className="text-primary" size={22} />
                  Salary Range
                </h2>
                <p className="text-2xl font-bold text-primary">
                  {job.salary.currency || "$"}
                  {job.salary.min?.toLocaleString()} –{" "}
                  {job.salary.currency || "$"}
                  {job.salary.max?.toLocaleString()}
                </p>
                <p className="text-gray-400 text-sm mt-1">per year</p>
              </div>
            )}
          </div>

          {/* Apply Now */}
          <ApplyForm job={id} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
