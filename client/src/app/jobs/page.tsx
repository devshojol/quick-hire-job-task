"use client";

import { useEffect, useState, useCallback } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import JobsHeader from "../../components/jobs/JobsHeader";
import SearchBar from "../../components/jobs/SearchBar";
import FilterSidebar from "../../components/jobs/FilterSidebar";
import MobileFilters from "../../components/jobs/MobileFilters";
import ActiveFilters from "../../components/jobs/ActiveFilters";
import JobsGrid from "../../components/jobs/JobsGrid";
import { fetchJobs } from "../../lib/api";

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
  "#4640DE",
  "#26A4FF",
  "#FF6550",
  "#0BA02C",
  "#FFB836",
  "#7A0ECC",
  "#E05151",
  "#47C1BF",
];

const hasActiveFilters = (
  category: string,
  jobType: string,
  location: string,
  search: string,
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

  const activeFilterCount = [category, jobType, location, search].filter(
    Boolean,
  ).length;

  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      <div className="bg-white shadow-sm">
        <Navbar />
      </div>

      <JobsHeader jobsCount={jobs.length} isLoading={loading} />

      <div className="container mx-auto px-4 py-6">
        <SearchBar
          search={search}
          location={location}
          onSearchChange={setSearch}
          onLocationChange={setLocation}
          onSearch={loadJobs}
        />

        <MobileFilters
          isOpen={mobileFilterOpen}
          onToggle={() => setMobileFilterOpen(!mobileFilterOpen)}
          category={category}
          jobType={jobType}
          categories={CATEGORIES}
          jobTypes={JOB_TYPES}
          onCategoryChange={setCategory}
          onJobTypeChange={setJobType}
          onApply={() => setMobileFilterOpen(false)}
          onClearAll={clearAll}
          activeFilterCount={activeFilterCount}
          hasActiveFilters={hasActiveFilters(category, jobType, location, search)}
        />

        <ActiveFilters
          category={category}
          jobType={jobType}
          location={location}
          search={search}
          onCategoryRemove={() => setCategory("")}
          onJobTypeRemove={() => setJobType("")}
          onLocationRemove={() => setLocation("")}
          onSearchRemove={() => setSearch("")}
          hasActiveFilters={hasActiveFilters(category, jobType, location, search)}
        />

        <div className="flex gap-6">
          <aside className="w-60 shrink-0 hidden lg:block">
            <FilterSidebar
              category={category}
              jobType={jobType}
              categories={CATEGORIES}
              jobTypes={JOB_TYPES}
              onCategoryChange={setCategory}
              onJobTypeChange={setJobType}
              onClearAll={clearAll}
              hasActiveFilters={hasActiveFilters(category, jobType, location, search)}
            />
          </aside>

          <div className="flex-1 min-w-0">
            <JobsGrid
              jobs={jobs}
              loading={loading}
              logoColors={LOGO_COLORS}
              jobTypeColors={JOB_TYPE_COLORS}
              onClearAll={clearAll}
              hasActiveFilters={hasActiveFilters(category, jobType, location, search)}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
