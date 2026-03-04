import { fetchJobs } from "@/src/lib/api";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";
import FeaturedJobsGrid from "./FeaturedJobsGrid";

const FeaturedJobs = async () => {
  let jobs = [];
  try {
    const res = await fetchJobs({ page: 3, limit: 8 });
    jobs = res?.data || [];
  } catch {
    jobs = [];
  }

  return (
    <section className="py-12 md:py-16 container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">
          Featured <span className="text-spacialText">jobs</span>
        </h2>
        <Link
          href="/jobs"
          className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all text-sm md:text-base"
        >
          Show all jobs <HiOutlineArrowRight />
        </Link>
      </div>

      <FeaturedJobsGrid jobs={jobs} />
    </section>
  );
};

export default FeaturedJobs;
