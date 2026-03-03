"use client";

export default function FilterSidebar({
  category,
  jobType,
  categories,
  jobTypes,
  onCategoryChange,
  onJobTypeChange,
  onClearAll,
  hasActiveFilters,
}) {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-[#D6DDEB] p-5">
        <h3 className="font-bold text-[#25324B] mb-4 text-sm uppercase tracking-wide">
          Category
        </h3>
        <div className="space-y-2.5">
          {["", ...categories].map((cat) => (
            <label
              key={cat || "all"}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="category-desktop"
                value={cat}
                checked={category === cat}
                onChange={() => onCategoryChange(cat)}
                className="accent-primary w-4 h-4"
              />
              <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">
                {cat || "All Categories"}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white border border-[#D6DDEB] p-5">
        <h3 className="font-bold text-[#25324B] mb-4 text-sm uppercase tracking-wide">
          Job Type
        </h3>
        <div className="space-y-2.5">
          {["", ...jobTypes].map((type) => (
            <label
              key={type || "all"}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="jobType-desktop"
                value={type}
                checked={jobType === type}
                onChange={() => onJobTypeChange(type)}
                className="accent-primary w-4 h-4"
              />
              <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">
                {type || "All Types"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="w-full border border-primary text-primary py-2.5 text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}
