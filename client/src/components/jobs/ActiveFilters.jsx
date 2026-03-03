"use client";

import { HiOutlineXMark } from "react-icons/hi2";

export default function ActiveFilters({
  category,
  jobType,
  location,
  search,
  onCategoryRemove,
  onJobTypeRemove,
  onLocationRemove,
  onSearchRemove,
  hasActiveFilters,
}) {
  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-xs text-gray-400 font-medium">Active filters:</span>
      {category && (
        <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
          {category}
          <button onClick={onCategoryRemove} className="hover:text-indigo-800">
            <HiOutlineXMark size={12} />
          </button>
        </span>
      )}
      {jobType && (
        <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
          {jobType}
          <button onClick={onJobTypeRemove} className="hover:text-indigo-800">
            <HiOutlineXMark size={12} />
          </button>
        </span>
      )}
      {location && (
        <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
          {location}
          <button onClick={onLocationRemove} className="hover:text-indigo-800">
            <HiOutlineXMark size={12} />
          </button>
        </span>
      )}
      {search && (
        <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
          &quot;{search}&quot;
          <button onClick={onSearchRemove} className="hover:text-indigo-800">
            <HiOutlineXMark size={12} />
          </button>
        </span>
      )}
    </div>
  );
}
