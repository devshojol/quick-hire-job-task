import vodafone from "../../assets/images/company/vodafone.png";
import intel from "../../assets/images/company/intel.png";
import tesla from "../../assets/images/company/tesla.png";
import amd from "../../assets/images/company/amd.png";
import talkit from "../../assets/images/company/talkit.png";
import Image from "next/image";

const companies = [
  { name: "Vodafone", image: vodafone },
  { name: "Intel", image: intel },
  { name: "Tesla", image: tesla },
  { name: "AMD", image: amd },
  { name: "Talkit", image: talkit },
];

const CompaniesSection = () => {
  return (
    <section className="py-10 md:py-12  border-[#D6DDEB]">
      <div className="container mx-auto px-4">
        <p className="text-lg text-gray-400 mb-8">Companies we helped grow</p>
        <div className="flex items-start justify-between gap-8 md:gap-12 lg:gap-16 flex-wrap">
          {companies.map((c) => (
            <Image
              key={c.name}
              src={c.image}
              alt={c.name}
              className=" object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
