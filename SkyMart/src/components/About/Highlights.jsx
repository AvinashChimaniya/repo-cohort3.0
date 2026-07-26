import {
  ShieldCheck,
  Zap,
  BadgeCheck,
  ShoppingCart,
} from "lucide-react";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description:
      "Shop with confidence using a clean and secure shopping experience.",
    color: "bg-lime-400/10 text-lime-400",
  },
  {
    icon: Zap,
    title: "Fast Experience",
    description:
      "Optimized pages with smooth navigation and quick product browsing.",
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    icon: BadgeCheck,
    title: "Quality Products",
    description:
      "Browse curated products with ratings, categories and useful details.",
    color: "bg-yellow-500/10 text-yellow-400",
  },
  {
    icon: ShoppingCart,
    title: "Easy Checkout",
    description:
      "Add items to your cart and manage your shopping effortlessly.",
    color: "bg-purple-500/10 text-purple-400",
  },
];

const Highlights = () => {
  return (
    <section className="max-w-[1250px] mx-auto px-5 lg:px-0 pb-12">
      <h2 className="mb-8 text-center text-3xl font-bold text-white">
        What We Stand For
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {highlights.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-[24px] border border-zinc-700 bg-[#111111] p-6 transition duration-300 hover:border-lime-400 hover:-translate-y-1"
            >
              <div className="flex items-start gap-5">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-zinc-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Highlights;