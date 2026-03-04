"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [1];
  if (current > 3) pages.push("...");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 border border-[#D6DDEB] text-sm font-medium text-[#25324B] hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <HiChevronLeft size={16} />
        Prev
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 text-sm font-medium border transition-colors ${
              page === currentPage
                ? "bg-primary text-white border-primary"
                : "border-[#D6DDEB] text-[#25324B] hover:border-primary hover:text-primary"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 border border-[#D6DDEB] text-sm font-medium text-[#25324B] hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
        <HiChevronRight size={16} />
      </button>
    </div>
  );
}
