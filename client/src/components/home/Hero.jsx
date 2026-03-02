import Image from "next/image";
import Navbar from "../common/Navbar";
import styledUnderline from "@/src/assets/images/styled_underline.png";
import JobSearch from "./JobSearch";
import PopularTags from "./PopularCategory";

const Hero = () => {
  return (
    <header className="bg-[#F8F8FD] bg-[url('/HeroPattern.png')] bg-no-repeat bg-bottom-right lg:clip-bevel">
      <Navbar />
      <section className="container mx-auto px-4 flex items-end justify-between lg:bg-[url('/hero_image.png')] lg:bg-no-repeat lg:bg-bottom-right lg:bg-contain">
        <aside className="py-10 md:py-16 lg:py-20 w-full lg:flex-1 lg:overflow-hidden">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold">
            Discover <br /> more than
            <br />
            <span className="text-spacialText"> 5000+ Jobs</span>
          </h1>
          <Image
            src={styledUnderline}
            alt="Styled underline"
            className="mt-4 w-48 md:w-64 lg:w-auto"
          />
          <p className="text-base md:text-lg lg:text-xl text-gray-500 my-4 max-w-xl lg:max-w-130.25">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>
          <JobSearch />
          <PopularTags />
        </aside>
      </section>
    </header>
  );
};

export default Hero;
