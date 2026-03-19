import { useState } from 'react'
import { MenuItem } from '../types'
import { useCart } from '../context'

interface MenuCardProps { item: MenuItem; onClick: (item: MenuItem) => void }

const SpicyDots = ({ level }: { level: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3].map(i => (
      <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= level ? 'bg-ember-500' : 'bg-stone-200 dark:bg-stone-700'}`} />
    ))}
  </div>
)

export default function MenuCard({ item, onClick }: MenuCardProps) {
  const { addItem, items } = useCart()
  const [added, setAdded] = useState(false)
  const cartItem = items.find(i => i.id === item.id)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div
      onClick={() => onClick(item)}
      className="group cursor-pointer card-base hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-stone-100 dark:bg-stone-700">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {item.popular && (
            <span className="bg-ember-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
              Popular
            </span>
          )}
          {item.vegetarian && (
            <span className="bg-sage-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
              Veg
            </span>
          )}
        </div>

        {/* Prep time */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-full">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          {item.prepTime}m
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Korean name */}
        <p className="font-sans text-[10px] text-stone-400 dark:text-stone-500 tracking-wider mb-0.5">{item.koreanName}</p>

        {/* Name + price row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-stone-900 dark:text-stone-100 text-base leading-tight">
            {item.name}
          </h3>
          <span className="font-sans font-bold text-ember-600 dark:text-ember-400 text-sm flex-shrink-0">
            ₩{item.price.toLocaleString()}
          </span>
        </div>

        {/* Description */}
        <p className="font-sans text-xs text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2 mb-3">
          {item.description}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {(item.spicy || 0) > 0 && <SpicyDots level={item.spicy || 0} />}
            {item.calories && (
              <span className="font-sans text-[10px] text-stone-400 dark:text-stone-500">{item.calories} cal</span>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`w-8 h-8 rounded-xl flex items-center justify-center font-sans font-bold text-sm transition-all duration-200 ${
              added
                ? 'bg-sage-500 text-white scale-90'
                : cartItem
                  ? 'bg-ember-100 dark:bg-ember-900/30 text-ember-600 dark:text-ember-400 hover:bg-ember-500 hover:text-white'
                  : 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-ember-600 hover:dark:bg-ember-500 hover:dark:text-white hover:scale-110'
            }`}
          >
            {added ? '✓' : cartItem ? cartItem.quantity.toString() : '+'}
          </button>
        </div>
      </div>
    </div>
  )
}
