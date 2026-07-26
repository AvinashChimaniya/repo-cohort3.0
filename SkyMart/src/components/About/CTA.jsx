import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="max-w-[1250px] mx-auto px-5 lg:px-0 pb-16">
      <div className="relative overflow-hidden rounded-[30px] border border-zinc-700 bg-[#111111]">

        {/* Background Glow */}
        <div className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-lime-400/10 blur-3xl" />
        <div className="absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-lime-400/5 blur-3xl" />

        <div className="relative px-8 py-14 text-center">

          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-400">
            <ShoppingBag size={30} className="text-black" />
          </div>

          {/* Heading */}
          <h2 className="mt-7 text-4xl font-bold text-white">
            Ready to Start Shopping?
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
            Explore our collection of products and experience a clean,
            fast and modern shopping interface built with React,
            Context API and Tailwind CSS.
          </p>

          {/* Button */}
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-lime-400 px-8 py-3 text-lg font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-lime-300"
          >
            Browse Products
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;