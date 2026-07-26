import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from './shopContextValue.js'

export function ShopProvider({ children }) {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState(() => {
    if (typeof window === 'undefined') return []

    try {
      const storedCart = window.localStorage.getItem('skyMartCart')
      return storedCart ? JSON.parse(storedCart) : []
    } catch {
      return []
    }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    axios
      .get('https://fakestoreapi.com/products', {
        signal: controller.signal,
      })
      .then((response) => {
        setProducts(response.data)
        setLoading(false)
      })
      .catch((fetchError) => {
        if (axios.isCancel(fetchError)) return
        setError(fetchError.message || 'Failed to load products from Fakestore API')
        setLoading(false)
      })

    return () => controller.abort()
  }, [])

  const addToCart = (product) => {
    setCart((current) => [...current, product])
    toast.success('Product added to cart!')
  }

  const removeFromCart = (productId) => {
    setCart((current) => {
      const index = current.findIndex((item) => item.id === productId)
      if (index === -1) return current
      return [...current.slice(0, index), ...current.slice(index + 1)]
    })
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('skyMartCart', JSON.stringify(cart))
  }, [cart])

  const addProduct = (product) => {
    setProducts((current) => [{ ...product, id: Date.now() }, ...current])
  }

  const updateProduct = (updatedProduct) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product,
      ),
    )
  }

  const deleteProduct = (productId) => {
    setProducts((current) => current.filter((product) => product.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const value = {
    products,
    loading,
    error,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    addProduct,
    updateProduct,
    deleteProduct,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
