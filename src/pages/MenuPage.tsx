import { useState, useEffect } from 'react'
import { MenuItem, CATEGORIES } from '../types'
import { menuItems } from '../data/menuItems'
import MenuCard from '../components/MenuCard'
import ItemModal from '../components/ItemModal'

export default function MenuPage() {
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState<MenuItem | null>(null)
  const [search, setSearch] = useState('')
  const [onlyVeg, setOnlyVeg] = useState(false)
  const [onlyPopular, setOnlyPopular] = useState(false)

  const filtered = menuItems.filter(item => {
    if (category !== 'All' && item.category !== category) return false
    if (search && !item.name.toLowerCase().includes(search.toLowerCase()) && !item.koreanName.includes(search)) return false
    if (onlyVeg && !item.vegetarian) return false
    if (onlyPopular && !item.popular) return false
    return true
  })

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('!opacity-100', '!translate-y-0') }),
      { threshold: 0.05 }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [filtered])

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 pt-20">

      {/* Page header */}
      <div className="bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="section-label mb-2">Umami House</p>
          <h1 className="font-display font-bold text-5xl text-stone-900 dark:text-stone-100 mb-6">Our Menu</h1>

          {/* Search bar */}
          <div className="relative max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search in Korean or English..."
              className="w-full pl-11 pr-4 py-3 bg-stone-50 dark:bg-stone-800 border-2 border-transparent focus:border-ember-300 dark:focus:border-ember-700 rounded-2xl text-sm text-stone-800 dark:text-stone-200 placeholder-stone-400 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-2xl font-sans text-xs font-semibold transition-all ${
                category === cat
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-md'
                  : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:border-ember-300 dark:hover:border-ember-700'
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="w-px h-5 bg-stone-200 dark:bg-stone-700 hidden md:block mx-1" />
          <button
            onClick={() => setOnlyPopular(!onlyPopular)}
            className={`px-4 py-2 rounded-2xl font-sans text-xs font-semibold transition-all ${
              onlyPopular ? 'bg-ember-600 text-white' : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:border-ember-300'
            }`}
          >
            🔥 Popular
          </button>
          <button
            onClick={() => setOnlyVeg(!onlyVeg)}
            className={`px-4 py-2 rounded-2xl font-sans text-xs font-semibold transition-all ${
              onlyVeg ? 'bg-sage-600 text-white' : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:border-sage-300'
            }`}
          >
            🌿 Vegetarian
          </button>
          <span className="ml-auto font-sans text-xs text-stone-400 dark:text-stone-500">{filtered.length} dishes</span>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((item, i) => (
              <div key={item.id} className="reveal opacity-0 translate-y-6 transition-all duration-500" style={{ transitionDelay: `${(i % 8) * 0.04}s` }}>
                <MenuCard item={item} onClick={setSelected} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-5xl">🔍</span>
            <p className="font-display font-semibold text-xl text-stone-700 dark:text-stone-300">No dishes found</p>
            <p className="font-sans text-sm text-stone-400">Try different search terms or filters</p>
          </div>
        )}
      </div>

      {selected && <ItemModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
