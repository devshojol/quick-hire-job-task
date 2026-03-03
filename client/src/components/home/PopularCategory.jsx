import Link from "next/link";

const popularTags = ["UI Designer", "UX Researcher", "Android", "Admin"];

const PopularCategory = () => {
  return (
    <div className="mt-5 text-dark text-sm flex flex-wrap items-center gap-1">
      <span className="text-gray-500">Popular:</span>
      {popularTags.map((tag, index) => (
        <span key={tag}>
          <Link
            href={`/jobs?search=${encodeURIComponent(tag)}`}
            className="hover:text-primary hover:underline cursor-pointer transition-colors font-medium"
          >
            {tag}
          </Link>
          {index < popularTags.length - 1 && (
            <span className="text-gray-400">,</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default PopularCategory;
