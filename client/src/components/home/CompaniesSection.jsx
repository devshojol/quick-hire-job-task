const companies = [
  { name: "Vodafone", style: "font-bold tracking-wide text-xl" },
  { name: "intel", style: "font-light text-2xl italic" },
  { name: "TESLA", style: "font-bold tracking-[0.3em] text-lg" },
  { name: "AMD\u039b", style: "font-bold text-xl" },
  { name: "Talkit", style: "font-semibold tracking-wide text-xl" },
];

const CompaniesSection = () => {
  return (
    <section className="py-10 md:py-12 border-b border-[#D6DDEB]">
      <div className="container mx-auto px-4">
        <p className="text-sm text-gray-400 text-center mb-8">
          Companies we helped grow
        </p>
        <div className="flex items-center justify-center gap-8 md:gap-12 lg:gap-16 flex-wrap">
          {companies.map((c) => (
            <span
              key={c.name}
              className={`text-gray-400 opacity-60 hover:opacity-100 transition-opacity cursor-pointer select-none ${c.style}`}
            >
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
