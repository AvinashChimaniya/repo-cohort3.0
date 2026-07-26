import { useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ShoppingCart, Star, Package } from 'lucide-react'
import { useShop } from '../context/useShop.jsx'

const Product = () => {
  const { id } = useParams()
  const productId = Number(id)
  const navigate = useNavigate()
  const { products, addToCart } = useShop()
  const [notification, setNotification] = useState('')

  const product = useMemo(
    () => products.find((item) => item.id === productId),
    [products, productId],
  )

  const currentIndex = useMemo(
    () => products.findIndex((item) => item.id === productId),
    [products, productId],
  )

  const nextProduct = useMemo(() => {
    if (!products.length || currentIndex === -1) return null
    return products[(currentIndex + 1) % products.length]
  }, [products, currentIndex])

  const relatedProducts = useMemo(() => {
    if (!product) return []
    return products
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 4)
  }, [products, product])

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product)
    setNotification('Product added to cart!')
    window.setTimeout(() => setNotification(''), 2500)
  }

  const handleNext = () => {
    if (!nextProduct) return
    navigate(`/product/${nextProduct.id}`)
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] text-white">
        <div className="max-w-[1000px] mx-auto px-5 py-16 text-center">
          <p className="text-xl text-zinc-400">Product not found.</p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 rounded-2xl border border-zinc-700 bg-[#111111] px-6 py-3 text-sm font-semibold text-white transition hover:border-lime-400"
          >
            Go back
          </button>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <main className="max-w-[1200px] mx-auto px-5 py-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-2xl border border-zinc-700 bg-[#111111] px-4 py-2 text-sm text-zinc-300 transition hover:border-lime-400"
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <span className="text-sm text-zinc-500">Product details</span>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-2xl border border-zinc-700 bg-[#111111] px-4 py-2 text-sm text-white transition hover:border-lime-400"
          >
            Next product
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <div className="rounded-[28px] border border-zinc-700 bg-[#111111] p-6 text-center">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-400">
              <span className="inline-flex items-center gap-2">
                <Package size={16} className="text-lime-400" />
                Premium product
              </span>
              <span className="text-zinc-500">#{product.id}</span>
            </div>
            <img
              src={product.image}
              alt={product.title}
              className="mx-auto h-[340px] w-full max-w-[340px] object-contain"
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-zinc-700 bg-[#111111] p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-lime-400">{product.category}</p>
              <h1 className="mt-4 text-4xl font-bold text-white">{product.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-yellow-400" />
                  <span>{product.rating?.rate ?? 'N/A'} rating</span>
                </div>
                <span>{product.rating?.count ?? 0} reviews</span>
              </div>
              <p className="mt-6 text-lg leading-8 text-zinc-300">{product.description}</p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-zinc-500">Price</p>
                  <span className="text-4xl font-bold text-lime-400">${product.price}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/shop')}
                    className="inline-flex items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:border-lime-400"
                  >
                    Continue shopping
                  </button>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="inline-flex items-center gap-2 rounded-2xl bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-lime-300"
                  >
                    <ShoppingCart size={18} />
                    Add to cart
                  </button>
                </div>
              </div>

              {notification ? (
                <div className="mt-6 rounded-3xl border border-lime-500 bg-lime-500/10 px-4 py-3 text-sm text-lime-200">
                  {notification}
                </div>
              ) : null}
            </div>

            <div className="rounded-[28px] border border-zinc-700 bg-[#111111] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Related products</h2>
                <Link to="/shop" className="text-sm font-semibold text-lime-400 hover:text-white">
                  View all
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {relatedProducts.length > 0 ? (
                  relatedProducts.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="group rounded-3xl border border-zinc-700 bg-zinc-950 p-4 text-left transition hover:border-lime-400"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-28 w-full object-contain"
                      />
                      <h3 className="mt-4 text-sm font-semibold text-white line-clamp-2">{item.title}</h3>
                      <p className="mt-2 text-sm text-zinc-400">${item.price}</p>
                    </button>
                  ))
                ) : (
                  <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-950/60 p-6 text-sm text-zinc-500 sm:col-span-2">
                    No related products found for this category yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Product
