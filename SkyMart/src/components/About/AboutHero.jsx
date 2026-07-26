import { Zap } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="max-w-[1250px] mx-auto px-5 lg:px-0 py-12">
      <div className="flex flex-col items-center text-center">

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-lime-400 flex items-center justify-center">
          <Zap className="text-black" size={30} fill="black" />
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-4xl md:text-5xl font-bold text-white">
          About <span className="text-lime-400">SkyMart</span>
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-2xl text-zinc-400 text-lg leading-8">
          SkyMart is a modern e-commerce platform built with React,
          Context API and Fake Store API. It demonstrates how a
          real-world shopping application works with clean UI,
          responsive design and seamless user experience.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;