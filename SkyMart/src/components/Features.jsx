import { Zap, Shield, BadgePercent } from "lucide-react";

const features = [
  {
    icon: Zap,
    iconColor: "text-lime-400",
    title: "Fast Delivery",
    subtitle: "Same-day on select items",
  },
  {
    icon: Shield,
    iconColor: "text-blue-400",
    title: "Secure Payments",
    subtitle: "100% encrypted checkout",
  },
  {
    icon: BadgePercent,
    iconColor: "text-emerald-400",
    title: "Best Prices",
    subtitle: "Price-match guarantee",
  },
];

const Features = () => {
  return (
    <section className="max-w-[1650px] mx-auto px-5 mt-10 mb-16">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={index}
              className="h-24 rounded-[24px] border border-zinc-700 bg-[#111111] px-8 flex items-center gap-5 hover:border-lime-400/40 transition"
            >
              <Icon
                size={28}
                className={feature.iconColor}
                strokeWidth={2}
              />

              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="text-base text-zinc-500">
                  {feature.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;