import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart.jsx";

const App = () => {

  console.log("hello from redux")
  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        <ProductList />

        <Cart />

      </div>

    </div>
  );
};

export default App;