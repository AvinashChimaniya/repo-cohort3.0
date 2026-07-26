const ShopHero = ({ totalCount = 0, visibleCount = 0 }) => {
  return (
    <section className="max-w-[1250px] mx-auto px-5 lg:px-0 pt-8 pb-6">
      <h1 className="text-4xl md:text-5xl font-bold text-white">
        All Products
      </h1>

      <p className="mt-3 text-base text-zinc-500">
        Showing {visibleCount} of {totalCount} products
      </p>
    </section>
  );
};

export default ShopHero;