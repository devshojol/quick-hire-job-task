"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import LocationSearch from "../common/LocationSearch";

const JobSearch = () => {
  const [locationQuery, setLocationQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (locationQuery) params.set("location", locationQuery);
    window.location.href = `/jobs?${params.toString()}`;
  };

  return (
    <div className="bg-white p-5 shadow-md shadow-gray-100 flex flex-col lg:flex-row gap-5 lg:gap-10 lg:items-end z-20 relative w-full lg:max-w-min">
      <div className="flex gap-4 items-start lg:ml-5">
        <FiSearch size={24} className="mt-1 shrink-0" />
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          name="search"
          type="text"
          placeholder="Job title or keyword"
          className="border-b-[1.5px] border-gray-300 focus:outline-none pb-3 w-full lg:w-67.5"
        />
      </div>

      <LocationSearch
        value={locationQuery}
        onChange={setLocationQuery}
        inputClassName="border-b-[1.5px] border-gray-300 focus:outline-none pb-3 w-full lg:w-67.5"
      />

      <button
        onClick={handleSearch}
        className="px-6 py-3 w-full cursor-pointer lg:w-52.25 bg-primary text-white hover:bg-indigo-700 transition-colors font-bold"
      >
        Search my job
      </button>
    </div>
  );
};

export default JobSearch;
