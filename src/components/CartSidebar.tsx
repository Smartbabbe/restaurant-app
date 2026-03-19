import { useState } from 'react'
import { useCart } from '../context'

interface CartSidebarProps { onCheckout: () => void }

export default function CartSidebar({ onCheckout }: CartSidebarProps) {
  const { items, removeItem, updateQty, total, count, isOpen, setIsOpen, clearCart } = useCart()
  const [placing, setPlacing] = useState(false)
  const delivery = total >= 30000 ? 0 : 3000

  const handlePlace = () => {
    setPlacing(true)
    setTimeout(() => {
      setPlacing(false)
      clearCart()
      setIsOpen(false)
      onCheckout()
    }, 1200)
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in" onClick={() => setIsOpen(false)} />}

      <div className={`fixed right-0 top-0 h-full w-full max-w-sm z-50 flex flex-col transition-transform duration-500 bg-stone-50 dark:bg-stone-900 shadow-2xl border-l border-stone-200 dark:border-stone-800 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="font-display font-bold text-xl text-stone-900 dark:text-stone-100">Your Order</h2>
            <p className="font-sans text-xs text-stone-400 dark:text-stone-500 mt-0.5">{count} {count === 1 ? 'item' : 'items'}</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors text-sm font-bold">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-20 h-20 rounded-3xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-4xl">
                🍱
              </div>
              <div className="text-center">
                <p className="font-display font-semibold text-stone-700 dark:text-stone-300 text-lg">Your order is empty</p>
                <p className="font-sans text-sm text-stone-400 dark:text-stone-500 mt-1">Add some dishes to get started</p>
              </div>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-3 bg-white dark:bg-stone-800 rounded-2xl p-3 border border-stone-100 dark:border-stone-700">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-sans font-semibold text-sm text-stone-900 dark:text-stone-100 truncate">{item.name}</p>
                  <p className="font-sans text-xs text-stone-400 dark:text-stone-500">{item.koreanName}</p>
                  {item.note && <p className="font-sans text-xs text-stone-400 italic mt-0.5 truncate">"{item.note}"</p>}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-6 h-6 rounded-lg bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 flex items-center justify-center text-xs font-bold hover:bg-ember-100 hover:text-ember-600 transition-all">−</button>
                      <span className="font-mono text-sm font-bold text-stone-900 dark:text-stone-100 w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-6 h-6 rounded-lg bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 flex items-center justify-center text-xs font-bold hover:bg-ember-100 hover:text-ember-600 transition-all">+</button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-bold text-sm text-ember-600 dark:text-ember-400">₩{(item.price * item.quantity).toLocaleString()}</span>
                      <button onClick={() => removeItem(item.id)} className="w-5 h-5 rounded text-stone-300 dark:text-stone-600 hover:text-red-500 flex items-center justify-center text-xs transition-colors">✕</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-stone-200 dark:border-stone-800 space-y-3">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="font-sans text-stone-500 dark:text-stone-400">Subtotal</span>
                <span className="font-sans font-medium text-stone-800 dark:text-stone-200">₩{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-sans text-stone-500 dark:text-stone-400">Delivery</span>
                <span className={`font-sans font-medium ${delivery === 0 ? 'text-sage-600 dark:text-sage-400' : 'text-stone-800 dark:text-stone-200'}`}>
                  {delivery === 0 ? 'Free 🎉' : `₩${delivery.toLocaleString()}`}
                </span>
              </div>
              {total < 30000 && (
                <p className="text-xs text-stone-400 font-sans">₩{(30000 - total).toLocaleString()} more for free delivery</p>
              )}
              <div className="flex justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
                <span className="font-sans font-semibold text-stone-900 dark:text-stone-100">Total</span>
                <span className="font-display font-bold text-xl text-stone-900 dark:text-stone-100">₩{(total + delivery).toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handlePlace}
              className={`w-full py-4 rounded-2xl font-sans font-semibold text-sm transition-all duration-300 ${
                placing
                  ? 'bg-sage-500 text-white'
                  : 'bg-stone-900 dark:bg-stone-100 hover:bg-ember-600 dark:hover:bg-ember-500 text-white dark:text-stone-900 dark:hover:text-white shadow-lg hover:scale-[1.01]'
              }`}
            >
              {placing ? '✓ Placing Order...' : 'Place Order'}
            </button>
            <button onClick={() => setIsOpen(false)} className="w-full py-2.5 font-sans text-sm text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors">
              Continue browsing
            </button>
          </div>
        )}
      </div>
    </>
  )
}
