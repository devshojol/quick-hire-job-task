"use client";
import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

const JobSearch = () => {
  const [locationQuery, setLocationQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((res) => res.json())
      .then((json) => {
        const flat = json.data.flatMap(({ country, cities }) =>
          cities.map((city) => ({ country, city })),
        );
        setLocations(flat);
      })
      .catch(() => setLocations([]));
  }, []);

  const filtered = locations
    .filter(
      ({ country, city }) =>
        country.toLowerCase().includes(locationQuery.toLowerCase()) ||
        city.toLowerCase().includes(locationQuery.toLowerCase()),
    )
    .slice(0, 50);

  const handleSelect = ({ country, city }) => {
    setLocationQuery(`${city}, ${country}`);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      <div className="flex gap-4 items-start relative" ref={wrapperRef}>
        <GrLocation size={24} className="mt-1 shrink-0" />
        <input
          type="text"
          placeholder="Search location"
          className="border-b-[1.5px] border-gray-300 focus:outline-none pb-3 w-full lg:w-67.5"
          value={locationQuery}
          onChange={(e) => {
            setLocationQuery(e.target.value);
            setDropdownOpen(true);
          }}
          onFocus={() => setDropdownOpen(true)}
        />
        <IoIosArrowDown
          className={`absolute right-0 top-2 text-gray-500 cursor-pointer transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
          onClick={() => setDropdownOpen((prev) => !prev)}
        />

        {dropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map(({ country, city }) => (
                <button
                  key={`${country}-${city}`}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                  onClick={() => handleSelect({ country, city })}
                >
                  <span className="font-medium text-gray-800">{city}</span>
                  <span className="text-gray-400 text-sm ml-2">{country}</span>
                </button>
              ))
            ) : (
              <p className="px-4 py-3 text-gray-400 text-sm">
                No locations found
              </p>
            )}
          </div>
        )}
      </div>

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
