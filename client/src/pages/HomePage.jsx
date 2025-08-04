import HomeCarousel from "../components/HomeCarousel";
import CategorySection from "../components/category/CategorySection";
import WhyChooseUs from "../components/WhyChooseUs";
import BestSeller from "../components/BestSeller";
const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <HomeCarousel />
        </div>
      </div>

      {/* Category Section */}
      <CategorySection />
      {/* bestseler */}
      <BestSeller />

      {/* Why Choose Us Section */}
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
