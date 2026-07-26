import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from './AuthContext.jsx'
import { ShopContext } from './shopContextValue.js'

function getGuestCartKey() {
  if (typeof window === 'undefined') return 'guest-cart'

  const storedKey = window.localStorage.getItem('skymart_guest_cart_key')
  if (storedKey) return storedKey

  const generatedKey = `guest-${crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`}`
  window.localStorage.setItem('skymart_guest_cart_key', generatedKey)
  return generatedKey
}

function getCartStorageKey(user, isAuthenticated) {
  if (user?.id && isAuthenticated) {
    return `skymart_cart_user_${user.id}`
  }

  return `skymart_cart_${getGuestCartKey()}`
}

function readCartFromStorage(storageKey) {
  if (typeof window === 'undefined') return []

  try {
    const storedCart = window.localStorage.getItem(storageKey)
    return storedCart ? JSON.parse(storedCart) : []
  } catch {
    return []
  }
}

export function ShopProvider({ children }) {
  const { user, isAuthenticated } = useAuth()
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const storageKeyRef = useRef(null)

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

  useEffect(() => {
    const nextStorageKey = getCartStorageKey(user, isAuthenticated)
    storageKeyRef.current = nextStorageKey
    setCart(readCartFromStorage(nextStorageKey))
  }, [isAuthenticated, user?.id])

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

    const activeStorageKey = storageKeyRef.current
    if (!activeStorageKey) return

    window.localStorage.setItem(activeStorageKey, JSON.stringify(cart))
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
