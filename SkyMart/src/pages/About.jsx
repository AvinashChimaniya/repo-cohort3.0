import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import AboutHero from "../components/about/AboutHero";
import Stats from "../components/about/Stats";
import Story from "../components/about/Story";
import Highlights from "../components/about/Highlights";
import TechStack from "../components/about/TechStack";
import CTA from "../components/about/CTA";

const About = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <Navbar />

      <main className="p-8">
        <AboutHero />
        <Stats />
        <Story />
        <Highlights />
        <TechStack />
        <CTA />
      </main>

      <Footer />
    </div>
  );
};

export default About;