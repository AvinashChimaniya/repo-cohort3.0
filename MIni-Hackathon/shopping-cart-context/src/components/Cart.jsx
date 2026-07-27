import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white p-5 rounded-xl shadow-md mt-10">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Cart</h2>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p>₹{item.price}</p>
              </div>

              <div className="flex items-center gap-3">

                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>

              </div>
            </div>
          ))}

          <h2 className="text-2xl font-bold mt-5">
            Total : ₹{totalPrice}
          </h2>
        </>
      )}
    </div>
  );
};

export default Cart;