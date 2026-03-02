import Link from "next/link";
import {
  HiOutlinePencilSquare,
  HiOutlinePresentationChartLine,
  HiOutlineMegaphone,
  HiOutlineBanknotes,
  HiOutlineComputerDesktop,
  HiOutlineCodeBracket,
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineArrowRight,
} from "react-icons/hi2";

const categories = [
  { name: "Design", count: 235, icon: HiOutlinePencilSquare },
  { name: "Sales", count: 756, icon: HiOutlinePresentationChartLine },
  { name: "Marketing", count: 140, icon: HiOutlineMegaphone, highlighted: true },
  { name: "Finance", count: 325, icon: HiOutlineBanknotes },
  { name: "Technology", count: 416, icon: HiOutlineComputerDesktop },
  { name: "Engineering", count: 542, icon: HiOutlineCodeBracket },
  { name: "Business", count: 211, icon: HiOutlineBriefcase },
  { name: "Human Resource", count: 346, icon: HiOutlineUserGroup },
];

const CategorySection = () => {
  return (
    <section className="py-12 md:py-16 container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">
          Explore by <span className="text-primary">category</span>
        </h2>
        <Link
          href="/jobs"
          className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all text-sm md:text-base"
        >
          Show all jobs <HiOutlineArrowRight />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.name}
              href={`/jobs?category=${encodeURIComponent(cat.name)}`}
              className={`p-5 border group transition-all duration-200 ${
                cat.highlighted
                  ? "bg-primary text-white border-primary"
                  : "bg-white border-[#D6DDEB] hover:border-primary hover:bg-primary/5"
              }`}
            >
              <Icon
                size={28}
                className={`mb-4 ${cat.highlighted ? "text-white" : "text-primary"}`}
              />
              <h3
                className={`font-semibold mb-1.5 ${
                  cat.highlighted ? "text-white" : "text-[#25324B]"
                }`}
              >
                {cat.name}
              </h3>
              <div
                className={`flex items-center gap-1.5 text-sm ${
                  cat.highlighted ? "text-blue-200" : "text-gray-500"
                }`}
              >
                <span>{cat.count} jobs available</span>
                <HiOutlineArrowRight
                  size={14}
                  className={`${
                    cat.highlighted ? "text-white" : "text-primary"
                  } group-hover:translate-x-1 transition-transform`}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;
