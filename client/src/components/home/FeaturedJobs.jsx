"use client";

import { fetchJobs } from "@/src/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineArrowRight, HiOutlineMapPin } from "react-icons/hi2";
import TagBadge from "../common/TagBadge";

const JOB_TYPE_COLORS = {
  "Full-time": { bg: "#E8F9F2", text: "#0BA02C" },
  "Part-time": { bg: "#FFF1F0", text: "#FF6550" },
  Contract: { bg: "#FFF6E6", text: "#FFB836" },
  Internship: { bg: "#EBEBFF", text: "#4640DE" },
};

const LOGO_COLORS = [
  "#4640DE",
  "#26A4FF",
  "#FF6550",
  "#0BA02C",
  "#FFB836",
  "#7A0ECC",
  "#E05151",
  "#47C1BF",
];

const getInitials = (name = "") => name.slice(0, 2).toUpperCase();

const JobCard = ({ job, index }) => {
  const color = LOGO_COLORS[index % LOGO_COLORS.length];
  const typeColor = JOB_TYPE_COLORS[job.jobType] || {
    bg: "#E8F9F2",
    text: "#0BA02C",
  };

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="min-w-10/12 sm:min-w-auto border border-[#D6DDEB] p-5 hover:border-primary hover:shadow-md transition-all duration-200 bg-white flex flex-col gap-4 group"
    >
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded flex items-center justify-center text-white font-bold text-sm flex-shrink-0 overflow-hidden"
          style={{ backgroundColor: job.companyLogo ? "transparent" : color }}
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
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded flex-shrink-0"
          style={{ backgroundColor: typeColor.bg, color: typeColor.text }}
        >
          {job.jobType}
        </span>
      </div>

      <div>
        <h3 className="font-semibold text-[#25324B] text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {job.title}
        </h3>
        <p className="text-gray-400 text-sm flex items-center gap-1 flex-wrap">
          <span className="font-medium">{job.company}</span>
          <span>·</span>
          <span className="flex items-center gap-0.5">
            <HiOutlineMapPin size={12} />
            {job.location}
          </span>
        </p>
      </div>

      <p className="text-gray-500 text-sm line-clamp-2 flex-1">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {(job.tags?.length ? job.tags : [job.category])
          .filter(Boolean)
          .slice(0, 3)
          .map((tag) => (
            <TagBadge key={tag} tag={tag} small />
          ))}
      </div>
    </Link>
  );
};

const SkeletonCard = () => (
  <div className="border border-[#D6DDEB] p-5 bg-white animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 bg-gray-200 rounded" />
      <div className="w-16 h-6 bg-gray-200 rounded" />
    </div>
    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
    <div className="h-3 bg-gray-200 rounded mb-4 w-1/2" />
    <div className="h-3 bg-gray-200 rounded mb-2" />
    <div className="h-3 bg-gray-200 rounded w-4/5" />
  </div>
);

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs()
      .then((res) => setJobs(res?.data || []))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-12 md:py-16 container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">
          Featured <span className="text-spacialText">jobs</span>
        </h2>
        <Link
          href="/jobs"
          className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all text-sm md:text-base"
        >
          Show all jobs <HiOutlineArrowRight />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : jobs.length > 0 ? (
        <div className="flex w-full overflow-x-auto sm:overflow-hidden scroll-smooth scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {jobs.slice(0, 8).map((job, i) => (
            <JobCard key={job._id} job={job} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-[#D6DDEB] bg-white">
          <p className="text-gray-400 mb-3">No featured jobs available yet.</p>
          <Link
            href="/admin"
            className="text-primary font-semibold text-sm hover:underline"
          >
            Post jobs from Admin Panel →
          </Link>
        </div>
      )}
    </section>
  );
};

export default FeaturedJobs;
