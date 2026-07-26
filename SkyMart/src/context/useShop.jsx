import { useContext } from 'react'
import { ShopContext } from './shopContextValue.js'

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error('useShop must be used within ShopProvider')
  }
  return context
}
