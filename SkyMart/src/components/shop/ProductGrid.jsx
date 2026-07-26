import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onAddToCart, onDelete, onEdit }) => {
  if (!products || products.length === 0) {
    return (
      <section className="max-w-[1250px] mx-auto px-5 lg:px-0 pb-12">
        <div className="flex h-64 items-center justify-center rounded-[28px] border border-zinc-700">
          <h2 className="text-xl text-zinc-400">No products found.</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1250px] mx-auto px-5 lg:px-0 pb-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => onAddToCart?.(product)}
            onDelete={() => onDelete?.(product.id)}
            onEdit={() => onEdit?.(product)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;