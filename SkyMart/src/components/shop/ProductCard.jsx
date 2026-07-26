import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Star } from "lucide-react";

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer overflow-hidden rounded-[20px] border border-zinc-700 bg-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-lime-400"
    >
      {/* Image Section */}
      <div className="relative bg-white p-3">
        {/* Category Badge */}
        <span className="absolute left-3 top-3 rounded-full bg-zinc-700 px-2.5 py-1 text-[10px] font-medium text-white capitalize">
          {product.category}
        </span>

        <div className="flex h-40 items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-32 object-contain transition duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 p-4">
        <p className="text-[11px] uppercase tracking-wide text-zinc-500">
          {product.category}
        </p>

        <h3 className="h-12 overflow-hidden text-base font-semibold leading-6 text-white">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={12}
              className={
                star <= Math.round(product.rating.rate)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-zinc-700 text-zinc-700"
              }
            />
          ))}

          <span className="ml-1 text-xs text-zinc-500">
            ({product.rating.count})
          </span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between border-t border-zinc-700 pt-3">
          <span className="text-2xl font-bold text-lime-400">
            ${product.price}
          </span>

          <button
            onClick={(event) => {
              event.stopPropagation()
              onAddToCart()
            }}
            className="flex items-center gap-1.5 rounded-full bg-lime-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-lime-300"
          >
            <ShoppingCart size={15} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;