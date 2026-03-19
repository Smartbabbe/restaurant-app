interface AboutPageProps { onNavigate: (p: string) => void }

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 pt-20">

      {/* Hero */}
      <section className="relative h-[55vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80" alt="Kitchen" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-stone-950/60" />
        <div className="absolute inset-0 flex items-end pb-16 max-w-7xl mx-auto px-6 md:px-10">
          <div>
            <p className="font-sans text-xs text-white/40 tracking-widest uppercase mb-3">Our Story</p>
            <h1 className="font-display font-bold text-white leading-none" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>
              Born in Seoul,<br /><em className="text-ember-300">Served Everywhere</em>
            </h1>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-4">Who We Are</p>
            <h2 className="font-display font-bold text-4xl text-stone-900 dark:text-stone-100 mb-6 leading-tight">
              A Love Letter to Korean Food
            </h2>
            <div className="space-y-4 font-sans text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              <p>Umami House began with a simple conviction: that Korean food — in all its fiery, fermented, deeply nourishing complexity — deserved a home where every dish was made the way it was meant to be made.</p>
              <p>Our head chef, Ji-woo Park, spent twelve years cooking in Seoul before bringing her craft abroad. Every recipe at Umami House has been refined through decades of practice, tasting, and love.</p>
              <p>We believe food is memory. A bowl of seolleongtang is a cold morning in Seoul. Galbi on the grill is a family celebration. We cook to transport you.</p>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80" alt="Chef cooking" className="w-full aspect-[4/5] object-cover rounded-3xl" />
            <div className="absolute -bottom-5 -left-5 bg-ember-600 text-white p-5 rounded-3xl shadow-xl shadow-ember-900/20">
              <p className="font-display font-bold text-3xl">12+</p>
              <p className="font-sans text-xs text-white/70 mt-0.5 uppercase tracking-wider">Years in Seoul</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-stone-50 dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Our Philosophy</p>
            <h2 className="font-display font-bold text-4xl text-stone-900 dark:text-stone-100">What We Stand For</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: '🫙', title: 'Fermentation First', body: 'Our kimchi ferments for a minimum of 2 weeks. Our doenjang is sourced directly from traditional Korean onggi jars. Patience is an ingredient.' },
              { emoji: '🪨', title: 'Stone Bowl Ritual', body: 'Bibimbap served in anything other than a hot dolsot is just rice. Every stone bowl is preheated to 300°C before your dish is assembled.' },
              { emoji: '🤝', title: 'Community Table', body: 'Korean dining is communal. We encourage sharing, conversation, and ordering too much food. That\'s not a bug — it\'s the whole point.' },
            ].map((v, i) => (
              <div key={v.title} className="bg-white dark:bg-stone-900 rounded-3xl p-8 border border-stone-100 dark:border-stone-800 hover:border-ember-200 dark:hover:border-ember-800 transition-colors">
                <span className="text-4xl block mb-5">{v.emoji}</span>
                <h3 className="font-display font-semibold text-xl text-stone-900 dark:text-stone-100 mb-3">{v.title}</h3>
                <p className="font-sans text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-stone-900 dark:bg-stone-950 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display font-bold text-4xl text-white mb-4">맛있게 드세요</h2>
          <p className="font-sans text-white/50 text-sm mb-2 leading-relaxed">Enjoy your meal</p>
          <p className="font-sans text-white/40 text-sm leading-relaxed mb-8">Come hungry, leave happy. That's our only promise.</p>
          <button onClick={() => onNavigate('menu')} className="btn-primary text-base px-10 py-4">
            Explore Our Menu
          </button>
        </div>
      </section>
    </div>
  )
}
