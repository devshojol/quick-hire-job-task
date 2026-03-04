"use client";

import {
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";

export default function Toast({ message, type }) {
  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 text-white text-sm font-semibold shadow-xl rounded ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {type === "success" ? (
        <HiOutlineCheckCircle size={18} />
      ) : (
        <HiOutlineExclamationTriangle size={18} />
      )}
      {message}
    </div>
  );
}
