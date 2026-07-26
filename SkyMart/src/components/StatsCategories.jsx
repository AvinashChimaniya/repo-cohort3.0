import { useMemo } from 'react'
import {
  Package,
  TrendingUp,
  Star,
  Tag,
  Laptop,
  Shirt,
  ArrowRight,
} from "lucide-react";
import { Link } from 'react-router-dom';
import { useShop } from '../context/useShop.jsx';

const categoryIconMap = {
  electronics: Laptop,
  jewelery: Tag,
  "men's clothing": Shirt,
  "women's clothing": Shirt,
};

const StatsCategories = () => {
  const { products, cart } = useShop()

  const categoryCounts = useMemo(() => {
    const counts = new Map()

    products.forEach((product) => {
      const key = product.category?.toLowerCase() ?? 'other'
      counts.set(key, (counts.get(key) || 0) + 1)
    })

    return counts
  }, [products])

  const stats = useMemo(() => [
    {
      icon: Package,
      color: "bg-lime-400/10 text-lime-400",
      value: `${cart.length}`,
      title: "Cart Items",
      subtitle: "In your bag",
    },
    {
      icon: TrendingUp,
      color: "bg-blue-500/10 text-blue-400",
      value: `$${cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0).toFixed(2)}`,
      title: "Cart Value",
      subtitle: "Ready to checkout",
    },
    {
      icon: Star,
      color: "bg-yellow-500/10 text-yellow-400",
      value: `${products.filter((product) => (product.rating?.rate || 0) >= 4.5).length}`,
      title: "Top Products",
      subtitle: "Highly rated",
    },
    {
      icon: Tag,
      color: "bg-purple-500/10 text-purple-400",
      value: `${categoryCounts.size}`,
      title: "Categories",
      subtitle: "To explore",
    },
  ], [cart, products, categoryCounts.size])

  const categories = useMemo(() => {
    return Array.from(categoryCounts.entries())
      .map(([categoryName, count]) => ({
        icon: categoryIconMap[categoryName] || Package,
        name: categoryName,
        items: `${count} items`,
      }))
      .sort((a, b) => b.items.localeCompare(a.items))
  }, [categoryCounts])

  return (
    <section className="max-w-[1650px] mx-auto px-5 mt-8">

      {/* ================= Stats ================= */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-[26px] border border-zinc-700 bg-[#111111] px-6 py-6 hover:border-lime-400/40 transition"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}
                >
                  <Icon size={24} />
                </div>

                <div>
                  <h2 className="text-3xl font-bold">
                    {item.value}
                  </h2>

                  <h3 className="mt-1 text-xl text-zinc-300">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-500">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
            {/* ================= Heading ================= */}

      <div className="mt-10 mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">
          Shop by Category
        </h2>

        <Link
        to="/shop"
        className="flex items-center gap-2 text-lime-400 text-lg font-semibold hover:gap-3 transition-all"
      >
        View All
        <ArrowRight size={18} />
      </Link>
      </div>

      {/* ================= Categories ================= */}

<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3">
  {categories.length === 0 ? (
    <div className="rounded-[22px] bg-white text-black p-8 text-center">
      <p className="text-zinc-500">Loading categories...</p>
    </div>
  ) : (
    categories.map((category, index) => {
      const Icon = category.icon;

      return (
        <Link
          key={index}
          to={`/shop?category=${encodeURIComponent(category.name)}`}
          className="group h-36 rounded-[22px] bg-white text-black flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <Icon size={34} strokeWidth={1.8} />

          <h3 className="mt-3 text-xl font-semibold group-hover:text-lime-500 capitalize">
            {category.name}
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            {category.items}
          </p>
        </Link>
      )
    })
  )}
</div>

    </section>
  );
};

export default StatsCategories;