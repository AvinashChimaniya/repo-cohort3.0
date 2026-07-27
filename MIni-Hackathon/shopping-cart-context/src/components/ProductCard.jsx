import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {

  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h2 className="text-xl font-semibold mt-3">
        {product.title}
      </h2>

      <p className="text-green-600 font-bold mt-2">
        ₹{product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;