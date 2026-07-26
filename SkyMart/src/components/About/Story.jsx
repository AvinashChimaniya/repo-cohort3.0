import { BookOpen } from "lucide-react";

const Story = () => {
  return (
    <section className="max-w-[1250px] mx-auto px-5 lg:px-0 pb-12">
      <div className="rounded-[28px] border border-zinc-700 bg-[#111111] p-8 lg:p-10">
        {/* Heading */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400/10">
            <BookOpen className="text-lime-400" size={22} />
          </div>

          <h2 className="text-3xl font-bold text-white">
            Our Story
          </h2>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-6 text-[16px] leading-8 text-zinc-400">
          <p>
            SkyMart is a modern e-commerce application created to
            demonstrate how a real-world online shopping platform works
            using React. The project focuses on building a fast,
            responsive and user-friendly experience with clean UI and
            reusable components.
          </p>

          <p>
            Products are powered by the Fake Store API, allowing users
            to browse categories, search products, view ratings, manage
            their cart and experience a complete shopping workflow
            without a custom backend.
          </p>

          <p>
            This project showcases modern frontend development using
            React, Context API, React Router and Tailwind CSS while
            following a modular component-based architecture.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Story;