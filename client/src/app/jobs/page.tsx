"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import TagBadge from "../../components/common/TagBadge";
import { fetchJobs } from "../../lib/api";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineMapPin,
  HiOutlineArrowRight,
  HiOutlineXMark,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineChevronDown,
} from "react-icons/hi2";

const CATEGORIES = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

const JOB_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  "Full-time": { bg: "#E8F9F2", text: "#0BA02C" },
  "Part-time": { bg: "#FFF1F0", text: "#FF6550" },
  Contract: { bg: "#FFF6E6", text: "#FFB836" },
  Internship: { bg: "#EBEBFF", text: "#4640DE" },
};

const LOGO_COLORS = [
  "#4640DE", "#26A4FF", "#FF6550", "#0BA02C",
  "#FFB836", "#7A0ECC", "#E05151", "#47C1BF",
];

const getInitials = (name = "") => name.slice(0, 2).toUpperCase();

const hasActiveFilters = (
  category: string,
  jobType: string,
  location: string,
  search: string
) => !!(category || jobType || location || search);

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchJobs({ search, category, location, jobType });
      setJobs(data?.data || []);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [search, category, location, jobType]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      const q = params.get("search");
      if (cat) setCategory(cat);
      if (q) setSearch(q);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(loadJobs, 350);
    return () => clearTimeout(timeout);
  }, [loadJobs]);

  const clearAll = () => {
    setCategory("");
    setJobType("");
    setLocation("");
    setSearch("");
  };

  const activeFilterCount = [category, jobType, location, search].filter(Boolean).length;

  const FilterSidebar = () => (
    <div className="space-y-4">
      <div className="bg-white border border-[#D6DDEB] p-5">
        <h3 className="font-bold text-[#25324B] mb-4 text-sm uppercase tracking-wide">
          Category
        </h3>
        <div className="space-y-2.5">
          {["", ...CATEGORIES].map((cat) => (
            <label
              key={cat || "all"}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="category-desktop"
                value={cat}
                checked={category === cat}
                onChange={() => setCategory(cat)}
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
          {["", ...JOB_TYPES].map((type) => (
            <label
              key={type || "all"}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="jobType-desktop"
                value={type}
                checked={jobType === type}
                onChange={() => setJobType(type)}
                className="accent-primary w-4 h-4"
              />
              <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">
                {type || "All Types"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters(category, jobType, location, search) && (
        <button
          onClick={clearAll}
          className="w-full border border-primary text-primary py-2.5 text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      <div className="bg-white shadow-sm">
        <Navbar />
      </div>

      <div className="bg-white border-b border-[#D6DDEB] py-8 md:py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[#25324B] mb-1">
            Find your <span className="text-primary">dream job</span>
          </h1>
          <p className="text-gray-500 text-sm">
            {loading
              ? "Loading..."
              : `${jobs.length} job${jobs.length !== 1 ? "s" : ""} available`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white border border-[#D6DDEB] p-3 md:p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-3 flex-1 border-b sm:border-b-0 sm:border-r border-[#D6DDEB] pb-3 sm:pb-0 sm:pr-4">
            <HiOutlineMagnifyingGlass className="text-gray-400 shrink-0" size={20} />
            <input
              type="text"
              placeholder="Job title, keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 focus:outline-none text-sm text-[#25324B] placeholder-gray-400 min-w-0"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-gray-400 hover:text-gray-600 shrink-0"
              >
                <HiOutlineXMark size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 flex-1 border-b sm:border-b-0 sm:border-r border-[#D6DDEB] pb-3 sm:pb-0 sm:pr-4">
            <HiOutlineMapPin className="text-gray-400 shrink-0" size={20} />
            <input
              type="text"
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 focus:outline-none text-sm text-[#25324B] placeholder-gray-400 min-w-0"
            />
            {location && (
              <button
                onClick={() => setLocation("")}
                className="text-gray-400 hover:text-gray-600 shrink-0"
              >
                <HiOutlineXMark size={16} />
              </button>
            )}
          </div>

          <button
            onClick={loadJobs}
            className="bg-primary text-white px-6 py-2.5 font-semibold hover:bg-indigo-700 transition-colors text-sm shrink-0"
          >
            Search
          </button>
        </div>

        <div className="lg:hidden mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
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
                className={`transition-transform duration-200 ${mobileFilterOpen ? "rotate-180" : ""}`}
              />
            </button>

            {hasActiveFilters(category, jobType, location, search) && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-600 font-medium transition-colors"
              >
                <HiOutlineXMark size={15} />
                Clear all
              </button>
            )}
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              mobileFilterOpen ? "max-h-[600px] mt-3" : "max-h-0"
            }`}
          >
            <div className="bg-white border border-[#D6DDEB] p-4 space-y-5">
              <div>
                <h3 className="font-bold text-[#25324B] mb-3 text-sm uppercase tracking-wide">
                  Category
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {["", ...CATEGORIES].map((cat) => (
                    <button
                      key={cat || "all"}
                      onClick={() => setCategory(cat)}
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
                  {["", ...JOB_TYPES].map((type) => (
                    <button
                      key={type || "all"}
                      onClick={() => setJobType(type)}
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
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-primary text-white py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {hasActiveFilters(category, jobType, location, search) && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs text-gray-400 font-medium">Active filters:</span>
            {category && (
              <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                {category}
                <button onClick={() => setCategory("")} className="hover:text-indigo-800">
                  <HiOutlineXMark size={12} />
                </button>
              </span>
            )}
            {jobType && (
              <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                {jobType}
                <button onClick={() => setJobType("")} className="hover:text-indigo-800">
                  <HiOutlineXMark size={12} />
                </button>
              </span>
            )}
            {location && (
              <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                {location}
                <button onClick={() => setLocation("")} className="hover:text-indigo-800">
                  <HiOutlineXMark size={12} />
                </button>
              </span>
            )}
            {search && (
              <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                "{search}"
                <button onClick={() => setSearch("")} className="hover:text-indigo-800">
                  <HiOutlineXMark size={12} />
                </button>
              </span>
            )}
          </div>
        )}

        <div className="flex gap-6">
          <aside className="w-60 shrink-0 hidden lg:block">
            <FilterSidebar />
          </aside>

          <div className="flex-1 min-w-0">
            {loading ? (
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
            ) : jobs.length === 0 ? (
              <div className="bg-white border border-[#D6DDEB] p-12 text-center">
                <p className="text-gray-400 text-lg mb-2">No jobs found</p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your search or filters
                </p>
                {hasActiveFilters(category, jobType, location, search) && (
                  <button
                    onClick={clearAll}
                    className="mt-4 text-primary font-semibold text-sm hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job: any, index: number) => {
                  const color = LOGO_COLORS[index % LOGO_COLORS.length];
                  const typeColor =
                    JOB_TYPE_COLORS[job.jobType as string] || {
                      bg: "#E8F9F2",
                      text: "#0BA02C",
                    };
                  return (
                    <Link
                      key={job._id}
                      href={`/jobs/${job._id}`}
                      className="bg-white border border-[#D6DDEB] p-4 md:p-5 flex flex-col sm:flex-row gap-4 hover:border-primary hover:shadow-md transition-all duration-200 group"
                    >
                      <div
                        className="w-12 h-12 rounded shrink-0 flex items-center justify-center text-white font-bold text-sm self-start overflow-hidden"
                        style={{
                          backgroundColor: job.companyLogo ? "transparent" : color,
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
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
