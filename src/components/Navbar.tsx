import { useState, useEffect } from 'react'
import { useTheme, useCart } from '../context'

interface NavbarProps { onNavigate: (p: string) => void; currentPage: string }

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const { dark, toggle } = useTheme()
  const { count, setIsOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navLinks = ['Home', 'Menu', 'About']

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-stone-50/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-18 flex items-center justify-between py-4">

        {/* Logo */}
        <button onClick={() => onNavigate('home')} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-ember-600 flex items-center justify-center shadow-md shadow-ember-900/20 group-hover:bg-ember-700 transition-colors">
            <span className="text-white font-display font-bold text-base">味</span>
          </div>
          <div className="text-left">
            <p className="font-display font-semibold text-stone-900 dark:text-stone-50 text-lg leading-none tracking-tight">Umami House</p>
            <p className="font-sans text-[10px] text-stone-400 dark:text-stone-500 tracking-widest uppercase leading-none mt-0.5">Korean Cuisine</p>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => onNavigate(link.toLowerCase())}
              className={`px-4 py-2 rounded-xl font-sans text-sm font-medium transition-all ${
                currentPage === link.toLowerCase()
                  ? 'bg-ember-50 dark:bg-ember-900/30 text-ember-600 dark:text-ember-400'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {link}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
          >
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 bg-stone-900 dark:bg-stone-100 hover:bg-stone-700 dark:hover:bg-white text-white dark:text-stone-900 rounded-xl font-sans text-sm font-semibold transition-all hover:scale-105 shadow-md"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            Order
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-ember-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-stone-900">
                {count}
              </span>
            )}
          </button>

          {/* Mobile menu btn */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
          >
            {mobileOpen ? '✕' : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-stone-50 dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 px-6 py-4 space-y-1">
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => { onNavigate(link.toLowerCase()); setMobileOpen(false) }}
              className={`w-full text-left px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all ${
                currentPage === link.toLowerCase()
                  ? 'bg-ember-50 dark:bg-ember-900/30 text-ember-600 dark:text-ember-400'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
