import { notFound } from "next/navigation";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import ApplyForm from "../../../components/jobDetails/ApplyForm";
import { fetchJob } from "../../../lib/api";
import JobHeader from "../../../components/jobDetails/JobHeader";
import JobDescription from "../../../components/jobDetails/JobDescription";
import SalaryCard from "../../../components/jobDetails/SalaryCard";

export default async function JobDetailPage({ params }) {
  const { id } = await params;

  let job;
  try {
    const res = await fetchJob(id);
    job = res?.data || res;
  } catch {
    notFound();
  }

  if (!job) notFound();

  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      <div className="bg-white shadow-sm">
        <Navbar />
      </div>

      <JobHeader job={job} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <JobDescription description={job.description} />
            <SalaryCard salary={job.salary} />
          </div>

          <ApplyForm job={id} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
