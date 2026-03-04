"use client";

import { useMemo } from "react";

export default function AdminStats({ jobs }) {
  const stats = useMemo(
    () => [
      { label: "Total Jobs", value: jobs.length, color: "text-primary" },
      {
        label: "Active",
        value: jobs.filter((j) => j.isActive !== false).length,
        color: "text-green-500",
      },
      {
        label: "Full Time",
        value: jobs.filter((j) => j.jobType === "Full-time").length,
        color: "text-[#26A4FF]",
      },
      {
        label: "Other Types",
        value: jobs.filter((j) => j.jobType !== "Full-time").length,
        color: "text-[#FFB836]",
      },
    ],
    [jobs],
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-[#D6DDEB] p-4 text-center"
        >
          <div className={`text-3xl font-bold mb-1 ${stat.color}`}>
            {stat.value}
          </div>
          <div className="text-gray-500 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
