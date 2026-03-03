"use client";

interface JobsHeaderProps {
  jobsCount: number;
  isLoading: boolean;
}

export default function JobsHeader({ jobsCount, isLoading }: JobsHeaderProps) {
  return (
    <div className="bg-white border-b border-[#D6DDEB] py-8 md:py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[#25324B] mb-1">
          Find your <span className="text-primary">dream job</span>
        </h1>
        <p className="text-gray-500 text-sm">
          {isLoading
            ? "Loading..."
            : `${jobsCount} job${jobsCount !== 1 ? "s" : ""} available`}
        </p>
      </div>
    </div>
  );
}
