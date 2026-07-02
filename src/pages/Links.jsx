import { motion } from 'framer-motion'
import SocialLinks from '../components/SocialLinks'
import GirlsNightOutForm from '../components/GirlsNightOutForm'
import InstagramTicker from '../components/InstagramTicker'
import { AFFILIATES } from '../config/products'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
})

function LinkCard({ href, label, sub, badge, external, download }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      download={download || undefined}
      className="flex items-center justify-between w-full px-6 py-5 transition-colors group"
      style={{
        background: 'var(--noir-card)',
        border: '1px solid var(--noir-border)',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--crimson)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--noir-border)' }}
    >
      <div>
        <span className="font-sans font-medium text-base block" style={{ color: 'var(--cream)' }}>{label}</span>
        {sub && <span className="font-mono text-xs mt-0.5 block" style={{ color: 'var(--cream-muted)' }}>{sub}</span>}
      </div>
      <div className="flex items-center gap-3">
        {badge && (
          <span className="font-mono text-xs px-2 py-0.5" style={{ background: 'var(--crimson)', color: 'var(--cream)' }}>
            {badge}
          </span>
        )}
        <span style={{ color: 'var(--crimson)' }} className="group-hover:translate-x-1 transition-transform inline-block">→</span>
      </div>
    </a>
  )
}

export default function Links() {
  return (
    <main className="pb-24">

      {/* Identity + social — constrained width */}
      <div className="pt-24 px-6 max-w-lg mx-auto">
        <motion.div {...fade(0.1)} className="text-center mb-10">
          <div className="font-display tracking-[0.02em] sm:tracking-widest mb-1" style={{ color: 'var(--crimson)', fontSize: 'clamp(2.25rem, 10.5vw, 3rem)' }}>
            ELLE PORCHER
          </div>
          <p className="font-serif italic text-lg" style={{ color: 'var(--cream-muted)' }}>
            verbose + bougie ✦ composer ✦ cultural analyst
          </p>
        </motion.div>

        <motion.div {...fade(0.2)} className="flex justify-center mb-12">
          <SocialLinks className="gap-8" />
        </motion.div>
      </div>

      {/* Instagram ticker — full viewport width, no tricks needed */}
      <InstagramTicker limit={12} />

      {/* Rest of content — constrained width */}
      <div className="px-6 max-w-lg mx-auto">

        {/* GNO Waitlist */}
        <motion.section {...fade(0.35)} className="mb-12">
          <GirlsNightOutForm />
        </motion.section>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.45, duration: 0.4 }}
          className="h-px mb-12 origin-left"
          style={{ background: 'var(--noir-border)' }}
        />

        {/* Affiliates */}
        <motion.section {...fade(0.7)} className="mb-6">
          <p className="font-mono text-xs tracking-[0.2em] text-cream-muted mb-4 uppercase">Shop with Elle</p>
          <div className="flex flex-col gap-3">
            {AFFILIATES.map(a => (
              <LinkCard
                key={a.name}
                href={a.url}
                label={a.name}
                sub={a.description}
                external
              />
            ))}
          </div>
        </motion.section>

        {/* Footer note */}
        <motion.p {...fade(0.85)} className="font-mono text-xs text-center mt-12" style={{ color: 'var(--cream-muted)' }}>
          © 2026 VILE LLC ✦ <a href="/" className="hover:text-crimson transition-colors">vilecorp.com</a>
        </motion.p>

      </div>
    </main>
  )
}
