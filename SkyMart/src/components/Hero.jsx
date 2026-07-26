import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Hero = () => {
  const { user } = useAuth()

  return (
    <section className="max-w-[1700px] mx-auto px-6 mt-6">
      <div className="relative overflow-hidden rounded-[28px] border border-zinc-700 bg-[#111111]">
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Green Glow */}
        <div className="absolute left-20 top-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-lime-400/5 blur-[120px]" />

        <div className="relative grid lg:grid-cols-[1fr_240px] gap-12 items-center min-h-[430px] px-16 py-12">
          {/* Left */}
          <div className="max-w-3xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[4px] text-lime-400">
              Good Evening 👋
            </p>

            <h1 className="text-5xl font-bold leading-tight">
              Welcome back,
              <br />
              <span className="text-lime-400">{user?.name || 'friend'}!</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-500">
              Discover today's picks — hand-curated products across
              electronics, fashion, and more.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/shop" className="flex h-14 items-center gap-2 rounded-xl bg-lime-400 px-8 text-lg font-semibold text-black transition hover:brightness-110">
                Shop Now
                <ArrowRight size={20} />
              </Link>

              <Link to="/shop" className="h-14 rounded-xl border border-zinc-700 px-8 text-lg text-zinc-300 transition hover:border-lime-400 hover:text-white flex items-center justify-center">
                View All Products
              </Link>
            </div>
          </div>

          {/* Right Cards */}
          <div className="flex flex-col gap-4">
            {/* Card 1 */}
            <div className="flex h-36 flex-col items-center justify-center rounded-3xl border border-lime-400/20 bg-lime-400/10">
              <h2 className="text-5xl font-bold text-lime-400">20+</h2>

              <p className="mt-2 text-base text-zinc-400">
                Products Available
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex h-32 flex-col items-center justify-center rounded-3xl border border-zinc-600">
              <h2 className="text-4xl font-bold text-white">Free</h2>

              <p className="mt-2 text-sm text-zinc-500">
                Delivery on ₹999+
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;