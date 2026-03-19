import { useState } from 'react'
import { ThemeProvider, CartProvider } from './context'
import Navbar from './components/Navbar'
import CartSidebar from './components/CartSidebar'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import AboutPage from './pages/AboutPage'
import OrderConfirmation from './pages/OrderConfirmation'

function AppContent() {
  const [page, setPage] = useState('home')

  const navigate = (p: string) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {page !== 'confirmation' && <Navbar onNavigate={navigate} currentPage={page} />}
      <CartSidebar onCheckout={() => navigate('confirmation')} />

      {page === 'home' && <HomePage onNavigate={navigate} />}
      {page === 'menu' && <MenuPage />}
      {page === 'about' && <AboutPage onNavigate={navigate} />}
      {page === 'confirmation' && <OrderConfirmation onNavigate={navigate} />}
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  )
}
