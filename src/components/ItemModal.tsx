import { useState, useEffect } from 'react'
import { MenuItem } from '../types'
import { useCart } from '../context'

interface ItemModalProps { item: MenuItem | null; onClose: () => void }

export default function ItemModal({ item, onClose }: ItemModalProps) {
  const { addItem, items, updateQty } = useCart()
  const [note, setNote] = useState('')
  const [added, setAdded] = useState(false)
  const cartItem = item ? items.find(i => i.id === item.id) : null

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    if (item) document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [item, onClose])

  if (!item) return null

  const handleAdd = () => {
    addItem(item, note)
    setAdded(true)
    setTimeout(() => { setAdded(false); onClose() }, 900)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative w-full sm:max-w-lg bg-white dark:bg-stone-900 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-slide-up sm:animate-scale-in">

        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-all text-sm font-bold"
          >
            ✕
          </button>
          <div className="absolute bottom-4 left-4">
            <p className="font-sans text-white/70 text-xs tracking-wider mb-0.5">{item.koreanName}</p>
            <h2 className="font-display font-bold text-white text-2xl leading-tight">{item.name}</h2>
          </div>
        </div>

        <div className="p-6">
          {/* Meta row */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-sans font-bold text-ember-600 dark:text-ember-400 text-xl">₩{item.price.toLocaleString()}</span>
            <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
            <div className="flex items-center gap-1 text-stone-500 dark:text-stone-400 text-xs font-sans">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {item.prepTime} min
            </div>
            {item.calories && (
              <>
                <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                <span className="text-stone-500 dark:text-stone-400 text-xs font-sans">{item.calories} cal</span>
              </>
            )}
            {(item.spicy || 0) > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                <div className="flex gap-0.5">
                  {[1,2,3].map(i => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i <= (item.spicy||0) ? 'bg-ember-500' : 'bg-stone-200 dark:bg-stone-700'}`} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.tags.map(tag => (
              <span key={tag} className="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-[10px] font-medium px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <p className="font-sans text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-5">{item.description}</p>

          {/* Note */}
          <div className="mb-5">
            <label className="block font-sans text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
              Special requests
            </label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Extra sauce, no onions..."
              rows={2}
              className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border-2 border-transparent focus:border-ember-300 dark:focus:border-ember-700 rounded-2xl text-sm text-stone-800 dark:text-stone-200 placeholder-stone-400 outline-none transition-all resize-none"
            />
          </div>

          {/* Qty if in cart */}
          {cartItem && (
            <div className="flex items-center justify-between p-3 bg-ember-50 dark:bg-ember-900/20 rounded-2xl mb-4">
              <p className="font-sans text-sm font-medium text-ember-700 dark:text-ember-400">In your order</p>
              <div className="flex items-center gap-3">
                <button onClick={() => updateQty(item.id, cartItem.quantity - 1)} className="w-8 h-8 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold flex items-center justify-center hover:border-ember-400 hover:text-ember-600 transition-all">−</button>
                <span className="font-mono font-bold text-stone-900 dark:text-stone-100 w-4 text-center">{cartItem.quantity}</span>
                <button onClick={() => updateQty(item.id, cartItem.quantity + 1)} className="w-8 h-8 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold flex items-center justify-center hover:border-ember-400 hover:text-ember-600 transition-all">+</button>
              </div>
            </div>
          )}

          <button
            onClick={handleAdd}
            className={`w-full py-4 rounded-2xl font-sans font-semibold text-sm transition-all duration-300 ${
              added
                ? 'bg-sage-500 text-white'
                : 'bg-stone-900 dark:bg-stone-100 hover:bg-ember-600 dark:hover:bg-ember-500 text-white dark:text-stone-900 dark:hover:text-white hover:scale-[1.01] shadow-lg'
            }`}
          >
            {added ? '✓ Added!' : `Add to Order — ₩${item.price.toLocaleString()}`}
          </button>
        </div>
      </div>
    </div>
  )
}
