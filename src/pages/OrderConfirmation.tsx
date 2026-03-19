interface OrderConfirmationProps { onNavigate: (p: string) => void }

export default function OrderConfirmation({ onNavigate }: OrderConfirmationProps) {
  const orderNumber = `UH-${Math.floor(Math.random() * 90000) + 10000}`

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full">

        {/* Success icon */}
        <div className="text-center mb-10">
          <div className="w-24 h-24 rounded-full bg-sage-100 dark:bg-sage-900/30 border-4 border-sage-400 dark:border-sage-600 flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6d8460" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 className="font-display font-bold text-3xl text-stone-900 dark:text-stone-100 mb-2">
            Order Confirmed! 🎉
          </h1>
          <p className="font-sans text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
            Your food is being prepared with care. Sit back and we'll have it ready soon.
          </p>
        </div>

        {/* Order details */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-100 dark:border-stone-800 p-6 mb-6 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-stone-100 dark:border-stone-800">
            <span className="font-sans text-xs text-stone-400 uppercase tracking-wider">Order Number</span>
            <span className="font-mono font-bold text-stone-900 dark:text-stone-100 text-sm">{orderNumber}</span>
          </div>
          {[
            { label: 'Status', value: '🔴 Preparing your food', accent: true },
            { label: 'Estimated Time', value: '25 — 35 minutes', accent: false },
            { label: 'Payment', value: 'Cash on Delivery', accent: false },
          ].map(row => (
            <div key={row.label} className="flex justify-between items-center">
              <span className="font-sans text-xs text-stone-400 dark:text-stone-500 uppercase tracking-wider">{row.label}</span>
              <span className={`font-sans text-sm font-semibold ${row.accent ? 'text-ember-600 dark:text-ember-400' : 'text-stone-800 dark:text-stone-200'}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-100 dark:border-stone-800 p-6 mb-8">
          <p className="font-sans text-xs text-stone-400 uppercase tracking-wider mb-5">Order Progress</p>
          <div className="flex items-start justify-between relative">
            {/* Progress line */}
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-stone-100 dark:bg-stone-800">
              <div className="h-full w-1/4 bg-ember-500 rounded-full" />
            </div>
            {[
              { emoji: '✅', label: 'Placed', done: true },
              { emoji: '👨‍🍳', label: 'Preparing', active: true },
              { emoji: '🛵', label: 'On Way', done: false },
              { emoji: '🏠', label: 'Delivered', done: false },
            ].map((step, i) => (
              <div key={step.label} className="flex flex-col items-center gap-2 z-10 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 ${
                  step.done ? 'bg-sage-100 dark:bg-sage-900/30 border-sage-400' :
                  step.active ? 'bg-ember-100 dark:bg-ember-900/30 border-ember-400 animate-pulse' :
                  'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700'
                }`}>
                  {step.emoji}
                </div>
                <p className={`font-sans text-[10px] font-medium text-center ${
                  step.done || step.active ? 'text-stone-700 dark:text-stone-300' : 'text-stone-400 dark:text-stone-600'
                }`}>{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('menu')}
            className="flex-1 btn-ghost text-sm py-3"
          >
            Order Again
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="flex-1 btn-primary text-sm py-3"
          >
            Back to Home
          </button>
        </div>

        <p className="text-center font-sans text-xs text-stone-400 dark:text-stone-600 mt-6">
          맛있게 드세요 — Enjoy your meal!
        </p>
      </div>
    </div>
  )
}
