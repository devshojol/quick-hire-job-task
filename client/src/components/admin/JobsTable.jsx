"use client";

import Link from "next/link";
import {
  HiOutlineBriefcase,
  HiOutlineEye,
  HiOutlineTrash,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import TagBadge from "../common/TagBadge";

const JOB_TYPE_COLORS = {
  "Full-time": { bg: "#E8F9F2", text: "#0BA02C" },
  "Part-time": { bg: "#FFF1F0", text: "#FF6550" },
  Contract: { bg: "#FFF6E6", text: "#FFB836" },
  Internship: { bg: "#EBEBFF", text: "#4640DE" },
};

const getInitials = (name = "") => name.slice(0, 2).toUpperCase();

function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (current > 3) pages.push("...");
  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(total - 1, current + 1);
    i++
  ) {
    pages.push(i);
  }
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

function JobRow({ job, onDeleteClick }) {
  const typeColor = JOB_TYPE_COLORS[job.jobType] || {
    bg: "#E8F9F2",
    text: "#0BA02C",
  };

  return (
    <tr className="hover:bg-[#F8F8FD] transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded shrink-0 flex items-center justify-center text-white font-bold text-xs overflow-hidden bg-primary/10">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.company}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-primary">{getInitials(job.company)}</span>
            )}
          </div>
          <div>
            <div className="font-medium text-[#25324B]">{job.title}</div>
            <div className="text-gray-400 text-xs">{job.company}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-gray-500 text-sm hidden md:table-cell">
        {job.location}
      </td>
      <td className="px-4 py-3 hidden lg:table-cell">
        {job.category && <TagBadge tag={job.category} small />}
      </td>
      <td className="px-4 py-3">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded"
          style={{ backgroundColor: typeColor.bg, color: typeColor.text }}
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
            onClick={() => onDeleteClick(job._id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded hover:bg-red-50"
            title="Delete job"
          >
            <HiOutlineTrash size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  total,
  limit,
}) {
  if (totalPages <= 1) return null;
  const pages = getPageNumbers(currentPage, totalPages);
  const from = (currentPage - 1) * limit + 1;
  const to = Math.min(currentPage * limit, total);

  return (
    <div className="px-4 py-3 border-t border-[#D6DDEB] flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-xs text-gray-400">
        Showing{" "}
        <span className="font-semibold text-[#25324B]">
          {from}–{to}
        </span>{" "}
        of <span className="font-semibold text-[#25324B]">{total}</span> jobs
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-2.5 py-1.5 border border-[#D6DDEB] text-xs font-medium text-[#25324B] hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <HiChevronLeft size={14} />
          Prev
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`e-${i}`}
              className="w-8 h-8 flex items-center justify-center text-gray-400 text-xs"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 text-xs font-medium border transition-colors ${
                p === currentPage
                  ? "bg-primary text-white border-primary"
                  : "border-[#D6DDEB] text-[#25324B] hover:border-primary hover:text-primary"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-2.5 py-1.5 border border-[#D6DDEB] text-xs font-medium text-[#25324B] hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
          <HiChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default function JobsTable({
  jobs,
  loading,
  onDeleteClick,
  onAddJobClick,
  currentPage,
  totalPages,
  total,
  limit,
  onPageChange,
}) {
  return (
    <div className="bg-white border border-[#D6DDEB]">
      <div className="p-5 border-b border-[#D6DDEB] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HiOutlineBriefcase className="text-primary" size={20} />
          <h2 className="font-bold text-[#25324B]">All Job Listings</h2>
        </div>
        <span className="text-sm text-gray-400">
          {total ?? jobs.length} total
        </span>
      </div>

      {loading ? (
        <div className="p-10">
          <div className="animate-pulse space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="p-16 text-center">
          <HiOutlineBriefcase
            size={40}
            className="text-gray-200 mx-auto mb-3"
          />
          <p className="text-gray-400 mb-3">No jobs posted yet.</p>
          <button
            onClick={onAddJobClick}
            className="text-primary font-semibold text-sm hover:underline"
          >
            Post your first job →
          </button>
        </div>
      ) : (
        <>
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
                {jobs.map((job) => (
                  <JobRow
                    key={job._id}
                    job={job}
                    onDeleteClick={onDeleteClick}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            total={total}
            limit={limit}
          />
        </>
      )}
    </div>
  );
}
