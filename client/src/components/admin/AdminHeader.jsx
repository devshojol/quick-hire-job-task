"use client";

import { HiOutlinePlus, HiOutlineXMark } from "react-icons/hi2";

export default function AdminHeader({ showForm, onToggle }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#25324B]">
          Admin Panel
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage job listings</p>
      </div>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 font-semibold hover:bg-indigo-700 transition-colors text-sm"
      >
        {showForm ? (
          <>
            <HiOutlineXMark size={18} /> Cancel
          </>
        ) : (
          <>
            <HiOutlinePlus size={18} /> Post New Job
          </>
        )}
      </button>
    </div>
  );
}
