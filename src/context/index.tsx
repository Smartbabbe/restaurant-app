import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem, MenuItem } from '../types'

// ─── Theme Context ─────────────────────────────────────────────────────────────
interface ThemeContextType { dark: boolean; toggle: () => void }
const ThemeContext = createContext<ThemeContextType>({ dark: false, toggle: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(() => {
    const s = localStorage.getItem('umami-dark')
    return s ? JSON.parse(s) : true
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('umami-dark', JSON.stringify(dark))
  }, [dark])
  return <ThemeContext.Provider value={{ dark, toggle: () => setDark((d: boolean) => !d) }}>{children}</ThemeContext.Provider>
}
export const useTheme = () => useContext(ThemeContext)

// ─── Cart Context ──────────────────────────────────────────────────────────────
interface CartContextType {
  items: CartItem[]
  addItem: (item: MenuItem, note?: string) => void
  removeItem: (id: number) => void
  updateQty: (id: number, qty: number) => void
  clearCart: () => void
  total: number
  count: number
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}
const CartContext = createContext<CartContextType>({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (item: MenuItem, note?: string) => {
    setItems(prev => {
      const ex = prev.find(i => i.id === item.id)
      if (ex) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...item, quantity: 1, note }]
    })
    setIsOpen(true)
  }
  const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id))
  const updateQty = (id: number, qty: number) => {
    if (qty <= 0) { removeItem(id); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
  }
  const clearCart = () => setItems([])
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const count = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  )
}
export const useCart = () => useContext(CartContext)
