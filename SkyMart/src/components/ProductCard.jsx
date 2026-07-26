import PropTypes from 'prop-types'

function ProductCard({ product, onAddToCart, onDelete, onEdit }) {
  const { image, title, price, description, category, rating } = product

  return (
    <article className="product-card rounded-[24px] border border-zinc-700 bg-zinc-950 p-4 shadow-lg shadow-black/30">
      {image && (
        <img
          className="mb-4 h-48 w-full rounded-3xl object-cover"
          src={image}
          alt={title}
        />
      )}
      <div className="product-card__content flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="product-card__title text-lg font-semibold text-white">{title}</h3>
          <span className="text-sm uppercase tracking-[0.12em] text-lime-400">{category}</span>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm text-zinc-400">
          <span>${price}</span>
          <span>{rating?.rate ?? 'N/A'} ★</span>
        </div>

        {description && <p className="text-sm leading-6 text-zinc-400">{description}</p>}

        <div className="mt-4 flex flex-wrap gap-3">
          {onAddToCart && (
            <button
              className="rounded-2xl bg-lime-400 px-3 py-2 text-sm font-semibold text-black transition hover:bg-lime-300"
              onClick={onAddToCart}
            >
              Add to cart
            </button>
          )}

          {onEdit && (
            <button
              className="rounded-2xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white transition hover:border-lime-400"
              onClick={onEdit}
            >
              Increase price
            </button>
          )}

          {onDelete && (
            <button
              className="rounded-2xl border border-red-500 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
              onClick={onDelete}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
    rating: PropTypes.shape({ rate: PropTypes.number, count: PropTypes.number }),
  }).isRequired,
  onAddToCart: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
}

export default ProductCard
