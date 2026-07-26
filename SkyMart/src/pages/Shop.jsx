import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import ShopHero from '../components/shop/ShopHero'
import SearchFilter from '../components/shop/SearchFilter'
import ProductGrid from '../components/shop/ProductGrid'
import { useShop } from '../context/useShop.jsx'

const Shop = () => {
  const { products, loading, error, addToCart, addProduct, updateProduct, deleteProduct } = useShop()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const [category, setCategory] = useState(() => searchParams.get('category') || 'All Categories')
  const [sortBy, setSortBy] = useState('Featured')

  const availableCategories = useMemo(() => {
    const categorySet = new Set()
    products.forEach((product) => {
      if (product.category) {
        categorySet.add(product.category)
      }
    })
    return ['All Categories', ...Array.from(categorySet).sort((a, b) => a.localeCompare(b))]
  }, [products])

  useEffect(() => {
    const queryCategory = searchParams.get('category') || 'All Categories'
    if (queryCategory !== category) {
      setCategory(queryCategory)
    }
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    let items = [...products]

    if (searchTerm) {
      const normalized = searchTerm.toLowerCase()
      items = items.filter((product) =>
        product.title.toLowerCase().includes(normalized) ||
        product.description?.toLowerCase().includes(normalized) ||
        product.category?.toLowerCase().includes(normalized),
      )
    }

    if (category && category !== 'All Categories') {
      const normalizedCategory = category.toLowerCase()
      items = items.filter((product) =>
        product.category?.toLowerCase().includes(normalizedCategory),
      )
    }

    if (sortBy === 'Price: Low to High') {
      items.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'Price: High to Low') {
      items.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'Name: A-Z') {
      items.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'Name: Z-A') {
      items.sort((a, b) => b.title.localeCompare(a.title))
    } else if (sortBy === 'Rating') {
      items.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
    }

    return items
  }, [products, searchTerm, category, sortBy])

  const handleAddSampleProduct = () => {
    addProduct({
      title: 'Custom Fakestore Item',
      price: 29.99,
      description: 'A custom product added from the shop UI.',
      category: 'custom',
      image: 'https://via.placeholder.com/300x300?text=New+Item',
      rating: { rate: 4.5, count: 12 },
    })
  }

  const handleIncreasePrice = (product) => {
    updateProduct({ ...product, price: Number((product.price + 5).toFixed(2)) })
  }

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory)

    const params = new URLSearchParams(searchParams)

    if (!newCategory || newCategory === 'All Categories') {
      params.delete('category')
    } else {
      params.set('category', newCategory)
    }

    setSearchParams(params)
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <Navbar />

      <main className="p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <ShopHero totalCount={products.length} visibleCount={filteredProducts.length} />


        </div>

        <SearchFilter
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          category={category}
          categories={availableCategories}
          onCategoryChange={handleCategoryChange}
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />

        {loading ? (
          <section className="max-w-[1250px] mx-auto px-5 lg:px-0 pb-12">
            <div className="flex h-64 items-center justify-center rounded-[28px] border border-zinc-700">
              <p className="text-xl text-zinc-400">Loading products from Fakestore...</p>
            </div>
          </section>
        ) : error ? (
          <section className="max-w-[1250px] mx-auto px-5 lg:px-0 pb-12">
            <div className="flex h-64 items-center justify-center rounded-[28px] border border-red-500">
              <p className="text-xl text-red-400">{error}</p>
            </div>
          </section>
        ) : (
          <ProductGrid
            products={filteredProducts}
            onAddToCart={addToCart}
            onDelete={deleteProduct}
            onEdit={handleIncreasePrice}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Shop;