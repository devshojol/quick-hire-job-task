"use client";

import { useEffect, useRef, useState } from "react";
import { GrLocation } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

export default function LocationSearch({
  value,
  onChange,
  inputClassName = "",
  placeholder = "Search location",
}) {
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
        country.toLowerCase().includes(value.toLowerCase()) ||
        city.toLowerCase().includes(value.toLowerCase()),
    )
    .slice(0, 50);

  const handleSelect = ({ country, city }) => {
    onChange(`${city}, ${country}`);
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

  return (
    <div className="flex gap-4  relative" ref={wrapperRef}>
      <GrLocation size={24} className="mt-1 shrink-0" />
      <input
        type="text"
        placeholder={placeholder}
        className={inputClassName}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
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
  );
}
