import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsCategories from "../components/StatsCategories";
import TopRated from "../components/TopRated";
import Features from "../components/Features";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <Navbar />
      <Hero />
      <StatsCategories />
      <TopRated />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;