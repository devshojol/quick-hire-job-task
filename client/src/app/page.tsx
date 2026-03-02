import Hero from "../components/home/Hero";
import CompaniesSection from "../components/home/CompaniesSection";
import CategorySection from "../components/home/CategorySection";
import CTABanner from "../components/home/CTABanner";
import FeaturedJobs from "../components/home/FeaturedJobs";
import LatestJobs from "../components/home/LatestJobs";
import Footer from "../components/common/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <CompaniesSection />
      <CategorySection />
      <CTABanner />
      <FeaturedJobs />
      <LatestJobs />
      <Footer />
    </div>
  );
}
