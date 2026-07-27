import { useSelector } from "react-redux";

const Navbar = () => {
const cart = useSelector((state) => state.cart.cart);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="flex justify-between items-center bg-blue-600 text-white px-8 py-4 mb-8">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>

      <h2 className="text-xl">
        Cart ({totalItems})
      </h2>
    </nav>
  );
};

export default Navbar;