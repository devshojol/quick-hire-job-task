import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";

import TagBadge from "../common/TagBadge";
import JobMeta from "./JobMeta";

const JOB_TYPE_COLORS = {
  "Full-time": { bg: "#E8F9F2", text: "#0BA02C" },
  "Part-time": { bg: "#FFF1F0", text: "#FF6550" },
  Contract: { bg: "#FFF6E6", text: "#FFB836" },
  Internship: { bg: "#EBEBFF", text: "#4640DE" },
};

const getInitials = (name = "") => name.slice(0, 2).toUpperCase();

export default function JobHeader({ job }) {
  const typeColor =
    JOB_TYPE_COLORS[job.jobType] || JOB_TYPE_COLORS["Full-time"];

  return (
    <div className="bg-white border-b border-[#D6DDEB]">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-6 hover:gap-3 transition-all"
        >
          <HiOutlineArrowLeft size={16} /> Back to Jobs
        </Link>

        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-16 h-16 rounded flex items-center justify-center text-white font-bold text-lg overflow-hidden">
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

            <JobMeta job={job} />

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
  );
}
