import { useEffect, useState } from 'react'
import { menuItems } from '../data/menuItems'
import { MenuItem } from '../types'
import MenuCard from '../components/MenuCard'
import ItemModal from '../components/ItemModal'

interface HomePageProps { onNavigate: (p: string) => void }

export default function HomePage({ onNavigate }: HomePageProps) {
  const [selected, setSelected] = useState<MenuItem | null>(null)
  const popular = menuItems.filter(i => i.popular).slice(0, 4)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('!opacity-100', '!translate-y-0') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=1600&q=80"
            alt="Korean food"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/65 dark:bg-stone-950/75" />
          {/* Soft vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/20 via-transparent to-stone-950/40" />
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-ember-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-10 w-48 h-48 rounded-full bg-ember-400/8 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-ember-400 animate-pulse" />
            <span className="font-sans text-xs font-medium text-white/80 tracking-widest uppercase">Now Open · Seoul-inspired Korean Kitchen</span>
          </div>

          <h1 className="font-display font-bold text-white mb-6 animate-fade-up" style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', lineHeight: 1.05 }}>
            Where Every Bite<br />
            <em className="text-ember-300">Tells a Story</em>
          </h1>

          <p className="font-sans text-white/65 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
            Authentic Korean flavours crafted with care — from sizzling galbi to silken sundubu jjigae. Experience Seoul in every spoonful.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <button onClick={() => onNavigate('menu')} className="btn-primary text-base px-8 py-4">
              Order Now
            </button>
            <button onClick={() => onNavigate('about')} className="btn-ghost border-white/30 text-white hover:border-white/60 hover:text-white text-base px-8 py-4">
              Our Story
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 justify-center mt-14 animate-fade-up" style={{ animationDelay: '0.45s', animationFillMode: 'both' }}>
            {[
              { value: '18+', label: 'Signature Dishes' },
              { value: '4.8★', label: 'Guest Rating' },
              { value: '25m', label: 'Avg. Delivery' },
            ].map(s => (
              <div key={s.label}>
                <p className="font-display font-bold text-white text-2xl">{s.value}</p>
                <p className="font-sans text-[10px] text-white/40 tracking-widest uppercase mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-60">
          <div className="w-px h-10 bg-white/30" />
          <p className="font-sans text-[10px] text-white/40 tracking-widest uppercase">Scroll</p>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="py-20 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 text-center mb-14">
            <p className="section-label mb-3">The Umami Experience</p>
            <h2 className="font-display font-bold text-4xl text-stone-900 dark:text-stone-100">Why Guests Keep Coming Back</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🔥', title: 'Tableside BBQ', body: 'Fire up your own grill right at the table. Our charcoal-grilled meats are prepared fresh every single time.' },
              { icon: '🥢', title: 'Authentic Recipes', body: 'Every recipe comes from Korea — refined in Seoul kitchens, brought faithfully to your table.' },
              { icon: '🌿', title: 'Housemade Banchan', body: 'All our side dishes are made fresh daily in-house. No shortcuts, no jars — just handcrafted Korean tradition.' },
            ].map((f, i) => (
              <div
                key={f.title}
                className="reveal opacity-0 translate-y-8 transition-all duration-700 p-8 rounded-3xl border border-stone-100 dark:border-stone-800 hover:border-ember-200 dark:hover:border-ember-800 hover:bg-ember-50/50 dark:hover:bg-ember-900/10 transition-colors text-center group"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className="text-4xl block mb-5 group-hover:scale-110 transition-transform duration-300">{f.icon}</span>
                <h3 className="font-display font-semibold text-xl text-stone-900 dark:text-stone-100 mb-3">{f.title}</h3>
                <p className="font-sans text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular dishes ── */}
      <section className="py-20 bg-stone-50 dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 flex items-end justify-between mb-12">
            <div>
              <p className="section-label mb-2">Fan Favourites</p>
              <h2 className="font-display font-bold text-4xl text-stone-900 dark:text-stone-100">Most Ordered</h2>
            </div>
            <button onClick={() => onNavigate('menu')} className="hidden md:flex items-center gap-1.5 font-sans text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-ember-600 dark:hover:text-ember-400 transition-colors">
              Full Menu
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {popular.map((item, i) => (
              <div key={item.id} className="reveal opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: `${i * 0.08}s` }}>
                <MenuCard item={item} onClick={setSelected} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote banner ── */}
      <section className="relative py-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80"
          alt="Restaurant"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/70" />
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700">
            <p className="font-sans text-white/40 text-xs tracking-widest uppercase mb-6">Korean Proverb</p>
            <blockquote className="font-display italic text-3xl md:text-4xl font-light text-white leading-snug">
              "밥 먹었어요?"<br />
              <span className="text-ember-300 text-2xl md:text-3xl">Have you eaten yet?</span>
            </blockquote>
            <p className="font-sans text-white/40 text-sm mt-6 leading-relaxed max-w-md mx-auto">
              In Korea, asking if someone has eaten is the deepest way to say you care about them. That's the spirit we bring to every meal.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white dark:bg-stone-900">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700">
            <p className="section-label mb-4">Ready to Order?</p>
            <h2 className="font-display font-bold text-4xl text-stone-900 dark:text-stone-100 mb-4">
              Your Table is Waiting
            </h2>
            <p className="font-sans text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-8">
              Dine in, takeaway, or delivery — we bring the warmth of Korean hospitality straight to you.
            </p>
            <button onClick={() => onNavigate('menu')} className="btn-primary text-base px-10 py-4">
              View Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-stone-900 dark:bg-stone-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-ember-600 flex items-center justify-center font-display font-bold text-lg">味</div>
                <p className="font-display font-bold text-xl">Umami House</p>
              </div>
              <p className="font-sans text-sm text-white/45 leading-relaxed max-w-xs">
                Authentic Korean cuisine served with warmth and tradition. Every dish is a celebration of Korean culture.
              </p>
            </div>
            {[
              { title: 'Menu', links: ['Rice & Noodles', 'BBQ & Grills', 'Soups & Stews', 'Small Plates', 'Drinks'] },
              { title: 'Visit', links: ['About Us', 'Opening Hours', 'Delivery Areas', 'Contact'] },
            ].map(col => (
              <div key={col.title}>
                <p className="font-sans text-[10px] tracking-widest uppercase text-white/30 mb-4">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}><button className="font-sans text-sm text-white/50 hover:text-white transition-colors">{l}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-sans text-xs text-white/25">© 2025 Umami House. All rights reserved.</p>
            <p className="font-sans text-xs text-white/25">맛있게 드세요 — Enjoy your meal!</p>
          </div>
        </div>
      </footer>

      {selected && <ItemModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
