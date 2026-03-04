"use client";

import { HiOutlineMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";
import LocationSearch from "../common/LocationSearch";

export default function SearchBar({
  search,
  location,
  onSearchChange,
  onLocationChange,
  onSearch,
}) {
  return (
    <div className="bg-white border border-[#D6DDEB] p-3 md:p-4 mb-6 flex flex-col sm:flex-row gap-3">
      <div className="flex items-center gap-3 flex-1 border-b sm:border-b-0 sm:border-r border-[#D6DDEB] pb-3 sm:pb-0 sm:pr-4">
        <HiOutlineMagnifyingGlass
          className="text-gray-400 shrink-0"
          size={20}
        />
        <input
          type="text"
          placeholder="Job title, keyword..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 focus:outline-none text-sm text-[#25324B] placeholder-gray-400 min-w-0"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="text-gray-400 hover:text-gray-600 shrink-0"
          >
            <HiOutlineXMark size={16} />
          </button>
        )}
      </div>

      <div className="flex-1 border-b sm:border-b-0 sm:border-r border-[#D6DDEB] pb-3 sm:pb-0 sm:pr-4">
        <LocationSearch
          value={location}
          onChange={onLocationChange}
          inputClassName="flex-1 focus:outline-none text-sm text-[#25324B] placeholder-gray-400 min-w-0 w-full pr-6"
        />
      </div>

      <button
        onClick={onSearch}
        className="bg-primary text-white px-6 py-2.5 font-semibold hover:bg-indigo-700 transition-colors text-sm shrink-0"
      >
        Search
      </button>
    </div>
  );
}
