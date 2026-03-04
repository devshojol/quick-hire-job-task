"use client";

import {
  HiOutlineBriefcase,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineChartBar,
  HiOutlineDocumentText,
} from "react-icons/hi2";

const STAT_CONFIG = [
  {
    key: "total",
    label: "Total Jobs",
    icon: HiOutlineBriefcase,
    color: "#4640DE",
    bg: "#EBEBFF",
  },
  {
    key: "active",
    label: "Active Jobs",
    icon: HiOutlineCheckCircle,
    color: "#0BA02C",
    bg: "#E8F9F2",
  },
  {
    key: "inactive",
    label: "Inactive Jobs",
    icon: HiOutlineXCircle,
    color: "#FF6550",
    bg: "#FFF1F0",
  },
  {
    key: "totalApplications",
    label: "Applications",
    icon: HiOutlineDocumentText,
    color: "#FFB836",
    bg: "#FFF6E6",
  },
  {
    key: "topCategory",
    label: "Top Category",
    icon: HiOutlineChartBar,
    color: "#26A4FF",
    bg: "#E8F5FF",
  },
];

export default function AdminStats({ stats, loading }) {
  const topCategory = stats?.byCategory?.[0]?.category ?? "—";

  const values = {
    total: stats?.total ?? 0,
    active: stats?.active ?? 0,
    inactive: stats?.inactive ?? 0,
    totalApplications: stats?.totalApplications ?? 0,
    topCategory,
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {STAT_CONFIG.map(({ key, label, icon: Icon, color, bg }) => (
        <div
          key={key}
          className="bg-white border border-[#D6DDEB] p-5 flex items-center gap-4"
        >
          <div
            className="w-11 h-11 rounded flex items-center justify-center shrink-0"
            style={{ backgroundColor: bg }}
          >
            <Icon size={22} style={{ color }} />
          </div>
          <div className="min-w-0">
            {loading ? (
              <div className="h-6 w-12 bg-gray-100 animate-pulse rounded mb-1" />
            ) : (
              <div className="text-xl font-bold text-[#25324B] truncate">
                {typeof values[key] === "number"
                  ? values[key].toLocaleString()
                  : values[key]}
              </div>
            )}
            <div className="text-xs text-gray-400 font-medium">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
