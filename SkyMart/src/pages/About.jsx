import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import AboutHero from "../components/About/AboutHero";
import Stats from "../components/About/Stats";
import Story from "../components/About/Story";
import Highlights from "../components/About/Highlights";
import TechStack from "../components/About/TechStack";
import CTA from "../components/About/CTA";

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