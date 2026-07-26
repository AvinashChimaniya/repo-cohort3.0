import {
  Atom,
  Palette,
  Route,
  Database,
  Globe,
  Layers3,
} from "lucide-react";

const technologies = [
  {
    icon: Atom,
    title: "React",
    description: "Component-based UI development",
    color: "bg-sky-500/10 text-sky-400",
  },
  {
    icon: Palette,
    title: "Tailwind CSS",
    description: "Modern utility-first styling",
    color: "bg-cyan-500/10 text-cyan-400",
  },
  {
    icon: Route,
    title: "React Router",
    description: "Smooth page navigation",
    color: "bg-orange-500/10 text-orange-400",
  },
  {
    icon: Layers3,
    title: "Context API",
    description: "Global state management",
    color: "bg-lime-400/10 text-lime-400",
  },
  {
    icon: Database,
    title: "Fake Store API",
    description: "Product data integration",
    color: "bg-violet-500/10 text-violet-400",
  },
  {
    icon: Globe,
    title: "Responsive",
    description: "Works across all devices",
    color: "bg-pink-500/10 text-pink-400",
  },
];

const TechStack = () => {
  return (
    <section className="max-w-[1250px] mx-auto px-5 lg:px-0 pb-12">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white">
          Built With Modern Technologies
        </h2>

        <p className="mt-3 text-zinc-500">
          Technologies used to build SkyMart.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {technologies.map((tech, index) => {
          const Icon = tech.icon;

          return (
            <div
              key={index}
              className="rounded-[24px] border border-zinc-700 bg-[#111111] p-6 transition duration-300 hover:-translate-y-1 hover:border-lime-400"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${tech.color}`}
              >
                <Icon size={22} />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-white">
                {tech.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {tech.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TechStack;