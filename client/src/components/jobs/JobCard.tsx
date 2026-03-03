"use client";

import Link from "next/link";
import TagBadge from "../common/TagBadge";
import { HiOutlineMapPin, HiOutlineArrowRight } from "react-icons/hi2";

interface JobCardProps {
  job: any;
  logoColor: string;
  typeColor: { bg: string; text: string };
}

const getInitials = (name = "") => name.slice(0, 2).toUpperCase();

export default function JobCard({ job, logoColor, typeColor }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job._id}`}
      className="bg-white border border-[#D6DDEB] p-4 md:p-5 flex flex-col sm:flex-row gap-4 hover:border-primary hover:shadow-md transition-all duration-200 group"
    >
      <div
        className="w-12 h-12 rounded shrink-0 flex items-center justify-center text-white font-bold text-sm self-start overflow-hidden"
        style={{
          backgroundColor: job.companyLogo ? "transparent" : logoColor,
        }}
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

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-[#25324B] group-hover:text-primary transition-colors">
            {job.title}
          </h3>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded shrink-0"
            style={{
              backgroundColor: typeColor.bg,
              color: typeColor.text,
            }}
          >
            {job.jobType}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-3 flex items-center gap-1 flex-wrap">
          <span className="font-medium">{job.company}</span>
          <span>·</span>
          <span className="flex items-center gap-0.5">
            <HiOutlineMapPin size={12} />
            {job.location}
          </span>
        </p>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {job.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {(job.tags?.length ? job.tags : [job.category])
            .filter(Boolean)
            .slice(0, 4)
            .map((tag: string) => (
              <TagBadge key={tag} tag={tag} small />
            ))}
        </div>
      </div>

      <div className="flex items-center self-center shrink-0">
        <HiOutlineArrowRight className="text-primary" size={20} />
      </div>
    </Link>
  );
}
