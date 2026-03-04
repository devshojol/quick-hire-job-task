"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import ActiveFilters from "../../components/jobs/ActiveFilters";
import FilterSidebar from "../../components/jobs/FilterSidebar";
import JobsGrid from "../../components/jobs/JobsGrid";
import JobsHeader from "../../components/jobs/JobsHeader";
import MobileFilters from "../../components/jobs/MobileFilters";
import Pagination from "../../components/jobs/Pagination";
import SearchBar from "../../components/jobs/SearchBar";
import { useDebounce } from "../../hooks/useDebounce";
import { fetchJobs } from "../../lib/api";

const JOBS_PER_PAGE = 9;

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

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);
  const debouncedLocation = useDebounce(location, 500);

  const hasActiveFilters = useMemo(
    () => !!(category || jobType || location || search),
    [category, jobType, location, search],
  );

  const activeFilterCount = useMemo(
    () => [category, jobType, location, search].filter(Boolean).length,
    [category, jobType, location, search],
  );

  const loadJobs = useCallback(
    async (currentPage = 1) => {
      setLoading(true);
      try {
        const data = await fetchJobs({
          search: debouncedSearch,
          category,
          location: debouncedLocation,
          jobType,
          page: currentPage,
          limit: JOBS_PER_PAGE,
        });
        setJobs(data?.data || []);
        setTotalPages(data?.pagination?.totalPages ?? 0);
        setTotalJobs(data?.pagination?.total ?? 0);
      } catch {
        setJobs([]);
        setTotalPages(0);
        setTotalJobs(0);
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearch, category, debouncedLocation, jobType],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      const loc = params.get("location");
      const q = params.get("search");
      if (cat) setCategory(cat);
      if (loc) setLocation(loc);
      if (q) setSearch(q);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    loadJobs(1);
  }, [loadJobs]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    loadJobs(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearAll = () => {
    setCategory("");
    setJobType("");
    setLocation("");
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      <div className="bg-white shadow-sm">
        <Navbar />
      </div>

      <JobsHeader jobsCount={totalJobs} isLoading={loading} />

      <div className="container mx-auto px-4 py-6">
        <SearchBar
          search={search}
          location={location}
          onSearchChange={setSearch}
          onLocationChange={setLocation}
          onSearch={() => loadJobs(1)}
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
          hasActiveFilters={hasActiveFilters}
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
          hasActiveFilters={hasActiveFilters}
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
              hasActiveFilters={hasActiveFilters}
            />
          </aside>

          <div className="flex-1 min-w-0">
            <JobsGrid
              jobs={jobs}
              loading={loading}
              logoColors={LOGO_COLORS}
              jobTypeColors={JOB_TYPE_COLORS}
              onClearAll={clearAll}
              hasActiveFilters={hasActiveFilters}
            />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
