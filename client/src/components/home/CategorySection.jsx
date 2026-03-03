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
  {
    name: "Marketing",
    count: 140,
    icon: HiOutlineMegaphone,
    highlighted: true,
  },
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
          Explore by <span className="text-spacialText">category</span>
        </h2>
        <Link
          href="/jobs"
          className="text-primary font-semibold md:flex items-center gap-2  text-sm md:text-base hidden "
        >
          Show all jobs <HiOutlineArrowRight />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.name}
              href={`/jobs?category=${encodeURIComponent(cat.name)}`}
              className="p-4 md:p-5 border gap-4 md:gap-8 flex md:block group transition-all duration-200 bg-white hover:text-white border-[#D6DDEB] hover:border-primary hover:bg-primary"
            >
              <Icon
                className="mb-0 md:mb-4 text-primary group-hover:text-white text-3xl md:text-5xl shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base md:text-xl mb-1">{cat.name}</h3>
                <span className="text-gray-500 group-hover:text-white text-xs md:hidden">
                  {cat.count} jobs available
                </span>
              </div>
              <div className="flex items-end md:items-center gap-1.5 text-sm md:text-base">
                <span className="text-gray-500 group-hover:text-white hidden md:inline">
                  {cat.count} jobs available
                </span>
                <HiOutlineArrowRight
                  className="group-hover:translate-x-1 transition-transform text-base"
                />
              </div>
            </Link>
          );
        })}
        <Link
          href="/jobs"
          className="text-primary font-semibold flex items-center gap-2  text-sm md:text-base md:hidden "
        >
          Show all jobs <HiOutlineArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default CategorySection;
