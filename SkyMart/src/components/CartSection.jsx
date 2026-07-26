import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, ShoppingCart } from 'lucide-react'
import { toast } from 'react-toastify'
import { useShop } from '../context/useShop.jsx'

const CartSection = () => {
  const navigate = useNavigate()
  const { cart, addToCart, removeFromCart, clearCart } = useShop()

  const items = useMemo(() => {
    const grouped = new Map()

    cart.forEach((product) => {
      if (!grouped.has(product.id)) {
        grouped.set(product.id, { ...product, quantity: 1 })
      } else {
        grouped.get(product.id).quantity += 1
      }
    })

    return Array.from(grouped.values())
  }, [cart])

  const subtotal = useMemo(() => {
    return cart.reduce((sum, product) => sum + (Number(product.price) || 0), 0)
  }, [cart])

  const handleCheckout = () => {
    if (cart.length === 0) return
    clearCart()
    toast.success('Order placed successfully!')
  }

  const handleClearCart = () => {
    if (cart.length === 0) return
    clearCart()
    toast.info('Cart cleared.')
  }

  return (
    <section className="max-w-[1650px] mx-auto px-5 mt-10 mb-16">
      <div className="rounded-[28px] border border-zinc-700 bg-[#111111] p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400 font-semibold">
              Your Cart
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Saved items from your last visit
            </h2>
            <p className="mt-2 text-zinc-500">
              Review and manage your cart before heading to checkout.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 rounded-3xl border border-zinc-700 bg-black/30 p-4 text-white md:items-end">
            <span className="text-sm text-zinc-400">Items in cart</span>
            <span className="text-3xl font-semibold text-lime-400">{cart.length}</span>
            <span className="text-sm text-zinc-500">
              Subtotal: <span className="text-white">${subtotal.toFixed(2)}</span>
            </span>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={handleClearCart}
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:border-red-500 hover:text-red-400"
              >
                <Trash2 size={16} className="mr-2" />
                Clear cart
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                className="inline-flex items-center justify-center rounded-2xl bg-lime-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-lime-300"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-zinc-700 bg-black/30 p-10 text-center text-zinc-400">
            <ShoppingCart size={48} className="mx-auto text-lime-400" />
            <p className="mt-4 text-xl font-semibold text-white">Your cart is empty</p>
            <p className="mt-2 text-sm text-zinc-500">
              Add products to your cart and they will appear here.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group grid gap-4 rounded-[22px] border border-zinc-700 bg-black/50 p-4 sm:grid-cols-[80px_1fr_auto] sm:items-center transition hover:bg-zinc-900"
              >
                <button
                  type="button"
                  onClick={() => navigate('/cart')}
                  className="contents text-left"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 rounded-2xl object-contain"
                  />

                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-zinc-500 line-clamp-2">{item.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                      <span>Category: {item.category}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>
                </button>

                <div className="flex flex-col items-start gap-3 sm:items-end">
                  <span className="text-2xl font-semibold text-lime-400">
                    ${((Number(item.price) || 0) * item.quantity).toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900 px-2 py-1 text-sm text-white">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="h-8 w-8 rounded-xl bg-zinc-800 text-lg font-bold text-white transition hover:bg-red-500/20"
                    >
                      -
                    </button>
                    <span className="min-w-8 text-center text-base font-semibold text-white">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => addToCart(item)}
                      className="h-8 w-8 rounded-xl bg-lime-400 text-lg font-bold text-black transition hover:bg-lime-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default CartSection;
