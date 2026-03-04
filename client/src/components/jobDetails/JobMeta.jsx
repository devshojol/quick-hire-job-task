import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineMapPin,
} from "react-icons/hi2";

export default function JobMeta({ job }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
      <span className="font-semibold text-[#25324B]">{job.company}</span>

      <span className="flex items-center gap-1">
        <HiOutlineMapPin size={14} />
        {job.location}
      </span>

      <span className="flex items-center gap-1">
        <HiOutlineBriefcase size={14} />
        {job.category}
      </span>

      {job.createdAt && (
        <span className="flex items-center gap-1">
          <HiOutlineCalendarDays size={14} />
          Posted{" "}
          {new Date(job.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      )}
    </div>
  );
}
