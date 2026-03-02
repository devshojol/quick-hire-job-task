"use client";
import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden p-1.5 flex flex-col justify-center items-start size-8 gap-1 border rounded-full border-secondary bg-white"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-5 h-0.5 bg-gray-600 rounded transition-all duration-300 origin-center ${open ? "translate-y-1.75 rotate-45" : ""}`}
        />
        <span
          className={`block w-5 h-0.5 bg-gray-600 rounded transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`}
        />
        <span
          className={`block  h-0.5 bg-gray-600 rounded transition-all duration-300 origin-center ${open ? "-translate-y-1.25 -rotate-45 w-5" : "w-4"}`}
        />
      </button>

      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white px-5 flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out z-50 text-gray-600 font-medium ${open ? "max-h-96 py-4 shadow-md" : "max-h-0"}`}
      >
        <Link href="/jobs" onClick={() => setOpen(false)}>
          Find Jobs
        </Link>
        <Link href="/companies" onClick={() => setOpen(false)}>
          Browse Companies
        </Link>
        <hr className="my-2 border-secondary" />
        <Link
          href="/login"
          className="text-primary font-bold"
          onClick={() => setOpen(false)}
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="px-6 py-3 bg-primary text-white text-center hover:bg-indigo-700 transition-colors font-bold"
          onClick={() => setOpen(false)}
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default MobileMenu;
