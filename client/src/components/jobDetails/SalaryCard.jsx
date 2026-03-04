import { HiOutlineCurrencyDollar } from "react-icons/hi2";

export default function SalaryCard({ salary }) {
  if (!salary || (!salary.min && !salary.max)) return null;

  return (
    <div className="bg-white border border-[#D6DDEB] p-6 md:p-8">
      <h2 className="text-xl font-bold text-[#25324B] mb-3 flex items-center gap-2">
        <HiOutlineCurrencyDollar className="text-primary" size={22} />
        Salary Range
      </h2>

      <p className="text-2xl font-bold text-primary">
        {salary.currency || "$"}
        {salary.min?.toLocaleString()} – {salary.currency || "$"}
        {salary.max?.toLocaleString()}
      </p>

      <p className="text-gray-400 text-sm mt-1">per year</p>
    </div>
  );
}
