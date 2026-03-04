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

const getInitials = (name = "") => name.slice(0, 2).toUpperCase();

const LatestJobItem = ({ job }) => {
  const typeColor = JOB_TYPE_COLORS[job.jobType] || {
    bg: "#E8F9F2",
    text: "#0BA02C",
  };

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="flex items-start gap-4 p-4 border border-[#D6DDEB] hover:border-primary hover:shadow-sm transition-all duration-200 bg-white group"
    >
      <div className="w-12 h-12 rounded shrink-0 flex items-center justify-center  text-[#515B6F] font-bold text-sm overflow-hidden">
        {job.companyLogo ? (
          <img
            src={job.companyLogo}
            alt={job.company}
            width="64"
            height="64"
            className="w-full h-full object-contain"
          />
        ) : (
          getInitials(job.company)
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[#25324B] text-sm mb-0.5 group-hover:text-primary transition-colors truncate">
          {job.title}
        </h3>
        <p className="text-gray-400 text-xs flex items-center gap-1 mb-2 flex-wrap">
          <span>{job.company}</span>
          <span>·</span>
          <span className="flex items-center gap-0.5">
            <HiOutlineMapPin size={10} />
            {job.location}
          </span>
        </p>
        <div className="flex flex-wrap gap-1.5">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{ backgroundColor: typeColor.bg, color: typeColor.text }}
          >
            {job.jobType}
          </span>
          {(job.tags?.length ? job.tags : [job.category])
            .filter(Boolean)
            .slice(0, 2)
            .map((tag) => (
              <TagBadge key={tag} tag={tag} small />
            ))}
        </div>
      </div>
    </Link>
  );
};

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs()
      .then((res) => setJobs(res?.data || []))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      className={`py-12 md:py-16 bg-[#F8F8FD] bg-[url('/latestJobPattern.png')] bg-no-repeat bg-top-right  md:[clip-path:polygon(8%_0,100%_0,100%_100%,0_100%,0_12%)] lg:[clip-path:polygon(10%_0,100%_0,100%_100%,0_100%,0_10%)]`}
    >
      <div className="container mx-auto  px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Latest jobs <span className="text-spacialText">open</span>
          </h2>
          <Link
            href="/jobs"
            className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all text-sm md:text-base"
          >
            Show all jobs <HiOutlineArrowRight />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="border border-[#D6DDEB] p-4 bg-white animate-pulse flex gap-4"
              >
                <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded mb-2 w-2/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <LatestJobItem key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed border-[#D6DDEB] bg-white">
            <p className="text-gray-400">No recent jobs available.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
