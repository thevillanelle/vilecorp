import { motion } from 'framer-motion'
import SectionLabel from '../components/SectionLabel'
import EmailCapture from '../components/EmailCapture'
import { PRODUCTS } from '../config/products'

function ProductCard({ product, index }) {
  const { name, price, badge, description, cta, type, url } = product
  const isFree = type === 'download'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="flex flex-col justify-between p-8 card-hover"
      style={{
        background: isFree ? 'rgba(196,30,58,0.06)' : 'var(--noir-card)',
        border: `1px solid ${isFree ? 'var(--crimson)' : 'var(--noir-border)'}`,
      }}
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="font-serif italic text-xl leading-snug" style={{ color: 'var(--cream)' }}>
            {name}
          </h3>
          {badge && (
            <span className="font-mono text-xs px-2 py-1 shrink-0" style={{
              background: isFree ? 'var(--crimson)' : 'rgba(196,30,58,0.15)',
              color: isFree ? 'var(--cream)' : 'var(--crimson)',
              border: isFree ? 'none' : '1px solid var(--crimson)',
            }}>
              {badge}
            </span>
          )}
        </div>
        <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'var(--cream-muted)' }}>
          {description}
        </p>
      </div>
      <div className="flex items-center justify-between gap-4">
        {price ? (
          <span className="font-display text-3xl tracking-wide" style={{ color: 'var(--gold)' }}>
            {price}
          </span>
        ) : (
          <span className="font-display text-2xl tracking-wide" style={{ color: 'var(--crimson)' }}>
            FREE
          </span>
        )}
        <a
          href={url}
          target={type === 'stripe' ? '_blank' : undefined}
          rel={type === 'stripe' ? 'noopener noreferrer' : undefined}
          download={type === 'download' || undefined}
          className="font-mono text-xs tracking-widest px-5 py-3 transition-colors"
          style={{
            background: 'var(--crimson)',
            color: 'var(--cream)',
            border: '1px solid var(--crimson)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson-dark)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--crimson)' }}
        >
          {cta}
        </a>
      </div>
    </motion.div>
  )
}

export default function Shop() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <SectionLabel>THE COLLECTION</SectionLabel>
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="font-display text-[clamp(48px,8vw,100px)] text-cream-DEFAULT tracking-wide mb-4"
      >
        THE SHOP
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="font-serif italic text-xl text-cream-muted mb-16 max-w-xl"
      >
        Systems, guides, and frameworks for the woman who architects her pleasure.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="mb-16 p-8 border border-crimson/30 bg-crimson/5"
      >
        <p className="font-serif italic text-lg text-cream-muted mb-6">
          Girls' Night Out is coming. Get on the list first.
        </p>
        <EmailCapture
          list="girls-night-out"
          label="Girls' Night Out — Join the Waitlist"
          placeholder="your@email.com"
          cta="I'm in"
          successMessage="You're on the list."
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRODUCTS.filter(p => p.type === 'stripe').map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </main>
  )
}
