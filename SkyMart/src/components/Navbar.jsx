import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCart, LogOut, Menu, X } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext.jsx'
import { useShop } from '../context/useShop.jsx'

const Navbar = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const { cart } = useShop()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.info('Logged out successfully.')
    navigate('/')
  }

  return (
    <header className="w-full border-b border-white/5">
      <nav className="max-w-[1700px] mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-lime-400 flex items-center justify-center">
            <span className="text-black text-lg font-bold">⚡</span>
          </div>

          <h1 className="text-2xl font-bold">
            <span className="text-white">Sky</span>
            <span className="text-lime-400">Mart</span>
          </h1>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-10 text-lg font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-lime-400"
                : "text-zinc-500 hover:text-white transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "text-lime-400"
                : "text-zinc-500 hover:text-white transition"
            }
          >
            Shop
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-lime-400"
                : "text-zinc-500 hover:text-white transition"
            }
          >
            About
          </NavLink>
        </div>

        {/* Right Section */}
        <div className="relative flex items-center gap-3">
          <button
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 text-zinc-300 transition hover:border-lime-400 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {mobileOpen ? (
            <div className="absolute right-0 top-full z-50 mt-3 w-50 rounded-3xl border border-zinc-800 bg-[#111111] p-4 shadow-2xl shadow-black/40 md:hidden">
              <NavLink
                to="/"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `${isActive ? 'text-lime-400' : 'text-zinc-300 hover:text-white'} block rounded-xl px-4 py-3 text-base font-semibold transition`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/shop"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `${isActive ? 'text-lime-400' : 'text-zinc-300 hover:text-white'} block rounded-xl px-4 py-3 text-base font-semibold transition`
                }
              >
                Shop
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `${isActive ? 'text-lime-400' : 'text-zinc-300 hover:text-white'} block rounded-xl px-4 py-3 text-base font-semibold transition`
                }
              >
                About
              </NavLink>

              <NavLink
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `${isActive ? 'text-lime-400' : 'text-zinc-300 hover:text-white'} block rounded-xl px-4 py-3 text-base font-semibold transition`
                }
              >
                Cart
              </NavLink>
            </div>
          ) : null}

          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center gap-3 rounded-xl border border-zinc-800 bg-[#171717] px-4 py-2 hover:border-zinc-600 transition">
                <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center text-black font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>

                <span className="text-lg text-zinc-300 capitalize">
                  {user?.name || 'User'}
                </span>

                <button
                  type="button"
                  onClick={() => navigate('/cart')}
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-[#111111] text-zinc-300 hover:border-lime-400 transition"
                  aria-label="Go to cart"
                >
                  <ShoppingCart size={18} />
                  {cart.length > 0 ? (
                    <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1.5 text-[10px] font-bold text-black">
                      {cart.length}
                    </span>
                  ) : null}
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="w-12 h-12 rounded-xl border border-zinc-800 flex items-center justify-center hover:border-red-500 transition"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-xl border border-zinc-800 bg-[#171717] px-4 py-2 text-zinc-300 hover:border-lime-400 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-xl border border-lime-500 bg-lime-500/10 px-4 py-2 text-lime-400 hover:bg-lime-500/20 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;