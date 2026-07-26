import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartSection from '../components/CartSection'

function Cart() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <Navbar />
      <CartSection />
      <Footer />
    </div>
  )
}

export default Cart
