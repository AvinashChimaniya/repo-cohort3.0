import { Boxes, Grid2X2, Star, ShoppingBag } from "lucide-react";

const stats = [
  {
    icon: Boxes,
    value: "20+",
    label: "Products",
    color: "bg-lime-400/10 text-lime-400",
  },
  {
    icon: Grid2X2,
    value: "5",
    label: "Categories",
    color: "bg-sky-500/10 text-sky-400",
  },
  {
    icon: Star,
    value: "4.7",
    label: "Avg. Rating",
    color: "bg-yellow-500/10 text-yellow-400",
  },
  {
    icon: ShoppingBag,
    value: "24/7",
    label: "Shopping",
    color: "bg-purple-500/10 text-purple-400",
  },
];

const Stats = () => {
  return (
    <section className="max-w-[1250px] mx-auto px-5 lg:px-0 pb-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-[22px] border border-zinc-700 bg-[#111111] p-6 flex flex-col items-center text-center transition duration-300 hover:border-lime-400"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}
              >
                <Icon size={22} />
              </div>

              <h2 className="mt-4 text-3xl font-bold text-white">
                {item.value}
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Stats;