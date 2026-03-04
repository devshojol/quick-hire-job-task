"use client";

import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineChevronDown,
  HiOutlineXMark,
} from "react-icons/hi2";

export default function MobileFilters({
  isOpen,
  onToggle,
  category,
  jobType,
  categories,
  jobTypes,
  onCategoryChange,
  onJobTypeChange,
  onApply,
  onClearAll,
  activeFilterCount,
  hasActiveFilters,
}) {
  return (
    <div className="lg:hidden mb-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 border border-[#D6DDEB] bg-white px-4 py-2.5 text-sm font-semibold text-[#25324B] hover:border-primary hover:text-primary transition-colors"
        >
          <HiOutlineAdjustmentsHorizontal size={18} />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
          <HiOutlineChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-600 font-medium transition-colors"
          >
            <HiOutlineXMark size={15} />
            Clear all
          </button>
        )}
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-auto mt-3" : "max-h-0"
        }`}
      >
        <div className="bg-white border border-[#D6DDEB] p-4 space-y-5">
          <div>
            <h3 className="font-bold text-[#25324B] mb-3 text-sm uppercase tracking-wide">
              Category
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {["", ...categories].map((cat) => (
                <button
                  key={cat || "all"}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-3 py-2 text-sm font-medium border transition-colors text-left ${
                    category === cat
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-600 border-[#D6DDEB] hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat || "All"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-[#25324B] mb-3 text-sm uppercase tracking-wide">
              Job Type
            </h3>
            <div className="flex flex-wrap gap-2">
              {["", ...jobTypes].map((type) => (
                <button
                  key={type || "all"}
                  onClick={() => onJobTypeChange(type)}
                  className={`px-4 py-2 text-sm font-medium border transition-colors ${
                    jobType === type
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-600 border-[#D6DDEB] hover:border-primary hover:text-primary"
                  }`}
                >
                  {type || "All Types"}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onApply}
            className="w-full bg-primary text-white py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
