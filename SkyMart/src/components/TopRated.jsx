import { useMemo } from 'react'
import { Star, ArrowRight, ShoppingBag } from "lucide-react";
import { useShop } from '../context/useShop.jsx'

const TopRated = () => {
  const { products, loading } = useShop()

  const topProducts = useMemo(() => {
    return [...products]
      .filter((product) => product.rating?.rate)
      .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
      .slice(0, 5)
  }, [products])

  const formatPrice = (price) => {
    if (price == null) return '-'
    return `$${Number(price).toFixed(2)}`
  }

  return (
    <section className="bg-white h-[400px] overflow-y-scroll scrollbar-none rounded-[30px] m-4 mb-0 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Star
            size={26}
            className="fill-yellow-400 text-yellow-400"
          />

          <h2 className="text-3xl font-bold text-black">
            Top Rated
          </h2>
        </div>

        <button className="flex items-center gap-2 text-lime-500 font-medium hover:gap-3 transition-all">
          See all
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Products */}
      <div className="space-y-4">
        {loading ? (
          <div className="h-24 rounded-2xl border border-zinc-200 bg-white px-6 flex items-center justify-center">
            <p className="text-zinc-500">Loading top-rated products...</p>
          </div>
        ) : topProducts.length === 0 ? (
          <div className="h-24 rounded-2xl border border-zinc-200 bg-white px-6 flex items-center justify-center">
            <p className="text-zinc-500">No top-rated products available yet.</p>
          </div>
        ) : (
          topProducts.map((item) => (
            <div
              key={item.id}
              className="h-24 rounded-2xl border border-zinc-200 bg-white px-6 flex items-center justify-between hover:shadow-md transition"
            >
              <div className="flex items-center gap-5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 object-contain"
                />

                <span className="text-2xl font-semibold text-lime-500">
                  {formatPrice(item.price)}
                </span>
              </div>

              <button className="w-12 h-12 rounded-xl bg-lime-100 flex items-center justify-center hover:bg-lime-200 transition">
                <ShoppingBag
                  size={18}
                  className="text-lime-600"
                />
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TopRated;