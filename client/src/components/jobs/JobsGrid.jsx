"use client";

import JobCard from "./JobCard";

export default function JobsGrid({
  jobs,
  loading,
  logoColors,
  jobTypeColors,
  onClearAll,
  hasActiveFilters,
}) {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-[#D6DDEB] p-5 animate-pulse flex gap-4"
          >
            <div className="w-12 h-12 bg-gray-200 rounded shrink-0" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white border border-[#D6DDEB] p-12 text-center">
        <p className="text-gray-400 text-lg mb-2">No jobs found</p>
        <p className="text-gray-400 text-sm">
          Try adjusting your search or filters
        </p>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="mt-4 text-primary font-semibold text-sm hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job, index) => {
        const color = logoColors[index % logoColors.length];
        const typeColor = jobTypeColors[job.jobType] || {
          bg: "#E8F9F2",
          text: "#0BA02C",
        };
        return (
          <JobCard
            key={job._id}
            job={job}
            logoColor={color}
            typeColor={typeColor}
          />
        );
      })}
    </div>
  );
}
