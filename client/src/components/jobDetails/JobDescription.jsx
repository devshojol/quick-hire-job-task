export default function JobDescription({ description }) {
  return (
    <div className="bg-white border border-[#D6DDEB] p-6 md:p-8">
      <h2 className="text-xl font-bold text-[#25324B] mb-4">Job Description</h2>
      <div className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm">
        {description}
      </div>
    </div>
  );
}
