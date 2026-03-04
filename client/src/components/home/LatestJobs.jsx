import { fetchJobs } from "@/src/lib/api";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";
import LatestJobsList from "./LatestJobsList";

const LatestJobs = async () => {
  let jobs = [];
  try {
    const res = await fetchJobs({ page: 1, limit: 6 });
    jobs = res?.data || [];
  } catch {
    jobs = [];
  }

  return (
    <section className="py-12 md:py-16 bg-[#F8F8FD] bg-[url('/latestJobPattern.png')] bg-no-repeat bg-top-right md:[clip-path:polygon(8%_0,100%_0,100%_100%,0_100%,0_12%)] lg:[clip-path:polygon(10%_0,100%_0,100%_100%,0_100%,0_10%)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Latest jobs <span className="text-spacialText">open</span>
          </h2>
          <Link
            href="/jobs"
            className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all text-sm md:text-base"
          >
            Show all jobs <HiOutlineArrowRight />
          </Link>
        </div>

        <LatestJobsList jobs={jobs} />
      </div>
    </section>
  );
};

export default LatestJobs;
