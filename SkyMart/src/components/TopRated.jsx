import { useMemo } from 'react'
import { Star, ArrowRight, ShoppingBag } from "lucide-react";
import { useShop } from '../context/useShop.jsx'
import { Link } from 'react-router-dom';

const TopRated = () => {
  const { products, loading } = useShop()

  const topProducts = useMemo(() => {
    return [...products]
      .filter((product) => Number(product.rating?.rate || 0) >= 4)
      .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
  }, [products])

  const formatPrice = (price) => {
    if (price == null) return '-'
    return `$${Number(price).toFixed(2)}`
  }

  const renderStars = (rating) => {
    const safeRating = Number(rating) || 0
    const fullStars = Math.floor(safeRating)
    const hasHalfStar = safeRating - fullStars >= 0.5

    return [...Array(5)].map((_, index) => {
      if (index < fullStars) {
        return <Star key={`${rating}-${index}`} size={14} className="fill-amber-500 text-amber-500" />
      }

      if (index === fullStars && hasHalfStar) {
        return <Star key={`${rating}-${index}`} size={14} className="fill-amber-500/50 text-amber-500/50" />
      }

      return <Star key={`${rating}-${index}`} size={14} className="text-zinc-300" />
    })
  }

  return (
    <section className="bg-white min-h-[400px] rounded-[30px] m-4 mb-0 p-8">
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
            <Link
              to={`/product/${item.id}`}
              key={item.id}
              className="h-24 rounded-2xl border border-zinc-200 bg-white px-6 flex items-center justify-between hover:shadow-md transition"
            >
              <div className="flex items-center gap-5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 object-contain"
                />

                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-sm text-amber-500">
                    {renderStars(item.rating?.rate)}
                    <span className="ml-1 text-xs text-zinc-500">({item.rating?.rate?.toFixed(1) || '0.0'})</span>
                  </div>
                  <span className="text-2xl font-semibold text-lime-500">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>

              <button className="w-12 h-12 rounded-xl bg-lime-100 flex items-center justify-center hover:bg-lime-200 transition">
                <ShoppingBag
                  size={18}
                  className="text-lime-600"
                />
              </button>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default TopRated;